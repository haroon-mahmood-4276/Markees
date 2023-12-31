<?php

namespace App\Services\Admin\HallTypes;

use App\Models\HallType;
use App\Services\Admin\HallTypes\HallTypeInterface;
use Illuminate\Support\Facades\DB;

class HallTypeService implements HallTypeInterface
{

    private function model()
    {
        return new HallType();
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
            return $this->model()->create([
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'parent_id' => $inputs['parent_hall_type'] === env('ZERO_UUID') ? null : $inputs['parent_hall_type'],
            ]);
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            return $this->model()->find($id)->update([
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'parent_id' => $inputs['parent_hall_type'] === env('ZERO_UUID') ? null : $inputs['parent_hall_type'],
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
