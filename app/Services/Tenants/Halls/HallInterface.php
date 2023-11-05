<?php

namespace App\Services\Tenants\Halls;
interface HallInterface
{
    public function get($relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false);

    public function find($id, $relationships = []);

    public function store($inputs);

    public function update($id, $inputs);

    public function destroy($ids);
}
