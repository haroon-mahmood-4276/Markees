<?php

namespace App\Services\Tenants\HallSlots;

interface HallSlotInterface
{
    public function get($hall_id, $relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false);

    public function find($id, $relationships = []);

    public function store($hall_id, $inputs);

    public function update($hall_id, $id, $inputs);

    public function destroy($hall_id, $ids);

}
