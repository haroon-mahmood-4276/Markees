<?php

namespace App\Services\Tenants\Packages;

use App\Models\Tenants\Package;
use App\Services\Tenants\Packages\PackageInterface;
use Illuminate\Support\Facades\DB;

class PackageService implements PackageInterface
{

    private function model()
    {
        return new Package();
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

    public function getAllWithTree($relationships = [])
    {
        $menus = $this->model()->all();
        return getTreeData(collect($menus), $this->model());
    }

    // Store
    public function store($inputs)
    {
        $returnData = DB::transaction(function () use ($inputs) {
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'] ?? 0,
                'hall_type_id' => $inputs['hall_type'] ?? null,
                'decorations' => $inputs['decorations'] ?? [],
                'cuisines' => $inputs['cuisines'] ?? [],
            ];

            $packages = $this->model()->create($data);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $packages->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('packages');
                }
            }

            return $packages;
        });

        return $returnData;
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

            $package->clearMediaCollection('packages');

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $package->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('packages');
                }
            }

            return $package;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $packages = $this->model()->whereIn('id', $id)->get()->each(function ($package) {
                $package->delete();
            });

            return $packages;
        });

        return $returnData;
    }
}
