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

    public function get($relationships = [])
    {
        return $this->model()->with($relationships)->get();
    }

    public function find($id, $relationships = [])
    {
        return $this->model()->with($relationships)->find($id);
    }

    public function store($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            $cuisune = $this->model()->create([
                'name' => $inputs['name'],
                'price' => $inputs['price'],
                'description' => $inputs['description'],
            ]);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $cuisune->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('cuisines');
                }
            }

            return $cuisune;
        });
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $cuisune = $this->model()->find($id);

            $cuisune->update([
                'name' => $inputs['name'],
                'price' => $inputs['price'],
                'description' => $inputs['description'],
            ]);

            $cuisune->clearMediaCollection('cuisines');

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $cuisune->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('cuisines');
                }
            }

            return $cuisune;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            return $this->model()->whereIn('id', $id)->get()->each(function ($cuisune) {
                $cuisune->delete();
            });
        });
    }
}
