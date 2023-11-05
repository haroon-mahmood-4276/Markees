<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\HallSlotsDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\HallSlots\{storeRequest, updateRequest};
use App\Services\Tenants\HallSlots\HallSlotInterface;
use Exception;
use Illuminate\Http\Request;

class HallSlotController extends Controller
{
    private $hallSlotInterface;

    public function __construct(HallSlotInterface $hallSlotInterface)
    {
        $this->hallSlotInterface = $hallSlotInterface;
    }

    public function index(Request $request, HallSlotsDataTable $dataTable, $hall_id)
    {

        $data = ['hall_id' => $hall_id];

        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->with($data)->render('tenant.app.halls.settings.slots.index', $data);
    }

    public function create(Request $request, $hall_id)
    {
        abort_if(request()->ajax(), 403);

        $data = ['hall_id' => $hall_id];

        return view('tenant.app.halls.settings.slots.create', $data);
    }

    public function store(storeRequest $request, $hall_id)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            // dd($inputs);
            $record = $this->hallSlotInterface->store($hall_id, $inputs);
            return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Request $request, $hall_id, $id)
    {
        abort(403);
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        $data = [
            'hallSlot' => $this->hallSlotInterface->getById($hall_id, $id),
        ];

        return view('tenant.app.halls.settings.slots.edit', $data);
    }

    public function update(updateRequest $request, $hall_id, $id)
    {
        try {
            abort(403);
            abort_if(request()->ajax(), 403);

            $id = decryptParams($id);

            $inputs = $request->validated();

            $record = $this->hallSlotInterface->update($hall_id, $id, $inputs);

            return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request, $hall_id)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->hallSlotInterface->destroy($hall_id, $request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (Exception $ex) {
            return redirect()->route('tenant.halls.slots.index', ['hall_id' => $hall_id])->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
