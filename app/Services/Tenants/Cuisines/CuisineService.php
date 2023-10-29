<?php

namespace App\Services\Tenants\Cuisines;

use App\Models\Tenants\Cuisine;
use App\Services\Tenants\Cuisines\CuisineInterface;
use Illuminate\Support\Facades\DB;

class CuisineService implements CuisineInterface
{

    private function model()
    {
        return new Cuisine();
    }

    // Get
    public function getAll($relationships = [])
    {
        return $this->model()->with($relationships)->get();
    }

    public function getById($id, $relationships = [])
    {
        return $this->model()->with($relationships)->find($id);
    }

    // Store
    public function store($inputs)
    {
        $returnData = DB::transaction(function () use ($inputs) {
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'],
            ];

            $cuisine = $this->model()->create($data);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $cuisine->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('cuisines');
                }
            }

            return $cuisine;
        });

        return $returnData;
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $cuisine = $this->model()->find($id);
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'],
            ];

            $cuisine->update($data);

            $cuisine->clearMediaCollection('cuisines');

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $cuisine->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('cuisines');
                }
            }

            return $cuisine;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $cuisine = $this->model()->whereIn('id', $id)->get()->each(function ($cuisine) {
                $cuisine->delete();
            });

            return $cuisine;
        });

        return $returnData;
    }
}
