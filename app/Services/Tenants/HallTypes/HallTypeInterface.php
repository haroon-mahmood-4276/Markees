<?php

namespace App\Services\Tenants\HallTypes;

interface HallTypeInterface
{
    public function getAll($relationships = []);
    public function getById($id, $relationships = []);
    public function getAllWithTree($relationships = []);

    public function store($inputs);
    public function update($id, $inputs);

    public function destroy($ids);

}
