<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class TenantSubscription extends Model
{
    use HasFactory, SoftDeletes, HasUuids, LogsActivity;

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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName(self::class)->logFillable();
    }
}
