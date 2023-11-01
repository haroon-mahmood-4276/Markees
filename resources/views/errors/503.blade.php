@extends('errors::layout')

@section('page-title', __('Not Found'))

@section('content')
    <div class="container-xxl">
        <div class="misc-wrapper">
            <h2 class="mb-1 mx-2">Under Maintenance!</h2>
            <p class="mb-4 mx-2">
                Sorry for the inconvenience but we're performing some maintenance at the moment
            </p>
            <a href="{{ redirect()->back() }}" class="btn btn-primary mb-4">Back to dashboard</a>
            <div class="mt-4">
                <img src="{{ global_asset('theme-assets') }}/img/illustrations/page-misc-under-maintenance.png"
                    alt="page-misc-under-maintenance" width="550" class="img-fluid">
            </div>
        </div>
    </div>
    <div class="container-fluid misc-bg-wrapper misc-under-maintenance-bg-wrapper">
        <img src="{{ global_asset('theme-assets') }}/img/illustrations/bg-shape-image-light.png" alt="page-misc-under-maintenance"
            data-app-light-img="illustrations/bg-shape-image-light.png"
            data-app-dark-img="illustrations/bg-shape-image-dark.html">
    </div>
@endsection
