<?php

namespace App\Http\Controllers\Tenants\Users;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use App\Services\Tenants\Halls\HallInterface as TenantHallInterface;
use Illuminate\Http\Request;

class BookingController extends Controller
{

    private TenantHallInterface $tenantHallInterface;

    public function __construct(TenantHallInterface $tenantHallInterface)
    {
        $this->tenantHallInterface = $tenantHallInterface;
    }

    /**
     * @param $hall_id
     * @return View
     */
    public function create($hall_id): View
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'hall_id' => $hall_id,
            'halls' => $this->tenantHallInterface->getAll(relationships: ['slots']),
        ];

        return view('tenant.users.app.bookings.create', $data);
    }


}
