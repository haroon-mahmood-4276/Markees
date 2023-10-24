<?php

namespace App\Services\Admin\Roles;

use App\Models\Role;
use App\Utils\Traits\ServiceShared;
use Illuminate\Support\Facades\DB;

class RoleService implements RoleInterface
{
    use ServiceShared;

    private function model()
    {
        return new Role();
    }

    public function store($inputs)
    {
        $returnData = DB::transaction(function () use ($inputs) {
            $data = [
                'name' => $inputs['name'],
                'guard_name' => $inputs['guard_name'],
                'parent_id' => $inputs['parent_id'],
            ];

            $role = $this->model()->create($data);

            return $role;
        });

        return $returnData;
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $data = [
                'name' => $inputs['name'],
                'guard_name' => $inputs['guard_name'],
                'parent_id' => $inputs['parent_id'],
            ];

            $role = $this->model()->find($id)->update($data);

            return $role;
        });

        return $returnData;
    }

    public function destroy($inputs)
    {
        $returnData = DB::transaction(function () use ($inputs) {

            $roles = $this->model()->whereIn('id', $inputs)->get()->each(function ($role) {
                $role->delete();
            });

            return $roles;
        });

        return $returnData;
    }
}
