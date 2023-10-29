<?php

namespace App\DataTables\Tenants;

use App\Models\Tenants\Menu;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class MenusDataTable extends DataTable
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
            ->setRowId('id')
            ->editColumn('description', function ($menu) {
                return strlen($menu->description) > 0 ? Str::of($menu->description)->ucfirst()->words(15) : '-';
            })
            ->editColumn('image', function ($menu) {
                $image = $menu->getFirstMedia('menus');
                return !is_null($image) ? editImageColumn($image->getUrl(), $image->name) : '-';
            })
            ->editColumn('created_at', function ($menu) {
                return editDateColumn($menu->created_at);
            })
            ->editColumn('updated_at', function ($menu) {
                return editDateColumn($menu->updated_at);
            })
            ->editColumn('actions', function ($menu) {
                return view('tenant.app.menus.actions', ['id' => $menu->id]);
            })
            ->editColumn('check', function ($menu) {
                return $menu;
            })
            ->setRowId('id')
            ->rawColumns(array_merge($columns, ['action', 'check']));
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\Tenant\Menu $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Menu $model): QueryBuilder
    {
        return $model->newQuery();
    }

    public function html(): HtmlBuilder
    {
        $buttons = [];

        if (auth('tenant')->user()->can('tenant.menus.create')) {
            $buttons[] = Button::raw('add-new')
                ->addClass('btn btn-primary ')
                ->text('<i class="bi bi-plus"></i> Add New')
                ->attr([
                    'onclick' => 'addNew()',
                ]);
        }

        if (auth('tenant')->user()->can('tenant.menus.export')) {
            $buttons[] =  Button::make('export')->addClass('btn btn-secondary  dropdown-toggle')->buttons([
                Button::make('print')->addClass('dropdown-item'),
                Button::make('copy')->addClass('dropdown-item'),
                Button::make('csv')->addClass('dropdown-item'),
                Button::make('excel')->addClass('dropdown-item'),
                Button::make('pdf')->addClass('dropdown-item'),
            ]);
        }

        $buttons = array_merge($buttons, [
            Button::make('reset')->addClass('btn btn-danger '),
            Button::make('reload')->addClass('btn btn-primary '),
        ]);

        if (auth('tenant')->user()->can('tenant.menus.destroy')) {
            $buttons[] = Button::raw('delete-selected')
                ->addClass('btn btn-danger ')
                ->text('<i class="bi bi-trash3-fill"></i> Delete Selected')
                ->attr([
                    'onclick' => 'deleteSelected()',
                ]);
        }

        return $this->builder()
            ->setTableId('menu-table')
            ->addTableClass('table-borderless table-striped table-hover')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->serverSide()
            ->processing()
            ->deferRender()
            ->dom('BlfrtipC')
            ->scrollX()
            ->lengthMenu([10, 20, 30, 50, 70, 100])
            ->dom('<"card-header pt-0"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>> C<"clear">')
            ->buttons($buttons)
            // ->rowGroupDataSrc('parent_id')
            ->columnDefs([
                [
                    'targets' => 0,
                    'className' => 'text-center text-primary',
                    'width' => '10%',
                    'orderable' => false,
                    'searchable' => false,
                    'responsivePriority' => 3,
                    'render' => "function (data, type, full, setting) {
                        var role = JSON.parse(data);
                        return '<div class=\"form-check\"> <input class=\"form-check-input dt-checkboxes\" onchange=\"changeTableRowColor(this)\" type=\"checkbox\" value=\"' + role.id + '\" name=\"checkForDelete[]\" id=\"checkForDelete_' + role.id + '\" /><label class=\"form-check-label\" for=\"chkRole_' + role.id + '\"></label></div>';
                    }",
                    'checkboxes' => [
                        'selectAllRender' =>  '<div class="form-check"> <input class="form-check-input" onchange="changeAllTableRowColor()" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>',
                    ]
                ],
            ])
            ->orders([
                [3, 'asc'],
            ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns(): array
    {

        $checkColumn = Column::computed('check')->exportable(false)->printable(false)->width(60)->addClass('text-nowarp');
        if (auth('tenant')->user()->can('tenant.menus.destroy')) {
            $checkColumn->addClass('disabled');
        }

        $columns = [
            $checkColumn,
            Column::computed('image')->title('Image')->addClass('text-nowarp'),
            Column::make('name')->title('Decrations')->addClass('text-nowarp'),
            Column::make('price')->addClass('text-nowarp'),
            Column::make('description')->addClass('text-nowarp'),
            Column::make('created_at')->addClass('text-nowarp'),
            Column::make('updated_at')->addClass('text-nowarp'),
            Column::computed('actions')->exportable(false)->printable(false)->width(60)->addClass('text-center text-nowrap'),
        ];
        return $columns;
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename(): string
    {
        return 'Menus_' . date('YmdHis');
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
