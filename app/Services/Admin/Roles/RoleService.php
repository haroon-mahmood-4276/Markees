<?php

namespace App\Services\Admin\Roles;

use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleService implements RoleInterface
{
    private function model()
    {
        return new Role();
    }

    public function get($ignore = null, $with_tree = false, $relationships = [])
    {
        $roles = $this->model();
        if (is_array($ignore)) {
            $roles = $roles->whereNotIn('id', $ignore);
        } else if (is_string($ignore)) {
            $roles = $roles->where('id', '!=', $ignore);
        }
        $roles = $roles->when($relationships, function ($query, $relationships) {
            return $query->with($relationships);
        })->get();

        if ($with_tree) {
            return getTreeData(collect($roles), $this->model());
        }
        return $roles;
    }

    public function find($id, $relationships = [])
    {
        return $this->model()->when($relationships, function ($query, $relationships) {
            return $query->with($relationships);
        })->find($id);
    }

    public function store($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            $data = [
                'name' => $inputs['name'],
                'guard_name' => $inputs['guard_name'],
                'parent_id' => $inputs['parent_id'],
            ];

            return $this->model()->create($data);
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            $data = [
                'name' => $inputs['name'],
                'guard_name' => $inputs['guard_name'],
                'parent_id' => $inputs['parent_id'],
            ];

            return $this->model()->find($id)->update($data);
        });
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
