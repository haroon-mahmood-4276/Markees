<?php

namespace App\Services\Tenants\Decorations;

interface DecorationInterface
{
    public function get($relationships = []);

    public function find($id, $relationships = []);

    public function store($inputs);

    public function update($id, $inputs);

    public function destroy($ids);
}
