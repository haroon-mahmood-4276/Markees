@extends('tenant.app.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'tenant.halls.slots.create', encryptParams($hall_id)) }}
@endsection

@section('page-title', 'Create Halls Slots')

@section('page-vendor')
@endsection

@section('page-css')
    {{-- <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendors/css/clockInput/jquery.clockinput.min.css"> --}}
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendors/js/feligx/timedropper/timedropper.css">
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="content-header-left col-md-9 col-12 mb-2">
        <div class="row breadcrumbs-top">
            <div class="col-12">
                <h2 class="content-header-title float-start mb-0">Create Halls Slots</h2>
                <div class="breadcrumb-wrapper">
                    {{ Breadcrumbs::render('tenant.halls.slots.create', encryptParams($hall_id)) }}
                </div>
            </div>
        </div>
    </div>
@endsection

@section('content')
    <form class="form form-vertical" action="{{ route('tenant.halls.slots.store', ['hall_id' => encryptParams($hall_id)]) }}"
        method="POST" enctype="multipart/form-data">

        <div class="row">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">

                @csrf
                {{ view('tenant.app.halls.settings.slots.form-fields') }}

            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
                        <div class="card-body">
                            {{-- <div class="row g-1">
                                <div class="col-md-12">
                                    <label class="form-label fs-5" for="attachment">Hall Pictures</label>
                                    <input id="attachment" type="file"
                                        class="filepond @error('attachment') is-invalid @enderror" name="attachment[]"
                                        multiple accept="image/png, image/jpeg, image/jpg" />
                                    @error('attachment')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror

                                </div>
                            </div>
                            <hr> --}}
                            <div class="row g-1">
                                <div class="col-md-12">
                                    <button type="submit"
                                        class="btn btn-success w-100  buttonToBlockUI me-1">
                                        <i data-feather='save'></i>
                                        Save Slot
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <a href="{{ route('tenant.halls.slots.index', ['hall_id' => encryptParams($hall_id)]) }}"
                                        class="btn btn-danger w-100 ">
                                        <i data-feather='x'></i>
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
@endsection

@section('page-js')
    {{-- <script src="{{ global_asset('theme-assets') }}/vendors/js/clockInput/jquery.clockinput.min.js"></script> --}}
    <script src="{{ global_asset('theme-assets') }}/vendors/js/feligx/timedropper/timedropper-jquery.js"></script>
    {{-- <script src="{{ global_asset('theme-assets') }}/vendors/js/feligx/datedropper/datedropper-jquery.js"></script> --}}
@endsection

@section('custom-js')
    <script>
        $("#date_range").flatpickr({
            defaultDate: ["today", "today"],
            minDate: "today",
            altInput: !0,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            mode: "range",
        });

        // $("input[type=time]").clockInput(true);

        $('#start_time').timeDropper({
            autoswitch: true,
            meridians: true,
            mousewheel: true,
            minutesSteps: 5,
            init_animation: 'fadeIn',
            format: 'HH:mm'
        });

        $('#end_time').timeDropper({
            autoswitch: true,
            meridians: true,
            mousewheel: true,
            minutesSteps: 5,
            init_animation: 'fadeIn',
            format: 'HH:mm'
        });
    </script>
@endsection
