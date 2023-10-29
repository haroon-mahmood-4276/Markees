<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\DecorationsDataTable;
use App\Exceptions\GeneralException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Decorations\{storeRequest, updateRequest};
use App\Services\Tenants\Decorations\DecorationInterface;
use Exception;
use Illuminate\Http\Request;

class DecorationController extends Controller
{
    private $decorationInterface;

    public function __construct(DecorationInterface $decorationInterface)
    {
        $this->decorationInterface = $decorationInterface;
    }

    public function index(Request $request, DecorationsDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.decorations.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [];

        return view('tenant.app.decorations.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();

            $record = $this->decorationInterface->store($inputs);
            return redirect()->route('tenant.decorations.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function edit(Request $request, $id)
    {
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        $data = [
            'decoration' => $this->decorationInterface->getById($id),
        ];

        return view('tenant.app.decorations.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);

            $id = decryptParams($id);

            $inputs = $request->validated();

            $record = $this->decorationInterface->update($id, $inputs);

            return redirect()->route('tenant.decorations.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong'));
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
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.decorations.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }
}
