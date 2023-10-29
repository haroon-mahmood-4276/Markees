<?php

namespace App\Services\Tenants\Halls;

use App\Models\Tenants\Hall;
use App\Services\Tenants\Halls\HallInterface;
use Illuminate\Support\Facades\DB;

class HallService implements HallInterface
{

    private function model()
    {
        return new Hall();
    }

    // Get
    public function getAll($relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false)
    {
        $query = $this->model();

        if ($withTrashed) {
            $query = $query->withTrashed();
        }

        if ($onlyTrashed) {
            $query = $query->onlyTrashed();
        }

        if (count($relationships) > 0) {
            $query = $query->with($relationships);
        }

        if (count($withCountRelationship) > 0) {
            $query = $query->withCount($withCountRelationship);
        }

        if ($onlyCount) {
            return $query->count();
        }

        return $query->get();
    }

    public function getById($id, $relationships = [])
    {
        return $this->model()->with($relationships)->find($id);
    }

    public function getByShortLabel($short_label, $relationships = [])
    {
        return $this->model()->with($relationships)->where('short_label', $short_label)->first();
    }

    // Store
    public function store($inputs)
    {
        $returnData = DB::transaction(function () use ($inputs) {
            $data = [
                "name" => $inputs['name'],
                "short_label" => $inputs['short_label'],
                "min_capacity" => $inputs['min_capacity'],
                "max_capacity" => $inputs['max_capacity'],
                "description" => $inputs['description'],
                "active" => $inputs['active'],
            ];

            $hall = $this->model()->create($data);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $hall->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('halls');
                }
            }

            return $hall;
        });

        return $returnData;
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $hall = $this->model()->find($id);
            $data = [
                "name" => $inputs['name'],
                // "short_label" => $inputs['short_label'],
                "min_capacity" => $inputs['min_capacity'],
                "max_capacity" => $inputs['max_capacity'],
                "description" => $inputs['description'],
                "active" => $inputs['active'],
            ];

            $hall->update($data);

            $hall->clearMediaCollection('halls');

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $hall->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('halls');
                }
            }

            return $hall;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $hall = $this->model()->whereIn('id', $id)->get()->each(function ($hall) {
                $hall->delete();
            });

            return $hall;
        });

        return $returnData;
    }
}
