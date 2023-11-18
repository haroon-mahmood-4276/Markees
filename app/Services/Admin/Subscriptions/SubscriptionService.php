<?php

namespace App\Services\Admin\Subscriptions;

use App\Models\Admin\Subscription;
use App\Services\Admin\Subscriptions\SubscriptionInterface;
use Illuminate\Support\Facades\DB;

class SubscriptionService implements SubscriptionInterface
{
    private function model()
    {
        return new Subscription();
    }

    public function get()
    {
        return $this->model()->all();
    }

    public function getActive()
    {
        return $this->model()->whereActive(true)->get();
    }

    public function find($id)
    {
        return $this->model()->find($id);
    }

    public function findActive($id)
    {
        return $this->model()->where(['id' => $id, 'active' => true])->first();
    }

    public function store($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            return $this->model()->create([
                'name' => $inputs['name'],
                'no_of_days' => $inputs['no_of_days'],
                'price' => $inputs['price'],
                'no_of_halls' => $inputs['no_of_halls'],
                'active' => $inputs['active'],
            ]);
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            return $this->model()->find($id)->update([
                'name' => $inputs['name'],
                'no_of_days' => $inputs['no_of_days'],
                'price' => $inputs['price'],
                'no_of_halls' => $inputs['no_of_halls'],
                'active' => $inputs['active'],
            ]);
        });
    }

    public function destroy($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            return $this->model()->whereIn('id', $inputs)->get()->each(function ($model) {
                $model->delete();
            });
        });
    }
}
