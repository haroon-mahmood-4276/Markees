<?php

namespace App\Models\Tenants;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TenantSubscription extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $dateFormat = 'U';

    protected $fillable = [
        'name',
        'no_of_days',
        'price',
        'no_of_halls',
        'active',
    ];

    protected $casts = [
        'name' => 'string',
        'no_of_days' => 'integer',
        'price' => 'float',
        'no_of_halls' => 'integer',
        'active' => 'boolean',
    ];

    public $rules = [
        'name' => 'required|string|between:1,254',
        'no_of_days' => 'required|numeric',
        'price' => 'required|numeric',
        'no_of_halls' => 'required|numeric',
        'active' => 'required|boolean',
    ];

    public function tenantUsers()
    {
        return $this->hasMany(TenantUser::class);
    }
}
