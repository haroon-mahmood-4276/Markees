<?php

namespace App\Http\Controllers\HallOwner;

use App\DataTables\HallOwner\HallTypesDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\HallTypes\{storeRequest, updateRequest};
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Services\HallOwner\HallTypes\HallTypeInterface;
use App\Models\HallType;
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

        return $dataTable->render('hall_owner.hallTypes.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->get(with_tree: true),
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection())
        ];

        return view('hall_owner.hallTypes.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $this->hallTypeInterface->store($inputs);
            return redirect()->route('hall_owner.hallTypes.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(HallType $hallType)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->get(with_tree: true),
            'hallType' => $hallType,
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection()),
        ];

        return view('hall_owner.hallTypes.edit', $data);
    }

    public function update(updateRequest $request, HallType $hallType)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $this->hallTypeInterface->update($hallType->id, $inputs);
            return redirect()->route('hall_owner.hallTypes.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        abort_if(request()->ajax(), 403);
        try {
            if ($request->has('checkForDelete')) {
                $this->hallTypeInterface->destroy($request->checkForDelete);
            }
            return redirect()->route('hall_owner.hallTypes.index')->withSuccess(__('lang.commons.data_deleted'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.hallTypes.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
