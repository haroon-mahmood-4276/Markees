<?php

namespace App\Models\Admin;

use Spatie\Activitylog\Models\Activity as BaseActivity;

class Activity extends BaseActivity
{
    protected $dateFormat = 'U';
}
