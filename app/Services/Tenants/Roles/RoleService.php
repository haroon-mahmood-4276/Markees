<?php

namespace App\Services\Tenants\Roles;

use App\Services\Tenants\Roles\RoleInterface;
use Spatie\Permission\Models\Role;

class RoleService implements RoleInterface
{
    private function model()
    {
        return new Role();
    }

    public function getAllWithTree()
    {
        $roles = $this->model()->all();
        return getTreeData(collect($roles), $this->model());
    }
}
