<?php

namespace App\Models\HallOwner;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Model, SoftDeletes};
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\MediaLibrary\{HasMedia, InteractsWithMedia};

class Package extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, LogsActivity, HasUuids, LogsActivity;

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
        'decorations' => 'array',
        'cuisines' => 'array',
    ];

    protected $with = [
        'hall_type',
    ];

    public $rules = [
        'name' => 'required|string|between:1,254',
        'description' => 'nullable',
        'price' => 'required|gte:0',
        'attachment' => 'nullable|array',
        'attachment.*' => 'image|mimes:jpg,jpeg,png',
        'cuisines' => 'nullable|array',
        'cuisines.*' => 'nullable|uuid|exists:cuisines,id',
        'hall_type' => 'nullable|uuid|exists:hall_types,id',
        'decorations' => 'nullable|array',
        'decorations.*' => 'nullable|uuid|exists:decorations,id',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName(get_class($this))->logFillable()->logOnlyDirty()->dontSubmitEmptyLogs();
    }

    public function hall_type()
    {
        return $this->belongsTo(HallType::class);
    }
}
