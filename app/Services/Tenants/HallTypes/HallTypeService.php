<?php

namespace App\Services\Tenants\HallTypes;

use App\Models\Tenants\HallType;
use App\Services\Tenants\HallTypes\HallTypeInterface;
use Illuminate\Support\Facades\DB;

class HallTypeService implements HallTypeInterface
{

    private function model()
    {
        return new HallType();
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

    public function getWithTree($relationships = [])
    {
        $hallTypes = $this->model()->all();
        return getTreeData(collect($hallTypes), $this->model());
    }

    // Store
    public function store($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            return $this->model()->create([
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'parent_id' => $inputs['parent_hall_type'],
            ]);
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            return $this->model()->find($id)->update([
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'parent_id' => $inputs['parent_hall_type'],
            ]);
        });
    }

    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            return $this->model()->whereIn('id', $id)->get()->each(function ($hallType) {
                $hallType->delete();
            });
        });
    }
}
