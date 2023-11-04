<?php

namespace App\DataTables\Tenants;

use App\Models\{Role, Permission};
use App\Utils\Traits\DataTableTrait;
use Yajra\DataTables\Html\{Button, Column};
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Illuminate\Support\Str;

class PermissionsDataTable extends DataTable
{
    use DataTableTrait;

    public function dataTable(QueryBuilder $query)
    {
        $columns = array_column($this->getColumns(), 'data');
        return (new EloquentDataTable($query))
            ->addIndexColumn()
            ->editColumn('roles', function ($permission) {
                return [
                    'permission_id' => $permission->id,
                    'roles' => $permission->roles->pluck('id')->toArray()
                ];
            })
            ->editColumn('updated_at', function ($permission) {
                return editDateColumn($permission->updated_at);
            })
            ->editColumn('show_name', function ($permission) {
                return explode(' - ', $permission->show_name, 2)[1];
            })
            ->editColumn('class', function ($permission) {
                return Str::of(explode('.', $permission->name)[1])->headline();
            })
            ->setRowId('id')
            ->rawColumns(array_merge($columns, ['action', 'check']));
    }

    /**
     * Get query source of dataTable.
     *
     * @param \Spatie\Permission\Models\Permission $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Permission $model): QueryBuilder
    {
        return $model->newQuery()->with('roles');
    }

    public function html(): HtmlBuilder
    {
        $buttons = [];


        if (auth('tenant')->user()->can('tenant.permissions.export')) {
            $buttons[] = Button::make('export')
                ->addClass('btn btn-primary waves-effect waves-float waves-light dropdown-toggle m-1')
                ->buttons([
                    Button::make('print')->addClass('dropdown-item')->text('<i class="fa-solid fa-print"></i>&nbsp;&nbsp;Print'),
                    Button::make('copy')->addClass('dropdown-item')->text('<i class="fa-solid fa-copy"></i>&nbsp;&nbsp;Copy'),
                    Button::make('csv')->addClass('dropdown-item')->text('<i class="fa-solid fa-file-csv"></i>&nbsp;&nbsp;CSV'),
                    Button::make('excel')->addClass('dropdown-item')->text('<i class="fa-solid fa-file-excel"></i>&nbsp;&nbsp;Excel'),
                    Button::make('pdf')->addClass('dropdown-item')->text('<i class="fa-solid fa-file-pdf"></i>&nbsp;&nbsp;PDF'),
                ]);
        }

        $buttons = array_merge($buttons, [
            Button::make('reset')->addClass('btn btn-danger waves-effect waves-float waves-light m-1'),
            Button::make('reload')->addClass('btn btn-primary waves-effect waves-float waves-light m-1'),
        ]);

        if (auth('tenant')->user()->can('tenant.permissions.destroy')) {
            $buttons[] = Button::raw('delete-selected')
                ->addClass('btn btn-danger waves-effect waves-float waves-light m-1')
                ->text('<i class="icon material-icons md-delete"></i><span id="delete_selected_count" style="display:none">0</span> Delete Selected')
                ->attr([
                    'onclick' => 'deleteSelected()',
                ]);
        }

        return $this->builder()
            ->setTableId('permissions-table')
            ->addTableClass(['table-striped'])
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->serverSide()
            ->processing()
            ->deferRender()
            ->pagingType('full_numbers')
            ->lengthMenu([
                [30, 50, 70, 100, 120, 150, -1],
                [30, 50, 70, 100, 120, 150, "All"],
            ])
            ->dom('<"card-header pt-0"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>> C<"clear">')
            ->buttons($buttons)
            ->scrollX()
            ->rowGroupDataSrc('class')
            ->fixedColumns([
                'left' => 2,
                'right' => 0,
            ])
            ->orders([
                [count($this->getColumns()) - 2, 'desc'],
            ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns(): array
    {
        $currentAuthRoles = auth()->user()->roles;
        $roles = getLinkedTreeData(new Role(), $currentAuthRoles->pluck('id'));

        $colArray = [
            Column::computed('DT_RowIndex')->title('#'),
            Column::make('show_name')->title('Permission Name')->addClass('text-nowrap')->ucfirst(),
            Column::computed('class')->visible(false),
        ];

        foreach ($roles as $key => $role) {

            if ($role['guard_name'] != 'tenant')
                continue;

            $colArray[] = Column::computed('roles')
                ->title($role['name'])
                ->addClass('text-nowrap text-center align-middle')
                ->searchable(false)->exportable(false)->printable(false)
                ->render('function () {
                    var checkbox = "<div class=\'form-check d-flex justify-content-center\'>";
                    if(data.roles.includes("' . $role['id'] . '")) {
                        checkbox += "<input class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(\"' . $role['id'] . '\", \"" + data.permission_id + "\")\'  id=\'chkRolePermission_' . $role['id']  . '__' . '" + data.permission_id + "\' checked />";
                    } else {
                        checkbox += "<input class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(\"' . $role['id'] . '\", \"" + data.permission_id + "\")\'  id=\'chkRolePermission_' . $role['id']  . '__' . '" + data.permission_id + "\' />";
                    }
                    checkbox += "<label class=\'form-check-label\' for=\'chkRolePermission_' . $role['id']  . '__' . '" + data.permission_id + "\'></label></div>";
                    return checkbox;
                }');
        }
        return $colArray;
    }
}
