<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class HallOwner extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, HasUuids;

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
        'ntn' => 'string|numeric|unique:hall_owners,ntn',
        'active' => 'boolean',
        'owner_ntn_attachment' => 'image|mimes:jpeg,png,jpg|max:536',
        'owner_cnic_attachments' => 'array|size:2',
        'owner_cnic_attachments.*' => 'image|mimes:jpeg,png,jpg|max:536',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
