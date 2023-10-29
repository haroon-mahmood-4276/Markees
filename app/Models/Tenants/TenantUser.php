<?php

namespace App\Models\Tenants;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

use Illuminate\Foundation\Auth\User as Authenticatable;

class TenantUser extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes, HasUuids;

    protected $dateFormat = 'U';

    protected $fillable = [
        'tenant_subscription_id',
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
        'password',
        'remember_token',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public $rules = [
        'email' => ['required', 'email', 'exists:tenant_users,email'],
        'password' => ['required'],
    ];

    public function tenantSubscription()
    {
        return $this->belongsTo(TenantSubscription::class);
    }
}
