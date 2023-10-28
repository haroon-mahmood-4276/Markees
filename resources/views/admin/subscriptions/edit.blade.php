@extends('admin.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'admin.subscriptions.edit') }}
@endsection

@section('page-title', 'Update Subscriptions')

@section('page-vendor')
@endsection

@section('page-css')
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Update Subscriptions</h2>
        {{ Breadcrumbs::render('admin.subscriptions.edit') }}
    </div>
@endsection

@section('content')
    <form action="{{ route('admin.subscriptions.update', ['subscription' => $subscription->id]) }}" method="POST"
        enctype="multipart/form-data">
        <div class="row g-3">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">

                @csrf
                @method('PUT')

                @include('admin.subscriptions.form-fields')

            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-success w-100  buttonToBlockUI me-1">
                                        <i class="fa-solid fa-floppy-disk icon mx-2"></i>
                                        {{ __('lang.commons.update') }}
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <a href="{{ route('admin.subscriptions.index') }}" class="btn btn-danger w-100 ">
                                        <i class="fa-solid fa-xmark icon mx-2"></i>
                                        {{ __('lang.commons.cancel') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                <h4 class="alert-heading"><i data-feather="info" class="me-50"></i>Information!</h4>
                                <div class="alert-body">
                                    <span class="text-danger">*</span> means required field. <br>
                                    <span class="text-danger">**</span> means required field and must be unique.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('vendor-js')
@endsection

@section('page-js')
@endsection

@section('custom-js')
@endsection
