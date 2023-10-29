<?php

namespace App\Services\Tenants\Halls;

interface HallInterface
{
    public function getAll($relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false);
    public function getById($id, $relationships = []);
    public function getByShortLabel($short_label, $relationships = []);

    public function store($inputs);
    public function update($id, $inputs);

    public function destroy($ids);

}
