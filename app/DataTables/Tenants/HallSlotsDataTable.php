<?php

namespace App\DataTables\Tenants;

use App\Models\Tenants\Hall;
use App\Models\Tenants\HallSlot;
use App\Services\Tenants\Halls\HallInterface;
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

            ->editColumn('created_at', function ($hallSlot) {
                return editDateColumn($hallSlot->created_at);
            })
            ->editColumn('updated_at', function ($hallSlot) {
                return editDateColumn($hallSlot->updated_at);
            })
            ->editColumn('overnight', function ($hallSlot) {
                return editBooleanColumn($hallSlot->overnight);
            })
            ->editColumn('active', function ($hallSlot) {
                return editBooleanColumn($hallSlot->active);
            })
            ->editColumn('actions', function ($hallSlot) {
                return view('tenant.app.halls.settings.slots.actions', ['hall_id' => $hallSlot->hall_id, 'id' => $hallSlot->id]);
            })
            ->editColumn('check', function ($hallSlot) {
                return $hallSlot;
            })
            ->setRowId('id')
            ->rawColumns(array_merge($columns, ['action', 'check']));
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\Tenant\HallSlot $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(HallSlot $model): QueryBuilder
    {
        return $model->newQuery();
    }

    public function html(): HtmlBuilder
    {
        $buttons = [];

        // auth('tenant')->user()->tenantSubscription->no_of_halls
        if (auth('tenant')->user()->can('tenant.halls.slots.create')) {
            $buttons[] = Button::raw('add-new')
                ->addClass('btn btn-primary ')
                ->text('<i class="bi bi-plus"></i> Add New')
                ->attr([
                    'onclick' => 'addNew()',
                ]);
        }

        if (auth('tenant')->user()->can('tenant.halls.slots.export')) {
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

        if (auth('tenant')->user()->can('tenant.halls.slots.destroy')) {
            $buttons[] = Button::raw('delete-selected')
                ->addClass('btn btn-danger ')
                ->text('<i class="bi bi-trash3-fill"></i> Delete Selected')
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

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns(): array
    {

        $checkColumn = Column::computed('check')->exportable(false)->printable(false)->width(60)->addClass('text-nowarp');
        if (auth('tenant')->user()->can('tenant.halls.slots.destroy')) {
            $checkColumn->addClass('disabled');
        }

        $columns = [
            $checkColumn,
            Column::make('slot_name')->title('Slot')->addClass('text-nowarp'),
            Column::make('start_date')->addClass('text-nowarp'),
            Column::make('end_date')->addClass('text-nowarp'),
            Column::make('start_time')->addClass('text-nowarp'),
            Column::make('end_time')->addClass('text-nowarp'),
            // Column::make('overnight')->addClass('text-nowarp'),
            Column::make('active')->addClass('text-nowarp'),
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
        return 'hallSlots_' . date('YmdHis');
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
