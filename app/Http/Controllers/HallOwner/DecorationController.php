<?php

namespace App\Http\Controllers\HallOwner;

use App\DataTables\HallOwner\DecorationsDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Decorations\{storeRequest, updateRequest};
use App\Models\HallOwner\Decoration;
use App\Services\HallOwner\Decorations\DecorationInterface;
use Exception;
use Illuminate\Http\Request;

class DecorationController extends Controller
{
    private $decorationInterface;

    public function __construct(DecorationInterface $decorationInterface)
    {
        $this->decorationInterface = $decorationInterface;
    }

    public function index(DecorationsDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.decorations.index');
    }

    public function create()
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'images' => [],
        ];

        return view('tenant.app.decorations.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->decorationInterface->store($inputs);
            return redirect()->route('tenant.decorations.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Decoration $decoration)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'decoration' => $decoration,
            'images' => $decoration->getMedia('decorations'),
        ];

        return view('tenant.app.decorations.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->decorationInterface->update($id, $inputs);
            return redirect()->route('tenant.decorations.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->decorationInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.decorations.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (Exception $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
