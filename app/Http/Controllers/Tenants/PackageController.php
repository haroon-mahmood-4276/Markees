<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\PackagesDataTable;
use App\Exceptions\GeneralException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Packages\{storeRequest, updateRequest};
use App\Services\Tenants\Cuisines\CuisineInterface;
use App\Services\Tenants\Decorations\DecorationInterface;
use App\Services\Tenants\Packages\PackageInterface;
use App\Services\Tenants\HallTypes\HallTypeInterface;
use Exception;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    private $packageInterface, $hallTypeInterface, $decorationInterface, $cuisineInterface;

    public function __construct(
        PackageInterface $packageInterface,
        HallTypeInterface $hallTypeInterface,
        DecorationInterface $decorationInterface,
        CuisineInterface $cuisineInterface,
    ) {
        $this->packageInterface = $packageInterface;
        $this->hallTypeInterface = $hallTypeInterface;
        $this->decorationInterface = $decorationInterface;
        $this->cuisineInterface = $cuisineInterface;
    }

    public function index(Request $request, PackagesDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.packages.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->getAll(),
            'decorations' => $this->decorationInterface->getAll(),
            'cuisines' => $this->cuisineInterface->getAll(),
        ];

        return view('tenant.app.packages.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();

            $record = $this->packageInterface->store($inputs);
            return redirect()->route('tenant.packages.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function edit(Request $request, $id)
    {
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        $data = [
            'hallTypes' => $this->hallTypeInterface->getAll(),
            'decorations' => $this->decorationInterface->getAll(),
            'cuisines' => $this->cuisineInterface->getAll(),
            'package' => $this->packageInterface->getById($id),
        ];

        // dd($data);
        return view('tenant.app.packages.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);

            $id = decryptParams($id);

            $inputs = $request->validated();

            $record = $this->packageInterface->update($id, $inputs);

            return redirect()->route('tenant.packages.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->packageInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('tenant.packages.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (GeneralException $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        } catch (Exception $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }
}
