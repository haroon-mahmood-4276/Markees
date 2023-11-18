<?php

namespace App\Services\HallOwner\Packages;

use App\Models\Package;
use App\Services\HallOwner\Packages\PackageInterface;
use Illuminate\Support\Facades\DB;

class PackageService implements PackageInterface
{

    private function model()
    {
        return new Package();
    }

    public function get($ignore = null, $with_tree = false, $relationships = [])
    {
        $model = $this->model();
        if (is_array($ignore)) {
            $model = $model->whereNotIn('id', $ignore);
        } else if (is_string($ignore)) {
            $model = $model->where('id', '!=', $ignore);
        }
        $model = $model->when($relationships, function ($query, $relationships) {
            return $query->with($relationships);
        })->get();

        if ($with_tree) {
            return getTreeData(collect($model), $this->model());
        }
        return $model;
    }

    public function find($id, $relationships = [])
    {
        return $this->model()->when($relationships, function ($query, $relationships) {
            return $query->with($relationships);
        })->find($id);
    }

    public function store($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'] ?? 0,
                'hall_type_id' => $inputs['hall_type'] ?? null,
                'decorations' => $inputs['decorations'] ?? [],
                'cuisines' => $inputs['cuisines'] ?? [],
            ];

            $packages = $this->model()->create($data);

            // if (isset($inputs['attachment'])) {
            //     foreach ($inputs['attachment'] as $attachment) {
            //         $packages->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('packages');
            //     }
            // }

            return $packages;
        });
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {

            $package = $this->model()->find($id);
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'] ?? 0,
                'hall_type_id' => $inputs['hall_type'] ?? null,
                'decorations' => $inputs['decorations'] ?? [],
                'cuisines' => $inputs['cuisines'] ?? [],
            ];

            $package->update($data);

            // $package->clearMediaCollection('packages');

            // if (isset($inputs['attachment'])) {
            //     foreach ($inputs['attachment'] as $attachment) {
            //         $package->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('packages');
            //     }
            // }

            return $package;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            return $this->model()->whereIn('id', $id)->get()->each(function ($package) {
                $package->delete();
            });
        });
    }
}
