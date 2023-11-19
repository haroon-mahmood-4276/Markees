<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\Admin\HallTypesDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HallTypes\{storeRequest, updateRequest};
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Models\HallType;
use App\Services\Admin\HallTypes\HallTypeInterface;
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

        return $dataTable->render('admin.hall-types.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->get(with_tree: true),
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection())
        ];

        return view('admin.hall-types.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $this->hallTypeInterface->store($inputs);
            return redirect()->route('admin.hall-types.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-types.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
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

        return view('admin.hall-types.edit', $data);
    }

    public function update(updateRequest $request, HallType $hall_type)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->hallTypeInterface->update($hall_type->id, $inputs);
            return redirect()->route('admin.hall-types.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-types.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        abort_if(request()->ajax(), 403);
        try {
            if ($request->has('checkForDelete')) {
                $this->hallTypeInterface->destroy($request->checkForDelete);
            }
            return redirect()->route('admin.hall-types.index')->withSuccess(__('lang.commons.data_deleted'));
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-types.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
