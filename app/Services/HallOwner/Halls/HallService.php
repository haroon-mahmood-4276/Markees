<?php

namespace App\Services\HallOwner\Halls;

use App\Models\Hall;
use App\Services\HallOwner\Halls\HallInterface;
use Illuminate\Support\Facades\DB;

class HallService implements HallInterface
{

    private function model()
    {
        return new Hall();
    }

    public function get($relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false)
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

    public function find($id, $relationships = [])
    {
        return $this->model()->with($relationships)->where('id', $id)->orWhere('short_label', $id)->first();
    }

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
        return DB::transaction(function () use ($id, $inputs) {
            $hall = $this->model()->find($id);
            $data = [
                "name" => $inputs['name'],
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
    }

    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            return $this->model()->whereIn('id', $id)->get()->each(function ($hall) {
                $hall->delete();
            });
        });
    }
}
