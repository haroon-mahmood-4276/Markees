<?php

namespace App\Services\Tenants\Decorations;

use App\Models\Tenants\Decoration;
use App\Services\Tenants\Decorations\DecorationInterface;
use Illuminate\Support\Facades\DB;

class DecorationService implements DecorationInterface
{

    private function model()
    {
        return new Decoration();
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

            $decoration = $this->model()->create($data);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $decoration->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('decorations');
                }
            }

            return $decoration;
        });

        return $returnData;
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $decoration = $this->model()->find($id);
            $data = [
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'],
            ];

            $decoration->update($data);

            $decoration->clearMediaCollection('decorations');

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $decoration->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('decorations');
                }
            }

            return $decoration;
        });

        return $returnData;
    }

    public function destroy($id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $decoration = $this->model()->whereIn('id', $id)->get()->each(function ($decoration) {
                $decoration->delete();
            });

            return $decoration;
        });

        return $returnData;
    }
}
