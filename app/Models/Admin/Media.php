<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\MediaLibrary\MediaCollections\Models\Media as BaseMedia;

class Media extends BaseMedia
{
    use HasUuids;

    protected $dateFormat = 'U';
}
