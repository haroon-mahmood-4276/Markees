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

    public function getAllWithTree($relationships = [])
    {
        $hallTypes = $this->model()->all();
        return getTreeData(collect($hallTypes), $this->model());
    }

    // Store
    public function store($inputs)
    {
        $returnData = DB::transaction(function () use ($inputs) {
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'parent_id' => $inputs['hallType'],
            ];

            $hallType = $this->model()->create($data);
            return $hallType;
        });

        return $returnData;
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'parent_id' => $inputs['hallType'],
            ];

            $hallType = $this->model()->find($id)->update($data);

            return $hallType;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $hallType = $this->model()->whereIn('id', $id)->get()->each(function ($hallType) {
                $hallType->delete();
            });

            return $hallType;
        });

        return $returnData;
    }
}
