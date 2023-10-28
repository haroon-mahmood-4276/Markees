<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\Admin\SubscriptionsDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Subscriptions\{storeRequest, updateRequest};
use App\Models\Subscription;
use App\Services\Admin\Subscriptions\SubscriptionInterface;
use Exception;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    private $subscriptionInterface;

    public function __construct(SubscriptionInterface $subscriptionInterface)
    {
        $this->subscriptionInterface = $subscriptionInterface;
    }

    public function index(SubscriptionsDataTable $dataTable)
    {
        if (request()->ajax()) {
            return $dataTable->ajax();
        }

        $data = [];

        return $dataTable->with($data)->render('admin.subscriptions.index', $data);
    }

    public function create(Request $request)
    {
        abort_if(request()->ajax(), 403);

        $data = [];

        return view('admin.subscriptions.create', $data);
    }

    public function store(storeRequest $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            $inputs = $request->validated();
            $record = $this->subscriptionInterface->store($inputs);
            return redirect()->route('admin.subscriptions.index')->withSuccess(__('lang.commons.data_saved'));
        } catch (Exception $ex) {
            return redirect()->route('admin.subscriptions.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . sqlErrorMessagesByCode($ex->getCode()));
        }
    }

    public function edit(Subscription $subscription)
    {
        try {
            return view('admin.subscriptions.edit', ['subscription' => $subscription]);
        } catch (Exception $ex) {
            return redirect()->route('admin.subscriptions.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . sqlErrorMessagesByCode($ex->getCode()));
        }
    }

    public function update(updateRequest $request, Subscription $subscription)
    {
        try {
            abort_if(request()->ajax(), 403);
            $inputs = $request->validated();

            $record = $this->subscriptionInterface->update($subscription->id, $inputs);

            return redirect()->route('admin.subscriptions.index')->withSuccess(__('lang.commons.data_updated'));
        } catch (Exception $ex) {
            return redirect()->route('admin.subscriptions.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        try {
            abort_if(request()->ajax(), 403);

            if ($request->has('checkForDelete')) {

                $record = $this->subscriptionInterface->destroy($request->checkForDelete);

                if ($record) {
                    return redirect()->route('admin.subscriptions.index')->withSuccess(__('lang.commons.data_deleted'));
                } else {
                    return redirect()->route('admin.subscriptions.index')->withDanger(__('lang.commons.data_not_found'));
                }
            }
        } catch (Exception $ex) {
            return redirect()->route('admin.subscriptions.index')->withDanger(__('lang.commons.something_went_wrong') . ' ' . $ex->getMessage());
        }
    }
}
