@extends('tenant.app.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'tenant.halls.slots.edit', $hall->id) }}
@endsection

@section('page-title', 'Edit Halls Slots')

@section('page-vendor')
@endsection

@section('page-css')
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/feligx/timedropper/timedropper.css">
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Edit Halls Slots</h2>
        {{ Breadcrumbs::render('tenant.halls.slots.edit', $hall->id) }}
    </div>
@endsection

@section('content')
    <form class="form form-vertical" action="{{ route('tenant.halls.slots.update', [$hall, $slot]) }}" method="POST"
        enctype="multipart/form-data">

        <div class="row g-3">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">

                @csrf
                @method('PUT')
                @include('tenant.app.halls.settings.slots.form-fields')

            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-success w-100  buttonToBlockUI me-1">
                                        <i class="fa-solid fa-floppy-disk icon mx-2"></i>
                                        Update slots
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <a href="{{ route('tenant.halls.slots.index', [$hall]) }}"
                                        class="btn btn-danger w-100 ">
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
                                    <ol>
                                        <li>
                                            <span class="text-danger">*</span> means required field.
                                        </li>
                                        <li>
                                            If slot start time is greater than end time, then it will be considered as
                                            <strong>NEXT DAY</strong> slot.
                                        </li>
                                    </ol>
                                </div>
                                {{-- <button type="button" class="btn-close" data-bs-dismiss="alert"
                        aria-label="Close"></button> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('vendor-js')
    <script src="{{ asset('theme-assets') }}/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/feligx/timedropper/timedropper-jquery.js"></script>
@endsection

@section('page-js')
@endsection

@section('custom-js')
    @include('tenant.app.halls.settings.slots.form-fields-js', ['from' => 'edit'])
@endsection
