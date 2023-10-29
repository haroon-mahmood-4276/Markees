<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\Admin\HallOwnerDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HallOwners\{storeRequest, updateRequest};
use App\Services\Admin\{
    Subscriptions\SubscriptionInterface,
    HallOwners\HallOwnerInterface,
};
use Exception;
use Illuminate\Http\Request;

class HallOwnerController extends Controller
{
    private $hallOwnerInterface, $subscriptionInterface;

    public function __construct(HallOwnerInterface $hallOwnerInterface, SubscriptionInterface $subscriptionInterface)
    {
        $this->hallOwnerInterface = $hallOwnerInterface;
        $this->subscriptionInterface = $subscriptionInterface;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(HallOwnerDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        $data = [];

        return $dataTable->with($data)->render('admin.hall-owners.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [
            'subscriptions' => $this->subscriptionInterface->get(),
            'domain' => parse_url(env('APP_URL')),
        ];

        return view('admin.hall-owners.create', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(storeRequest $request)
    {
        abort_if(request()->ajax(), 403);

        try {
            $inputs = $request->validated();
            $record = $this->hallOwnerInterface->store($inputs);
            return redirect()->route('admin.hall-owners.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-owners.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . sqlErrorMessagesByCode($ex->getCode()));
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $id = decryptParams($id);
        try {
            $hallOwner = $this->hallOwnerInterface->getById($id);

            if ($hallOwner && !empty($hallOwner)) {
                $data = [
                    'subscriptions' => $this->subscriptionInterface->getAllActive(),
                    'domain' => parse_url(env('APP_URL')),
                    'hallOwner' => $hallOwner,
                    'owner_cnic_attachments' => $hallOwner->getMedia('owner_cnic_attachments'),
                    'owner_ntn_attachment' => $hallOwner->getFirstMedia('owner_ntn_attachment'),
                ];

                // dd($data);
                return view('admin.app.hall-owners.edit', $data);
            }

            return redirect()->route('admin.hall-owners.index')->withWarning(__('lang.commons.data_not_found'));
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-owners.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . sqlErrorMessagesByCode($ex->getCode()));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(updateRequest $request, $id)
    {
        abort_if(request()->ajax(), 403);

        $id = decryptParams($id);

        try {
            $inputs = $request->validated();
            $record = $this->hallOwnerInterface->update($id, $inputs);

            return redirect()->route('admin.hall-owners.index')->withSuccess(__('lang.commons.data_updated'));
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-owners.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroySelected(Request $request)
    {
        abort_if(request()->ajax(), 403);

        try {
            if ($request->has('chkRole')) {

                $record = $this->hallOwnerInterface->destroy($request->chkRole);

                if ($record) {
                    return redirect()->route('admin.hall-owners.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('admin.hall-owners.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (Exception $ex) {
            return redirect()->route('admin.hall-owners.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
