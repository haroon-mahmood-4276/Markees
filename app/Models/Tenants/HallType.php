<?php

namespace App\Models\Tenants;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HallType extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $dateFormat = 'U';

    protected $fillable = [
        'name',
        'description',
        'parent_id',
    ];
}
