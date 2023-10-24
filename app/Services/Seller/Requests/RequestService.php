<?php

namespace App\Services\Seller\Requests;

use App\Models\Request;
use App\Utils\Enums\Status;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class RequestService implements RequestInterface
{
    private function model()
    {
        return new Request();
    }

    public function find($requestFor, $id, $relationships = [])
    {
        $model = $this->model()->where('modelable', getModel($requestFor)::class);

        if (count($relationships) > 0) {
            $model = $model->with($relationships);
        }

        return $model->find($id);
    }

    /**
     * @throws Throwable
     */
    public function store($requestFor, $inputs)
    {
        return DB::transaction(function () use ($requestFor, $inputs) {

            $data = [
                'name' => $inputs['name'],
                'slug' => Str::slug($inputs['name']),
                'modelable' => $inputs['modelable'],
                'status' => Status::PENDING_APPROVAL
            ];

            $requestForModel = $this->model()->create($data);

            if (isset($inputs['image'])) {
                $requestForModel->addMedia($inputs['image'])->toMediaCollection('requests-' . $requestFor);
            }

            return $requestForModel;
        });
    }

    public function update($requestFor, $id, $inputs)
    {
        $returnData = DB::transaction(function () use ($requestFor, $id, $inputs) {

            $requestForModel = $this->model()->find($id);

            $data = [
                'name' => $inputs['name'],
                'slug' => Str::slug($inputs['name']),
                'status' => Status::PENDING_APPROVAL
            ];

            $requestForModel->update($data);

            $requestForModel->clearMediaCollection('requests-' . $requestFor);
            if (isset($inputs['image'])) {
                $requestForModel->addMedia($inputs['image'])->toMediaCollection('requests-' . $requestFor);
            }

            return $requestForModel;
        });

        return $returnData;
    }

    public function destroy($requestFor, $inputs)
    {
        $returnData = DB::transaction(function () use ($requestFor, $inputs) {

            $requestForModel = $this->model()->whereIn('id', $inputs)->get()->each(function ($requestForModel) use ($requestFor) {
                $requestForModel->clearMediaCollection('requests-' . $requestFor);
                $requestForModel->delete();
            });

            return $requestForModel;
        });

        return $returnData;
    }
}
