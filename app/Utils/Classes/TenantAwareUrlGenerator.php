<?php

namespace App\Utils\Classes;

use Spatie\MediaLibrary\Support\UrlGenerator\DefaultUrlGenerator;

class TenantAwareUrlGenerator extends DefaultUrlGenerator
{
    public function getUrl(): string
    {
        $url = global_asset('app-assets/server-uploads/attachments/' . $this->getPathRelativeToRoot());

        $url = $this->versionUrl($url);

        return $url;
    }
}
