<?php

namespace App\Models\Tenants;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HallSlot extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $dateFormat = 'U';

    protected $fillable = [
        'hall_id',
        'slot_name',
        'start_date',
        'end_date',
        'days',
        'start_time',
        'end_time',
        'interval',
        'overnight',
        'active',
    ];

    protected $casts = [
        'slot_name' => 'string',
        'days' => 'array',
        'interval' => 'integer',
        'overnight' => 'boolean',
        'active' => 'boolean',
    ];

    public $rules = [
        'slot_name' => 'required|string',
        'date_range' => 'required|string',
        'days' => 'required|array',
        'start_time' => 'required',
        'end_time' => 'required',
        'active' => 'required|boolean',
    ];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
}
