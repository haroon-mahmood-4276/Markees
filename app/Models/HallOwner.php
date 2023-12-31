<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class HallOwner extends Authenticatable implements HasMedia, Authorizable
{
    use HasFactory, SoftDeletes, InteractsWithMedia, HasUuids, LogsActivity;

    protected $dateFormat = 'U';

    protected $fillable = [
        'subscription_id',
        'name',
        'subdomain',
        'email',
        'phone',
        'cnic',
        'ntn',
        'password',
        'active',
    ];

    protected $hidden = [
        // 'password',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public $rules = [
        'subscription' => 'uuid',
        'name' => 'string',
        'subdomain' => 'alpha_dash|unique:hall_owners,subdomain',
        'email' => 'email|unique:hall_owners,email',
        'phone' => 'unique:hall_owners,phone',
        'cnic' => 'alpha_dash|min:15|max:15|unique:hall_owners,cnic',
        'ntn' => 'string|unique:hall_owners,ntn',
        'active' => 'boolean',
        'owner_ntn_attachment' => 'image|mimes:jpeg,png,jpg|max:536',
        'owner_cnic_attachments' => 'array|size:2',
        'owner_cnic_attachments.*' => 'image|mimes:jpeg,png,jpg|max:536',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName(self::class)->logFillable();
    }
}
