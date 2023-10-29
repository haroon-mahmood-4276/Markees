<?php

namespace App\Services\Admin\HallOwners;

interface HallOwnerInterface
{
    public function get();

    public function find($id);

    public function store($inputs);

    public function update($id, $inputs);

    public function destroy($inputs);
}
