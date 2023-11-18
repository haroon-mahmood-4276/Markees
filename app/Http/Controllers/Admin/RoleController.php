<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\Admin\RolesDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Roles\{storeRequest, updateRequest};
use App\Models\Admin\Role;
use App\Services\Admin\Roles\RoleInterface;
use Illuminate\Http\Request;
use Exception;

class RoleController extends Controller
{
    private $roleInterface;

    public function __construct(RoleInterface $roleInterface)
    {
        $this->roleInterface = $roleInterface;
    }

    public function index(RolesDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        $roles = (new Role())->inRandomOrder()->withCount('users')->limit(5)->get();

        return $dataTable->render('admin.roles.index', ['roles' => $roles]);
    }

    public function create()
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'roles' => $this->roleInterface->get(with_tree: true),
        ];

        return view('admin.roles.create', $data);
    }

    public function store(storeRequest $request)
    {
        abort_if(request()->ajax(), 403);

        try {
            $inputs = $request->validated();
            $record = $this->roleInterface->store($inputs);

            return redirect()->route('admin.roles.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('admin.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function show($id)
    {
        abort(403);
    }

    public function edit(Role $role)
    {
        abort_if(request()->ajax(), 403);

        try {
            $data = [
                'role' => $role,
                'roles' => $this->roleInterface->get(with_tree: true),
            ];

            return view('admin.roles.edit', $data);
        } catch (Exception $ex) {
            return redirect()->route('admin.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function update(updateRequest $request, Role $role)
    {
        abort_if(request()->ajax(), 403);
        try {

            $inputs = $request->validated();
            $this->roleInterface->update($role->id, $inputs);
            return redirect()->route('admin.roles.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('admin.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        abort_if(request()->ajax(), 403);

        try {

            if ($request->has('checkForDelete')) {
                $record = $this->roleInterface->destroy($request->checkForDelete);
            }

            return redirect()->route('admin.roles.index')->withSuccess(__('lang.commons.data_deleted'));
        } catch (Exception $ex) {
            return redirect()->route('admin.roles.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
