<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\MenusDataTable;
use App\Exceptions\GeneralException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Menus\{storeRequest, updateRequest};
use App\Services\Tenants\Cuisines\CuisineInterface;
use App\Services\Tenants\Menus\MenuInterface;
use Exception;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    private $menuInterface;
    private $cuisinesInterface;

    public function __construct(MenuInterface $menuInterface, CuisineInterface $cuisinesInterface)
    {
        $this->menuInterface = $menuInterface;
        $this->cuisinesInterface = $cuisinesInterface;
    }

    public function index(Request $request, MenusDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.menus.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'menus' => $this->menuInterface->getAllWithTree(),
            'cuisines' => $this->cuisinesInterface->getAll(),
        ];

        return view('tenant.app.menus.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();

            // dd($inputs);
            $record = $this->menuInterface->store($inputs);
            return redirect()->route('tenant.menus.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function edit(Request $request, $id)
    {
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        $data = [
            'menus' => $this->menuInterface->getAllWithTree(),
            'menu' => $this->menuInterface->getById($id),
            'cuisines' => $this->cuisinesInterface->getAll(),
        ];

        // dd($data);
        return view('tenant.app.menus.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);

            $id = decryptParams($id);

            $inputs = $request->validated();

            $record = $this->menuInterface->update($id, $inputs);

            return redirect()->route('tenant.menus.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->menuInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.menus.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.menus.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }
}

