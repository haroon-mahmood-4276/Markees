<?php

namespace App\DataTables\HallOwner;

use App\Models\HallOwner\Hall;
use App\Models\HallOwner\HallSlot;
use App\Services\HallOwner\Halls\HallInterface;
use Illuminate\Support\Str;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Barryvdh\DomPDF\Facade\Pdf;

class HallSlotsDataTable extends DataTable
{

    private $hallInterface;

    public function __construct(HallInterface $hallInterface)
    {
        $this->hallInterface = $hallInterface;
    }

    public function dataTable(QueryBuilder $query)
    {
        $columns = array_column($this->getColumns(), 'data');
        return (new EloquentDataTable($query))
            ->editColumn('start_date', function ($hallSlot) {
                return editDateColumn($hallSlot->start_date);
            })
            ->editColumn('end_date', function ($hallSlot) {
                return editDateColumn($hallSlot->end_date);
            })
            ->editColumn('start_time', function ($hallSlot) {
                return editTimeColumn($hallSlot->start_time);
            })
            ->editColumn('end_time', function ($hallSlot) {
                return editTimeColumn($hallSlot->end_time);
            })
            ->editColumn('overnight', function ($hallSlot) {
                return editStatusColumn($hallSlot->overnight);
            })
            ->editColumn('active', function ($hallSlot) {
                return editStatusColumn($hallSlot->active);
            })
            ->editColumn('updated_at', function ($hallSlot) {
                return editDateTimeColumn($hallSlot->updated_at);
            })
            ->editColumn('actions', function ($hallSlot) {
                return view('tenant.app.halls.settings.slots.actions', ['hall' => $this->hall, 'slot' => $hallSlot]);
            })
            ->editColumn('check', function ($hallSlot) {
                return $hallSlot;
            })
            ->setRowId('id')
            ->rawColumns(array_merge($columns, ['action', 'check']));
    }

    public function query(HallSlot $model): QueryBuilder
    {
        return $model->newQuery()->where('hall_id', $this->hall->id);
    }

    public function html(): HtmlBuilder
    {
        $buttons = [];

        // auth('tenant')->user()->tenantSubscription->no_of_halls
        if (auth('tenant')->user()->can('tenant.halls.slots.create')) {
            $buttons[] = Button::raw('add-new')
                ->addClass('btn btn-primary waves-effect waves-float waves-light m-1')
                ->text('<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add New')
                ->attr([
                    'onclick' => 'addNew()',
                ]);
        }

        if (auth('tenant')->user()->can('tenant.halls.slots.export')) {
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

        if (auth()->user()->can('tenant.halls.slots.destroy')) {
            $buttons[] = Button::raw('delete-selected')
                ->addClass('btn btn-danger waves-effect waves-float waves-light m-1')
                ->text('<i class="fa-solid fa-minus"></i>&nbsp;&nbsp;Delete Selected')
                ->attr([
                    'onclick' => 'deleteSelected()',
                ]);
        }

        return $this->builder()
            ->setTableId('hall-slots-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->serverSide()
            ->processing()
            ->deferRender()
            ->scrollX()
            ->lengthMenu([10, 20, 30, 50, 70, 100])
            ->dom('<"card-header pt-0"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>> C<"clear">')
            ->buttons($buttons)
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

        $checkColumn = Column::computed('check')->exportable(false)->printable(false)->width(10)->addClass('text-nowrap text-center align-middle');
        if (auth('tenant')->user()->can('tenant.halls.slots.destroy')) {
            $checkColumn->addClass('disabled');
        }

        $columns = [
            $checkColumn,
            Column::make('slot_name')->title('Slot')->addClass('text-nowrap text-center align-middle'),
            Column::make('start_date')->addClass('text-nowrap text-center align-middle'),
            Column::make('end_date')->addClass('text-nowrap text-center align-middle'),
            Column::make('start_time')->addClass('text-nowrap text-center align-middle'),
            Column::make('end_time')->addClass('text-nowrap text-center align-middle'),
            // Column::make('overnight')->addClass('text-nowrap text-center align-middle'),
            Column::make('active')->addClass('text-nowrap text-center align-middle'),
            Column::make('updated_at')->addClass('text-nowrap text-center align-middle'),
            Column::computed('actions')->exportable(false)->printable(false)->width(60)->addClass('text-nowrap text-center align-middle'),
        ];
        return $columns;
    }
}
