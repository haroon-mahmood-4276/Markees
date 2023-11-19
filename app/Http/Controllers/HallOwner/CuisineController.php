<?php

namespace App\Http\Controllers\HallOwner;

use App\DataTables\HallOwner\CuisinesDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\HallOwner\Cuisines\{storeRequest, updateRequest};
use App\Models\Cuisine;
use App\Services\HallOwner\Cuisines\CuisineInterface;
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

        return $dataTable->render('hall_owner.cuisines.index');
    }

    public function create()
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'images' => [],
        ];

        return view('hall_owner.cuisines.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->cuisineInterface->store($inputs);
            return redirect()->route('hall_owner.cuisines.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.cuisines.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Cuisine $cuisine)
    {
        abort_if(request()->ajax(), 403);
        $data = ['cuisine' => $cuisine, 'images' => $cuisine->getMedia('cuisines')];
        return view('hall_owner.cuisines.edit', $data);
    }

    public function update(updateRequest $request, $id)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $record = $this->cuisineInterface->update($id, $inputs);
            return redirect()->route('hall_owner.cuisines.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.cuisines.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->cuisineInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('hall_owner.cuisines.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('hall_owner.cuisines.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.cuisines.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}

