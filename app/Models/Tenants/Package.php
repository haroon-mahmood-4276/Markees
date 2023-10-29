<?php

namespace App\Models\Tenants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Model, SoftDeletes};
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\MediaLibrary\{HasMedia, InteractsWithMedia};

class Package extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, LogsActivity, HasUuids;

    protected $dateFormat = 'U';

    protected $fillable = [
        'name',
        'price',
        'description',
        'hall_type_id',
        'decorations',
        'cuisines',
    ];

    protected $casts = [
        'price' => 'float',
        'hall_type_id' => 'integer',
        'decorations' => 'array',
        'cuisines' => 'array',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName(get_class($this))->logFillable()->logOnlyDirty()->dontSubmitEmptyLogs();
    }

    public function hallType()
    {
        return $this->belongsTo(HallType::class);
    }
}
