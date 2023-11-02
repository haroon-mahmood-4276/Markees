<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\HallTypesDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\HallTypes\{storeRequest, updateRequest};
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Services\Tenants\HallTypes\HallTypeInterface;
use App\Models\Tenants\HallType;
use Illuminate\Http\Request;
use Exception;

class HallTypeController extends Controller
{
    private $hallTypeInterface;

    public function __construct(HallTypeInterface $hallTypeInterface)
    {
        $this->hallTypeInterface = $hallTypeInterface;
    }

    public function index(HallTypesDataTable $dataTable)
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
            'hallTypes' => $this->hallTypeInterface->getWithTree(),
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection())
        ];

        return view('tenant.app.hallTypes.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $this->hallTypeInterface->store($inputs);
            return redirect()->route('tenant.hallTypes.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(HallType $hallType)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->getWithTree(),
            'hallType' => $hallType,
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection()),
        ];

        return view('tenant.app.hallTypes.edit', $data);
    }

    public function update(updateRequest $request, HallType $hallType)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $this->hallTypeInterface->update($hallType->id, $inputs);
            return redirect()->route('tenant.hallTypes.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        abort_if(request()->ajax(), 403);
        try {
            if ($request->has('checkForDelete')) {
                $this->hallTypeInterface->destroy($request->checkForDelete);
            }
            return redirect()->route('tenant.hallTypes.index')->withSuccess(__('lang.commons.data_deleted'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
