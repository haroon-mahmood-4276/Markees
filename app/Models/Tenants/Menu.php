<?php

namespace App\Models\Tenants;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Menu extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, HasUuids, LogsActivity;

    protected $dateFormat = 'U';

    protected $fillable = [
        'name',
        'description',
        'price',
        'has_sub_menu',
        'cuisines',
        'parent_id',
    ];

    protected $casts = [
        'menu' => 'uuid',
        'has_sub_menu' => 'boolean',
        'price' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName(self::class)->logFillable();
    }
}
