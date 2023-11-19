<?php

namespace App\Http\Controllers\HallOwner;

use App\DataTables\HallOwner\MenusDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\HallOwner\Menus\{storeRequest, updateRequest};
use App\Models\Menu;
use App\Services\HallOwner\Cuisines\CuisineInterface;
use App\Services\HallOwner\Menus\MenuInterface;
use Exception;
use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class MenuController extends Controller
{
    private $menuInterface;
    private $cuisinesInterface;

    public function __construct(MenuInterface $menuInterface, CuisineInterface $cuisinesInterface)
    {
        $this->menuInterface = $menuInterface;
        $this->cuisinesInterface = $cuisinesInterface;
    }

    public function index(MenusDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        return $dataTable->render('hall_owner.menus.index');
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'menus' => $this->menuInterface->get(with_tree: true),
            'cuisines' => $this->cuisinesInterface->get(),
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection()),
            'images' => []
        ];

        return view('hall_owner.menus.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $record = $this->menuInterface->store($inputs);
            return redirect()->route('hall_owner.menus.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.menus.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function edit(Menu $menu)
    {
        abort_if(request()->ajax(), 403);
        return view('hall_owner.menus.edit', [
            'menu' => $menu,
            'images' => $menu->getMedia('menus'),
            'menus' => $this->menuInterface->get(with_tree: true),
            'cuisines' => $this->cuisinesInterface->get(),
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection())
        ]);
    }

    public function update(updateRequest $request, Menu $menu)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();
            $this->menuInterface->update($menu->id, $inputs);
            return redirect()->route('hall_owner.menus.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.menus.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->menuInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('hall_owner.menus.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('hall_owner.menus.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.menus.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}

