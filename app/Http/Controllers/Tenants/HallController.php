<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\HallsDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Halls\{storeRequest, updateRequest};
use App\Models\Tenants\Hall;
use App\Services\Tenants\Halls\HallInterface;
use Exception;
use Illuminate\Http\Request;

class HallController extends Controller
{
    private HallInterface $hallInterface;

    public function __construct(HallInterface $hallInterface)
    {
        $this->hallInterface = $hallInterface;
    }

    public function index(HallsDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.halls.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        if (($this->hallInterface->get(onlyCount: true) >= auth('tenant')->user()->tenantSubscription->no_of_halls)) {
            return redirect()->route('tenant.halls.index')->withWarning('You have reached the maximum number of halls allowed for your subscription plan.');
        }

        $data = [];

        return view('tenant.app.halls.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $this->hallInterface->store($inputs);
            return redirect()->route('tenant.halls.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.halls.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Hall $hall)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hall' => $hall,
            'images' => $hall->getMedia('halls'),
        ];

        return view('tenant.app.halls.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->hallInterface->update($id, $inputs);
            return redirect()->route('tenant.halls.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.halls.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->hallInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.halls.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.halls.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
            return redirect()->route('tenant.halls.index')->withDanger(__('lang.commons.something_went_wrong'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.halls.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
