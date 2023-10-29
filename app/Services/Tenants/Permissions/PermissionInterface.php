<?php

namespace App\Services\Tenants\Permissions;

interface PermissionInterface
{
    public function getByAll();
    public function getById($id);

    public function store($inputs);
    public function update($id, $inputs);

    public function destroySelected($ids);

}
