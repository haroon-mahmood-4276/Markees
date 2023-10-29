<?php

namespace App\Services\Tenants\Cuisines;

interface CuisineInterface
{
    public function getAll($relationships = []);
    public function getById($id, $relationships = []);

    public function store($inputs);
    public function update($id, $inputs);

    public function destroy($ids);

}
