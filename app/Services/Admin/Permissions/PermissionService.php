<?php

namespace App\Services\Admin\Permissions;

use App\Utils\Traits\ServiceShared;
use Spatie\Permission\Models\Permission;

class PermissionService implements PermissionInterface
{
    use ServiceShared;

    private function model(): Permission
    {
        return new Permission();
    }
}
