<?php

namespace App\DataTables\HallOwner;

use App\Models\Package;
use App\Utils\Traits\DataTableTrait;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class PackagesDataTable extends DataTable
{
    use DataTableTrait;

    public function dataTable(QueryBuilder $query)
    {
        $columns = array_column($this->getColumns(), 'data');
        return (new EloquentDataTable($query))
            ->setRowId('id')
            ->editColumn('check', function ($package) {
                return $package;
            })
            ->editColumn('image', function ($menu) {
                $image = $menu->getFirstMedia('packages');
                return !is_null($image) ? editImageColumn($image->getUrl(), $image->name) : '-';
            })
            ->editColumn('price', function ($package) {
                return editCurrencyColumn($package->price, symbol: 'Rs');
            })
            ->editColumn('updated_at', function ($package) {
                return editDateTimeColumn($package->updated_at);
            })
            ->editColumn('actions', function ($package) {
                return view('hall_owner.packages.actions', ['package' => $package]);
            })
            ->setRowId('id')
            ->rawColumns(array_merge($columns, ['action', 'check']));
    }

    public function query(Package $model): QueryBuilder
    {
        return $model->newQuery()->with('hall_type');
    }

    public function html(): HtmlBuilder
    {
        $buttons = [];

        if (auth()->user('hall-owner')->can('hall_owner.packages.create')) {
            $buttons[] = Button::raw('add-new')
                ->addClass('btn btn-primary waves-effect waves-float waves-light m-1')
                ->text('<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add New')
                ->attr([
                    'onclick' => 'addNew()',
                ]);
        }

        if (auth()->user('hall-owner')->can('hall_owner.packages.export')) {
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

        if (auth()->user('hall-owner')->can('hall_owner.packages.destroy')) {
            $buttons[] = Button::raw('delete-selected')
                ->addClass('btn btn-danger waves-effect waves-float waves-light m-1')
                ->text('<i class="fa-solid fa-minus"></i>&nbsp;&nbsp;Delete Selected')
                ->attr([
                    'onclick' => 'deleteSelected()',
                ]);
        }

        return $this->builder()
            ->setTableId('packages-table')
            ->addTableClass('table-borderless table-striped table-hover')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->serverSide()
            ->processing()
            ->deferRender()
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
            ->fixedColumns([
                'left' => 1,
                'right' => 1,
            ])
            ->orders([
                [count($this->getColumns()) - 2, 'desc'],
            ]);
    }

    protected function getColumns(): array
    {

        $checkColumn = Column::computed('check')->exportable(false)->printable(false)->width(10)->addClass('text-nowrap align-middle');
        if (auth('hall-owner')->user()->can('hall_owner.packages.destroy')) {
            $checkColumn->addClass('disabled');
        }

        $columns = [
            $checkColumn,
            // Column::computed('image')->title('Image')->addClass('text-nowrap align-middle'),
            Column::make('name')->addClass('text-nowrap align-middle'),
            Column::make('description')->addClass('text-nowrap align-middle'),
            Column::make('hall_type.name')->title('Hall Type')->addClass('text-nowrap align-middle'),
            Column::make('price')->addClass('text-nowrap text-center align-middle'),
            Column::make('updated_at')->addClass('text-nowrap text-center align-middle'),
            Column::computed('actions')->exportable(false)->printable(false)->width(60)->addClass('text-nowrap align-middle'),
        ];
        return $columns;
    }
}
