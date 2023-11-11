<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\PackagesDataTable;
use App\Exceptions\GeneralException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Packages\{storeRequest, updateRequest};
use App\Models\Tenants\Package;
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

    public function index(PackagesDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('tenant.app.packages.index');
    }

    public function create()
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->get(),
            'decorations' => $this->decorationInterface->get(),
            'cuisines' => $this->cuisineInterface->get(),
        ];

        return view('tenant.app.packages.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->packageInterface->store($inputs);
            return redirect()->route('tenant.packages.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Package $package)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hallTypes' => $this->hallTypeInterface->get(),
            'decorations' => $this->decorationInterface->get(),
            'cuisines' => $this->cuisineInterface->get(),
            'package' => $package,
        ];

        return view('tenant.app.packages.edit', $data);
    }

    public function update(updateRequest $request, Package $package)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->packageInterface->update($package->id, $inputs);
            return redirect()->route('tenant.packages.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
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
        } catch (Exception $ex) {
            return redirect()->route('tenant.packages.index')->withDanger(__('lang.commons.something_went_wrong'));
        }
    }
}
