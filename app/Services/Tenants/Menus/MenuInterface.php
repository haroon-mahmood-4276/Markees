<?php

namespace App\Services\Tenants\Menus;

interface MenuInterface
{
    public function get($ignore = null, $with_tree = false, $relationships = []);

    public function find($id, $relationships = []);

    public function store($inputs);

    public function update($id, $inputs);

    public function destroy($ids);
}
