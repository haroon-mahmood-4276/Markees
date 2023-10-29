<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\CuisinesDataTable;
use App\Exceptions\GeneralException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Cuisines\{storeRequest, updateRequest};
use App\Services\Tenants\Cuisines\CuisineInterface;
use Exception;
use Illuminate\Http\Request;

class CuisineController extends Controller
{
    private $cuisineInterface;

    public function __construct(CuisineInterface $cuisineInterface)
    {
        $this->cuisineInterface = $cuisineInterface;
    }

    public function index(CuisinesDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.cuisines.index');
    }

    public function create()
    {
        abort_if(request()->ajax(), 403);

        $data = [];

        return view('tenant.app.cuisines.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();

            $record = $this->cuisineInterface->store($inputs);
            return redirect()->route('tenant.cuisines.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function edit(Request $request, $id)
    {
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        $data = [
            'cuisine' => $this->cuisineInterface->getById($id),
        ];

        return view('tenant.app.cuisines.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);

            $id = decryptParams($id);

            $inputs = $request->validated();

            $record = $this->cuisineInterface->update($id, $inputs);

            return redirect()->route('tenant.cuisines.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->cuisineInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.cuisines.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.cuisines.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }
}

