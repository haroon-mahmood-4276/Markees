<?php

namespace Database\Seeders;

use App\Models\HallOwner;
use App\Models\Role;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\Tenants\TenantSubscription;
use App\Models\Tenants\TenantUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class HallOwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'subscription_id' => (new Subscription())->first()->id,
            'name' => 'Haroon Mahmood',
            'email' => 'haroon.mahmood.4276@gmail.com',
            'password' => Hash::make('IyeTech@2299'),
            'phone' => '+923034243233',
            'cnic' => '11111-1111111-1',
            'ntn' => '12345671',
            'active' => true,
        ];

        $hallOwner = (new HallOwner())->create($data);
        // DB::statement('DROP DATABASE IF EXISTS markees_haroonmahmood_tenent;');
        // $domain = parse_url(env('APP_URL'));
        // $tenant = (new Tenant())->create(['id' => $data['subdomain']]);
        // $tenant->domains()->create(['domain' => $data['subdomain'] . '.' . $domain['host']]);

        // $tenant->run(function () use ($hallOwner, &$data) {

        //     $subscription = (new TenantSubscription())->create([
        //         'name' => $hallOwner->subscription->name,
        //         'no_of_days' => $hallOwner->subscription->no_of_days,
        //         'price' => $hallOwner->subscription->price,
        //         'no_of_halls' => $hallOwner->subscription->no_of_halls,
        //         'active' => $hallOwner->subscription->active,
        //     ]);

        //     $user = (new TenantUser())->create([
        //         'tenant_subscription_id' => $subscription->id,
        //         'name' => filter_strip_tags($hallOwner->name),
        //         'subdomain' => filter_strip_tags($hallOwner->subdomain),
        //         'email' => filter_strip_tags($hallOwner->email),
        //         'password' => Hash::make('IyeTech@2299'),
        //         'phone' => filter_strip_tags($hallOwner->phone),
        //         'cnic' => filter_strip_tags($hallOwner->cnic),
        //         'ntn' => filter_strip_tags($hallOwner->ntn),
        //         'active' => filter_strip_tags($hallOwner->active),
        //     ]);

        //     $user->assignRole((new Role())->first());
        // });
    }
}
