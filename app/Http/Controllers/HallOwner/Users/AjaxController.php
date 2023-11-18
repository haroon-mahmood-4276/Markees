<?php

namespace App\Http\Controllers\HallOwner\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\HallOwner\{
    HallSlots\HallSlotInterface as TenantHallSlotInterface,
};

class AjaxController extends Controller
{

    private TenantHallSlotInterface $tenantHallSlotInterface;

    public function __construct(TenantHallSlotInterface $tenantHallSlotInterface)
    {
        $this->tenantHallSlotInterface = $tenantHallSlotInterface;
    }

    /**
     * @param Request $request
     * @param $hall_id
     * @return JsonResponse
     */
    public function AjaxGetSlotByHallId(Request $request, $hall_id): JsonResponse
    {
        abort_if(!request()->ajax(), 403);

        $data = [
            'slots' => $this->tenantHallSlotInterface->getAll($hall_id),
            'key' => $request->key,
            'type' => $request->type ?? 'radio',
        ];

        if ($request->has('need') && $request->need == 'json') {
            return apiSuccessResponse($data);
        }

        if ($request->has('need') && $request->need == 'view') {
            $view = view('tenant.users.app.bookings.partials.select', $data)->render();
            return apiSuccessResponse($view);
        }

        return apiErrorResponse('Need Key is required');

    }
}
