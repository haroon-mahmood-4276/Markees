<?php

namespace App\Http\Controllers\HallOwner\Users;

use App\Http\Controllers\Controller;
use App\Services\HallOwner\Halls\HallInterface as TenantHallInterface;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    private TenantHallInterface $tenantHallInterface;

    public function __construct(TenantHallInterface $tenantHallInterface)
    {
        $this->tenantHallInterface = $tenantHallInterface;
    }

    /**
     * @return View
     */
    public function index(): View
    {

        abort_if(request()->ajax(), 403);

        $data = [
            'halls' => $this->tenantHallInterface->getAll(relationships: ['slots']),
        ];

        return view('hall_owner.users.app.home', $data);
    }
}
