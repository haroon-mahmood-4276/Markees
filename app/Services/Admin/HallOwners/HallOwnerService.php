<?php

namespace App\Services\Admin\HallOwners;

use App\Models\HallOwner;
use App\Models\Tenant;
use App\Models\Tenants\TenantSubscription;
use App\Models\Tenants\TenantUser;
use App\Services\Admin\HallOwners\HallOwnerInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use stdClass;

class HallOwnerService implements HallOwnerInterface
{
    private function model()
    {
        return new HallOwner();
    }

    public function get()
    {
        return $this->model()->all();
    }

    public function find($id)
    {
        return $this->model()->find($id);
    }

    public function store($inputs)
    {
        return DB::transaction(function () use ($inputs, &$hallOwner) {

            $data = [
                'subscription_id' => $inputs['subscription'],
                'name' => $inputs['name'],
                'subdomain' => $inputs['subdomain'],
                'email' => $inputs['email'],
                'phone' => $inputs['phone'],
                'cnic' => $inputs['cnic'],
                'ntn' => $inputs['ntn'],
                'active' => $inputs['active'],
                'password' => Hash::make($inputs['password']),
            ];

            $hallOwner = $this->model()->create($data);

            if (isset($inputs['owner_cnic_attachments'])) {
                foreach ($inputs['owner_cnic_attachments'] as $attachment) {
                    $hallOwner->addMedia($attachment)->toMediaCollection('owner_cnic_attachments');
                }
            }

            if (isset($inputs['owner_ntn_attachment'])) {
                $attachment = $inputs['owner_ntn_attachment'];
                $hallOwner->addMedia($attachment)->toMediaCollection('owner_ntn_attachment');
            }

            if (isset($inputs['subdomain'])) {

                $domain = parse_url(env('APP_URL'));
                $tenant = (new Tenant())->create(['id' => $inputs['subdomain']]);
                $tenant->domains()->create(['domain' => $inputs['subdomain'] . '.' . $domain['host']]);

                $tenant->run(function () use ($hallOwner, $inputs) {

                    $subscription = (new TenantSubscription())->create([
                        'name' => $hallOwner->subscription->name,
                        'no_of_days' => $hallOwner->subscription->no_of_days,
                        'price' => $hallOwner->subscription->price,
                        'no_of_halls' => $hallOwner->subscription->no_of_halls,
                        'active' => $hallOwner->subscription->active,
                    ]);

                    (new TenantUser())->create([
                        'tenant_subscription_id' => $subscription->id,
                        'name' => $hallOwner->name,
                        'subdomain' => $hallOwner->subdomain,
                        'email' => $hallOwner->email,
                        'password' => Hash::make($inputs['password']),
                        'phone' => $hallOwner->phone,
                        'cnic' => $hallOwner->cnic,
                        'ntn' => $hallOwner->ntn,
                        'active' => $hallOwner->active,
                    ]);
                });
            }
        });
    }

    public function update($id, $inputs)
    {
        return DB::transaction(function () use ($id, $inputs) {
            $hallOwner = $this->model()->find($id);

            $data = [
                'subscription_id' => $inputs['subscription'],
                'name' => $inputs['name'],
                // 'subdomain' => $inputs['subdomain'],
                // 'email' => $inputs['email'],
                'phone' => $inputs['phone'],
                'cnic' => $inputs['cnic'],
                'ntn' => $inputs['ntn'],
                'active' => $inputs['active'],
            ];

            if (isset($inputs['password']) && !is_null($inputs['password']) && !empty($inputs['password']) && strlen($inputs['password']) > 0) {
                $inputs['password'] = Hash::make($inputs['password']);
            }

            $hallOwner->update($data);

            $hallOwner->clearMediaCollection('owner_cnic_attachments');
            if (isset($inputs['owner_cnic_attachments'])) {
                foreach ($inputs['owner_cnic_attachments'] as $attachment) {
                    $hallOwner->addMedia($attachment)->toMediaCollection('owner_cnic_attachments');
                }
            }

            $hallOwner->clearMediaCollection('owner_ntn_attachment');
            if (isset($inputs['owner_ntn_attachment'])) {
                $attachment = $inputs['owner_ntn_attachment'];
                $hallOwner->addMedia($attachment)->toMediaCollection('owner_ntn_attachment');
            }
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
