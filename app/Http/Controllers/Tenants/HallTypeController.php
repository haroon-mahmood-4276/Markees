<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\HallTypesDataTable;
use App\Exceptions\GeneralException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\HallTypes\{storeRequest, updateRequest};
use App\Services\Tenants\HallTypes\HallTypeInterface;
use Illuminate\Http\Request;
use Exception;

class HallTypeController extends Controller
{

    private $hallTypeInterface;

    public function __construct(HallTypeInterface $hallTypeInterface)
    {
        $this->hallTypeInterface = $hallTypeInterface;
    }

    public function index(Request $request, HallTypesDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.hallTypes.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->getAllWithTree(),
        ];

        return view('tenant.app.hallTypes.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $record = $this->hallTypeInterface->store($inputs);
            return redirect()->route('tenant.hallTypes.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function edit(Request $request, $id)
    {
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        $data = [
            'hallTypes' => $this->hallTypeInterface->getAllWithTree(),
            'hallType' => $this->hallTypeInterface->getById($id),
        ];

        return view('tenant.app.hallTypes.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);

            $id = decryptParams($id);

            $inputs = $request->validated();

            $record = $this->hallTypeInterface->update($id, $inputs);

            return redirect()->route('tenant.hallTypes.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->hallTypeInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.hallTypes.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }
}
