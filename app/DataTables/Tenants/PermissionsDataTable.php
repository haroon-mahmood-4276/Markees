<?php

namespace App\DataTables\Tenants;

use Illuminate\Support\Str;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\EloquentDataTable;
use Spatie\Permission\Models\Permission;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Barryvdh\DomPDF\Facade\Pdf;

class PermissionsDataTable extends DataTable
{
    /**
     * Build DataTable class.
     *
     * @param QueryBuilder $query Results from query() method.
     * @return \Yajra\DataTables\EloquentDataTable
     */
    public function dataTable(QueryBuilder $query)
    {
        $columns = array_column($this->getColumns(), 'data');
        return (new EloquentDataTable($query))
            ->addIndexColumn()
            ->editColumn('created_at', function ($permission) {
                return editDateColumn($permission->created_at);
            })
            ->editColumn('class', function ($permission) {
                $explodedArray = explode('.', $permission->name);
                return Str::of($explodedArray[count($explodedArray) > 1 ? count($explodedArray) - 2 : 0])->title();
            })
            ->editColumn('class', function ($permission) {
                $explodedArray = explode('.', $permission->name);
                return Str::of($explodedArray[count($explodedArray) > 1 ? count($explodedArray) - 2 : 0])->title();
            })
            ->editColumn('roles', function ($permission) {
                return [
                    'permission_id' => $permission->id,
                    'roles' => $permission->roles->pluck('id')->toArray()
                ];
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
        if (auth('tenant')->user()->can('tenant.permissions.view_all')) {
            return $model->newQuery();
        } else {
            $CurrentUserRole = auth('tenant')->user()->roles->pluck('id');
            return (new Role())->where('id', $CurrentUserRole[0])->with('permissions')->first()->permissions->toQuery();
        }
    }

    public function html(): HtmlBuilder
    {
        $buttons = [
            Button::make('export')->addClass('btn btn-secondary  dropdown-toggle')->buttons([
                Button::make('print')->addClass('dropdown-item'),
                Button::make('copy')->addClass('dropdown-item'),
                Button::make('csv')->addClass('dropdown-item'),
                Button::make('excel')->addClass('dropdown-item'),
                Button::make('pdf')->addClass('dropdown-item'),
            ]),
            Button::make('reset')->addClass('btn btn-danger '),
            Button::make('reload')->addClass('btn btn-primary '),
        ];
        return $this->builder()
            ->setTableId('permissions-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            // ->stateSave()
            ->serverSide()
            ->processing()
            ->deferRender()
            ->dom('BlfrtipC')
            ->scrollX()
            ->lengthMenu([20, 30, 50, 70, 100])
            ->dom('<"card-header pt-0"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>> C<"clear">')
            ->buttons($buttons)
            ->rowGroupDataSrc('class')
            ->scrollX()
            ->orders([
                [2, 'asc'],
            ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns(): array
    {
        $currentAuthentiactedRoleId = auth('tenant')->user()->roles->pluck('id');

        $roles = getLinkedTreeData(new Role(), $currentAuthentiactedRoleId);
        $roles = array_merge(auth('tenant')->user()->roles->toArray(), $roles);

        $columns = [
            Column::computed('DT_RowIndex')->title('#'),
            Column::make('show_name')->title('Permission Name')->ucfirst(),
            Column::make('name')->title('Slug')->ucfirst(),
            // Column::make('guard_name')->title('Guard Name'),
            Column::computed('class')->title('Class')->visible(false),
        ];

        foreach ($roles as $key => $role) {

            $assignPermssion  = auth('tenant')->user()->can('tenant.permissions.assign-permission') ? 1 : 0;
            $revokePermission  = auth('tenant')->user()->can('tenant.permissions.revoke-permission') ? 1 : 0;
            $editOwnPermission  = auth('tenant')->user()->can('tenant.permissions.edit-own-permission') ? 1 : 0;


            $columns[] = Column::computed('roles')
                ->title($role['name'])
                ->searchable(false)
                ->exportable(false)
                ->printable(false)
                ->addClass('text-center')
                ->render('function () {
                    var roles = data.roles;
                    var isPermissionAssigned = roles.includes(' . $role['id'] . ');
                    if(' . $currentAuthentiactedRoleId[0] . ' == ' . $role['id'] . '){
                        var checkbox = "<div class=\'form-check d-flex justify-content-center\'>";
                        if(isPermissionAssigned) {
                            if(' . $editOwnPermission . ')
                            {
                                if(' . $revokePermission . '){
                                checkbox += "<input  class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' checked />";
                                }
                                else{
                                    checkbox += "<input disabled class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' checked />";
                                }
                            }
                            else{
                                checkbox += "<input disabled class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' checked />";
                            }
                        } else {
                            if(' . $editOwnPermission . ')
                            {
                                if(' . $assignPermssion . '){
                                    checkbox += "<input class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' />";
                                }
                                else
                                {
                                    checkbox += "<input disabled class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' />";
                                }
                            }
                            else{
                                checkbox += "<input disabled class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' />";
                            }
                        }
                        checkbox += "<label class=\'form-check-label\' for=\'chkRolePermission_' . $role['id'] . '\'></label></div>";

                        return checkbox;
                    }
                    else
                    {
                        var checkbox = "<div class=\'form-check d-flex justify-content-center\'>";
                        if(isPermissionAssigned) {
                            if(' . $revokePermission . '){
                               checkbox += "<input  class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' checked />";
                            }
                            else{
                                checkbox += "<input disabled class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' checked />";
                            }
                        } else {
                            if(' . $assignPermssion . '){
                                checkbox += "<input class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' />";
                            }
                            else
                            {
                                checkbox += "<input disabled class=\'form-check-input\' type=\'checkbox\' onchange=\'changeRolePermission(' . $role['id'] . ', " + data.permission_id + ")\'  id=\'chkRolePermission_' . $role['id'] . '_' . '" + data.permission_id + "\' />";
                            }
                        }
                        checkbox += "<label class=\'form-check-label\' for=\'chkRolePermission_' . $role['id'] . '\'></label></div>";

                        return checkbox;
                    }
                 }');
        }

        // $columns[] = Column::computed('actions')->exportable(false)->printable(false)->width(60)->addClass('text-center');
        return $columns;
    }


    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename(): string
    {
        return 'Permissions_' . date('YmdHis');
    }

    /**
     * Export PDF using DOMPDF
     * @return mixed
     */
    public function pdf()
    {
        $data = $this->getDataForPrint();
        $pdf = Pdf::loadView($this->printPreview, ['data' => $data])->setOption(['defaultFont' => 'sans-serif']);
        return $pdf->download($this->filename() . '.pdf');
    }
}
