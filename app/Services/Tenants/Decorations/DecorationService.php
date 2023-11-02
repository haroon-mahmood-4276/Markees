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
            $decoration = $this->model()->create([
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'],
            ]);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $decoration->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('decorations');
                }
            }

            return $decoration;
        });
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {
            $decoration = $this->model()->find($id);

            $decoration->update([
                'name' => $inputs['name'],
                'description' => $inputs['description'],
                'price' => $inputs['price'],
            ]);

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
        return DB::transaction(function () use ($id) {
            return $this->model()->whereIn('id', $id)->get()->each(function ($decoration) {
                $decoration->delete();
            });
        });
    }
}
