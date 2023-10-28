<?php

namespace App\Services\Admin\Subscriptions;

interface SubscriptionInterface
{
    public function get();
    public function getActive();

    public function find($id);
    public function findActive($id);

    public function store($inputs);

    public function update($id, $inputs);

    public function destroy($inputs);
}
