<?php

namespace App\Services\Tenants\Menus;

use App\Models\Tenants\Menu;
use App\Services\Tenants\Menus\MenuInterface;
use Illuminate\Support\Facades\DB;

class MenuService implements MenuInterface
{

    private function model()
    {
        return new Menu();
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
                "parent_id" => $inputs['menu'],
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

        return $returnData;
    }

    public function update($id, $inputs)
    {
        $returnData = DB::transaction(function () use ($id, $inputs) {

            $menu = $this->model()->find($id);
            $data = [
                "parent_id" => $inputs['menu'],
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

        return $returnData;
    }

    public function destroy($id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $menu = $this->model()->whereIn('id', $id)->get()->each(function ($menu) {
                $menu->delete();
            });

            return $menu;
        });

        return $returnData;
    }
}
