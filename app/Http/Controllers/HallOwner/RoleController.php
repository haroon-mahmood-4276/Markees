<?php

namespace App\Http\Controllers\HallOwner;

use App\Models\Role;
use App\DataTables\HallOwner\RolesDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Roles\{storeRequest, updateRequest};
use App\Services\HallOwner\Roles\RoleInterface;
use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Exception;

class RoleController extends Controller
{
    private $roleInterface;

    public function __construct(RoleInterface $roleInterface)
    {
        $this->roleInterface = $roleInterface;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RolesDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        $roles = (new Role())->inRandomOrder()->withCount('users')->limit(5)->get();

        return $dataTable->render('hall_owner.roles.index', ['roles' => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'roles' => $this->roleInterface->get(with_tree: true),
            'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection())
        ];
        return view('hall_owner.roles.create', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(storeRequest $request)
    {
        abort_if(request()->ajax(), 403);

        try {
            $inputs = $request->validated();
            $this->roleInterface->store($inputs);

            return redirect()->route('hall_owner.roles.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        abort(403);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        abort_if(request()->ajax(), 403);

        try {
            $data = [
                'role' => $role,
                'roles' => $this->roleInterface->get(with_tree: true),
                'dir' => getIconDirection(LaravelLocalization::getCurrentLocaleDirection())
            ];

            return view('hall_owner.roles.edit', $data);
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(updateRequest $request, Role $role)
    {
        abort_if(request()->ajax(), 403);
        try {
            $inputs = $request->validated();
            $this->roleInterface->update($role->id, $inputs);
            return redirect()->route('hall_owner.roles.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        abort_if(request()->ajax(), 403);

        try {

            if ($request->has('checkForDelete')) {
                $record = $this->roleInterface->destroy($request->checkForDelete);
            }

            return redirect()->route('hall_owner.roles.index')->withSuccess(__('lang.commons.data_deleted'));
        } catch (Exception $ex) {
            return redirect()->route('hall_owner.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
