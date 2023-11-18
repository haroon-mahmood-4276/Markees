<?php

namespace App\Services\HallOwner\Menus;

use App\Models\HallOwner\Menu;
use App\Services\HallOwner\Menus\MenuInterface;
use Illuminate\Support\Facades\DB;

class MenuService implements MenuInterface
{
    private function model()
    {
        return new Menu();
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
                "parent_id" => $inputs['menu'] == 0 ? null : $inputs['menu'],
                "name" => $inputs['name'],
                "description" => $inputs['description'],
                "has_sub_menu" => $inputs['has_sub_menu'],
                "price" => 0,
                "cuisines" => null
            ];

            if (!$inputs['has_sub_menu']) {
                $data['cuisines'] = json_encode($inputs['cuisines']);
                $data['price'] = $inputs['price'];
            }

            $menu = $this->model()->create($data);

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $menu->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('menus');
                }
            }

            return $menu;
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            $menu = $this->model()->find($id);
            $data = [
                "parent_id" => $inputs['menu'] == 0 ? null : $inputs['menu'],
                "name" => $inputs['name'],
                "description" => $inputs['description'],
                "has_sub_menu" => $inputs['has_sub_menu'],
                "price" => 0,
                "cuisines" => []
            ];

            if (!$inputs['has_sub_menu']) {
                $data['cuisines'] = json_encode($inputs['cuisines']);
                $data['price'] = $inputs['price'];
            }

            $menu->update($data);
            $menu->clearMediaCollection('menus');

            if (isset($inputs['attachment'])) {
                foreach ($inputs['attachment'] as $attachment) {
                    $menu->addMedia($attachment)->usingFileName($attachment->hashName())->toMediaCollection('menus');
                }
            }

            return $menu;
        });
    }

    public function destroy($inputs)
    {
        return DB::transaction(function () use ($inputs) {
            return $this->model()->whereIn('id', $inputs)->get()->each(function ($role) {
                $role->delete();
            });
        });
    }
}
