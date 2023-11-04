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

class Hall extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, HasUuids, LogsActivity;

    protected $dateFormat = 'U';

    protected $fillable = [
        'name',
        'description',
        'short_label',
        'price',
        'min_capacity',
        'max_capacity',
        'active',
    ];

    protected $casts = [
        'price' => 'float',
        'min_capacity' => 'integer',
        'max_capacity' => 'integer',
        'active' => 'boolean',
    ];

    public $rules = [
        'name' => 'required|string|between:1,30',
        'short_label' => 'required|string|between:1,30|unique:halls,short_label',
        'min_capacity' => 'required|numeric|gt:0',
        'max_capacity' => 'required|numeric|gte:min_capacity',
        'active' => 'required|boolean',
        'description' => 'nullable',
        'attachment' => 'nullable|array',
        'attachment.*' => 'image|mimes:jpg,jpeg,png',
    ];

    public function slots()
    {
        return $this->hasMany(HallSlot::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName(self::class)->logFillable();
    }
}
