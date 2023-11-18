<?php

namespace App\Http\Controllers\HallOwner;

use App\DataTables\HallOwner\HallSlotsDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\HallSlots\{storeRequest, updateRequest};
use App\Models\Hall;
use App\Models\HallSlot;
use App\Services\HallOwner\HallSlots\HallSlotInterface;
use Exception;
use Illuminate\Http\Request;

class HallSlotController extends Controller
{
    private $hallSlotInterface;

    public function __construct(HallSlotInterface $hallSlotInterface)
    {
        $this->hallSlotInterface = $hallSlotInterface;
    }

    public function index(HallSlotsDataTable $dataTable, Hall $hall)
    {

        $data = ['hall' => $hall];

        if (request()->ajax()) {
            return $dataTable->with($data)->ajax();
        }

        return $dataTable->with($data)->render('hall_owner.halls.settings.slots.index', $data);
    }

    public function create(Hall $hall)
    {
        abort_if(request()->ajax(), 403);

        $data = ['hall' => $hall];

        return view('hall_owner.halls.settings.slots.create', $data);
    }

    public function store(storeRequest $request, Hall $hall)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $record = $this->hallSlotInterface->store($hall->id, $inputs);
            return redirect()->route('hall_owner.halls.slots.index', ['hall' => $hall->id])->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.halls.slots.index', ['hall' => $hall->id])->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Hall $hall, HallSlot $slot)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hall' => $hall,
            'slot' => $slot,
        ];

        return view('hall_owner.halls.settings.slots.edit', $data);
    }

    public function update(updateRequest $request, Hall $hall, HallSlot $slot)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $record = $this->hallSlotInterface->update($hall->id, $slot->id, $inputs);
            return redirect()->route('hall_owner.halls.slots.index', ['hall' => $hall->id])->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.halls.slots.index', ['hall' => $hall->id])->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request, Hall $hall)
    {
        abort_if(request()->ajax(), 403);
        try {
            if ($request->has('checkForDelete')) {
                $this->hallSlotInterface->destroy($hall->id, $request->checkForDelete);
            }
            return redirect()->route('hall_owner.halls.slots.index', ['hall' => $hall->id])->withSuccess(__('lang.commons.data_deleted'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.halls.slots.index', ['hall' => $hall->id])->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
