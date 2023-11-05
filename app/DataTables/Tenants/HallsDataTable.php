<?php

namespace App\DataTables\Tenants;

use App\Models\Tenants\Hall;
use App\Services\Tenants\Halls\HallInterface;
use App\Utils\Traits\DataTableTrait;
use Illuminate\Support\Str;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Barryvdh\DomPDF\Facade\Pdf;

class HallsDataTable extends DataTable
{
    use DataTableTrait;

    private $hallInterface;

    public function __construct(HallInterface $hallInterface)
    {
        $this->hallInterface = $hallInterface;
    }

    public function dataTable(QueryBuilder $query)
    {
        $columns = array_column($this->getColumns(), 'data');
        return (new EloquentDataTable($query))
            ->editColumn('description', function ($hall) {
                return strlen($hall->description) > 0 ? Str::of($hall->description)->ucfirst()->words(15) : '-';
            })
            ->editColumn('image', function ($hall) {
                $image = $hall->getFirstMedia('halls');
                return !is_null($image) ? editImageColumn($image->getUrl(), $image->name) : '-';
            })
            ->editColumn('created_at', function ($hall) {
                return editDateColumn($hall->created_at);
            })
            ->editColumn('updated_at', function ($hall) {
                return editDateColumn($hall->updated_at);
            })
            ->editColumn('actions', function ($hall) {
                return view('tenant.app.halls.actions', ['hall' => $hall]);
            })
            ->editColumn('check', function ($hall) {
                return $hall;
            })
            ->setRowId('id')
            ->rawColumns(array_merge($columns, ['action', 'check']));
    }

    public function query(Hall $model): QueryBuilder
    {
        return $model->newQuery();
    }

    public function html(): HtmlBuilder
    {
        $buttons = [];

        if (auth('tenant')->user()->can('tenant.halls.create') && ($this->hallInterface->get(onlyCount: true) < auth('tenant')->user()->tenantSubscription->no_of_halls)) {
            $buttons[] = Button::raw('add-new')
                ->addClass('btn btn-primary waves-effect waves-float waves-light m-1')
                ->text('<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add New')
                ->attr([
                    'onclick' => 'addNew()',
                ]);
        }

        if (auth('tenant')->user()->can('tenant.halls.export')) {
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

        if (auth()->user()->can('tenant.hallTypes.destroy')) {
            $buttons[] = Button::raw('delete-selected')
                ->addClass('btn btn-danger waves-effect waves-float waves-light m-1')
                ->text('<i class="fa-solid fa-minus"></i>&nbsp;&nbsp;Delete Selected')
                ->attr([
                    'onclick' => 'deleteSelected()',
                ]);
        }

        return $this->builder()
            ->setTableId('halls-table')
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

        $checkColumn = Column::computed('check')->exportable(false)->printable(false)->width(60)->addClass('text-nowarp');
        if (auth('tenant')->user()->can('tenant.halls.destroy')) {
            $checkColumn->addClass('disabled');
        }

        $columns = [
            $checkColumn,
            Column::computed('image')->title('Image')->addClass('text-nowarp'),
            Column::make('name')->title('Halls')->addClass('text-nowarp'),
            Column::make('short_label')->title('Label')->addClass('text-nowarp'),
            Column::make('price')->addClass('text-nowarp'),
            Column::make('description')->addClass('text-nowarp'),
            Column::make('created_at')->addClass('text-nowarp'),
            Column::make('updated_at')->addClass('text-nowarp'),
            Column::computed('actions')->exportable(false)->printable(false)->width(60)->addClass('text-center text-nowrap'),
        ];
        return $columns;
    }
}
