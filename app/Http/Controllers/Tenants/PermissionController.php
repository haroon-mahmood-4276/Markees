<?php

namespace App\Http\Controllers\Tenants;

use App\DataTables\Tenants\PermissionsDataTable;
use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Exception;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index(PermissionsDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }
        return $dataTable->render('tenant.app.permissions.index');
    }

    public function assignPermissionToRole(Request $request)
    {
        try {
            $permission = Permission::find($request->permission_id)->assignRole(Role::find($request->role_id));

            return response()->json([
                'success' => true,
                'message' => 'Permission Assigned Sucessfully',
            ], 200);
        } catch (Exception $ex) {
            return response()->json(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function revokePermissionToRole(Request $request)
    {
        try {
            $permission = Permission::find($request->permission_id)->removeRole(Role::find($request->role_id));

            return response()->json([
                'success' => true,
                'message' => 'Permission Revoked Sucessfully',
            ], 200);
        } catch (Exception $ex) {
            return response()->json(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
