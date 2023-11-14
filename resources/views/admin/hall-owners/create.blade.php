@extends('admin.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'admin.hall-owners.create') }}
@endsection

@section('page-title', 'Create Owner')

@section('page-vendor')
@endsection

@section('page-css')
    @include('admin.layout.libs.filepond.css')
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Create Owner</h2>
        {{ Breadcrumbs::render('admin.hall-owners.create') }}
    </div>
@endsection

@section('content')
    <form class="form form-vertical" action="{{ route('admin.hall-owners.store') }}" method="POST"
        enctype="multipart/form-data">

        <div class="row g-3">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">
                @csrf
                @include('admin.hall-owners.form-fields')
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <div class="d-block mb-1">
                                        <label class="form-label" style="font-size: 15px" for="owner_cnic_attachments">CNIC
                                            Front & Back
                                            Attachments</label>
                                        <input id="owner_cnic_attachments" type="file"
                                            class="filepond @error('owner_cnic_attachments') is-invalid @enderror"
                                            name="owner_cnic_attachments[]" multiple
                                            accept="image/png, image/jpeg, image/gif" />
                                        @error('owner_cnic_attachments')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                </div>
                            </div>

                            <hr>

                            <div class="row g-3">
                                <div class="col-md-12">
                                    <div class="d-block mb-1">
                                        <label class="form-label" style="font-size: 15px" for="owner_ntn_attachment">NTN
                                            Attachment</label>
                                        <input id="owner_ntn_attachment" type="file"
                                            class="filepond @error('owner_ntn_attachment') is-invalid @enderror"
                                            name="owner_ntn_attachment" multiple
                                            accept="image/png, image/jpeg, image/gif" />
                                        @error('owner_ntn_attachment')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="row g-3">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-success w-100  buttonToBlockUI me-1">
                                        <i class="fa-solid fa-floppy-disk icon mx-2"></i>
                                        {{ __('lang.commons.save') }}
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <a href="{{ route('admin.hall-owners.index') }}" class="btn btn-danger w-100 ">
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
    @include('admin.layout.libs.filepond.js')
@endsection

@section('page-js')
@endsection

@section('custom-js')
    @include('admin.hall-owners.form-fields-js', ['from' => 'create'])
@endsection
