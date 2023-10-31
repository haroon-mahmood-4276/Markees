<?php

namespace App\Services\Tenants\Roles;

use Illuminate\Support\Facades\DB;
use App\Services\Tenants\Roles\RoleInterface;
use App\Models\Role;

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
            return $this->model()->create([
                'name' => $inputs['name'],
                'guard_name' => $inputs['guard_name'],
                'parent_id' => $inputs['parent_id'],
            ]);
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            return $this->model()->find($id)->update([
                'name' => $inputs['name'],
                'guard_name' => $inputs['guard_name'],
                'parent_id' => $inputs['parent_id'],
            ]);
        });
    }

    public function destroy($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            return $this->model()->whereIn('id', $inputs)->get()->each(function ($role) {
                $role->delete();
            });
        });
    }
}
