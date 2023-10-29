<?php

namespace App\Services\Tenants\HallSlots;

interface HallSlotInterface
{
    public function getAll($hall_id, $relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false);
    public function getById($hall_id, $id, $relationships = []);

    public function store($hall_id, $inputs);
    public function update($hall_id, $id, $inputs);

    public function destroy($hall_id, $ids);

}
