@extends('admin.app.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'admin.hall-owners.edit', encryptParams($hallOwner->id)) }}
@endsection

@section('page-title', 'Edit Hall Owner')

@section('page-vendor')
@endsection

@section('page-css')
    <link rel="stylesheet" type="text/css" href="{{ asset('assets') }}/vendor/libs/filepond/filepond.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets') }}/vendor/libs/filepond/plugins/filepond.preview.min.css">
@endsection

@section('custom-css')
    <style>
        .filepond--drop-label {
            color: #7367F0 !important;
        }

        .filepond--item-panel {
            background-color: #7367F0;
        }

        .filepond--panel-root {
            background-color: #e3e0fd;
        }

        /* .filepond--item {
                        width: calc(20% - 0.5em);
                    } */
    </style>
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Create Subscriptions</h2>
        {{ Breadcrumbs::render('admin.hall-owners.edit', encryptParams($hallOwner->id)) }}
    </div>
@endsection

@section('content')
    <form action="{{ route('admin.hall-owners.update', encryptParams($hallOwner->id)) }}" method="POST"
        enctype="multipart/form-data">
        @method('PUT')
        @csrf

        <div class="row g-3">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">
                {{ view('admin.app.hall-owners.form-fields', [
                    'subscriptions' => $subscriptions,
                    'domain' => $domain,
                ]) }}
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="d-block">
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

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="d-block">
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
                                        Update Hall Owners
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
    <script src="{{ asset('assets') }}/vendor/libs/filepond/plugins/filepond.preview.min.js"></script>
    <script src="{{ asset('assets') }}/vendor/libs/filepond/plugins/filepond.typevalidation.min.js"></script>
    <script src="{{ asset('assets') }}/vendor/libs/filepond/plugins/filepond.imagecrop.min.js"></script>
    <script src="{{ asset('assets') }}/vendor/libs/filepond/plugins/filepond.imagesizevalidation.min.js"></script>
    <script src="{{ asset('assets') }}/vendor/libs/filepond/plugins/filepond.filesizevalidation.min.js"></script>
    <script src="{{ asset('assets') }}/vendor/libs/filepond/filepond.min.js"></script>
    {{-- <script src="{{ asset('assets') }}/vendor/libs/cleavejs/cleave.min.js"></script>
    <script src="{{ asset('assets') }}/vendor/libs/cleavejs/addons/cleave-phone.pk.min.js"></script> --}}
@endsection

@section('page-js')
@endsection

@section('custom-js')
    <script>
        FilePond.registerPlugin(
            FilePondPluginImagePreview,
            FilePondPluginFileValidateType,
            FilePondPluginFileValidateSize,
            FilePondPluginImageValidateSize,
            FilePondPluginImageCrop,
        );

        var files = [];

        @forelse($owner_cnic_attachments as $image)
            files.push({
                source: '{{ $image->getUrl() }}',
            });
        @empty
        @endforelse

        FilePond.create(document.getElementById('owner_cnic_attachments'), {
            files: files,
            styleButtonRemoveItemPosition: 'right',
            imageCropAspectRatio: '1:1',
            acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            maxFileSize: '536KB',
            ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
            storeAsFile: true,
            allowMultiple: true,
            maxFiles: 2,
            checkValidity: true,
            credits: {
                label: '',
                url: ''
            }
        });

        files = [];
        @if (is_null(!$owner_ntn_attachment))
            files.push({
                source: '{{ $owner_ntn_attachment->getUrl() }}',
            });
        @endif

        FilePond.create(document.getElementById('owner_ntn_attachment'), {
            files: files,
            styleButtonRemoveItemPosition: 'right',
            imageCropAspectRatio: '1:1',
            acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            maxFileSize: '536KB',
            ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
            storeAsFile: true,
            // allowMultiple: true,
            maxFiles: 1,
            checkValidity: true,
            credits: {
                label: '',
                url: ''
            }
        });

        // let phone = $("#phone");
        // phone.length && new Cleave(phone, {
        //     prefix: "+92",
        //     blocks: [3, 3, 3, 4],
        //     numericOnly: !0,
        // });

        // let phone = $("#phone");
        // phone.length && new Cleave(phone, {
        //     phone: !0,
        //     phoneRegionCode: "PK"
        // });

        // let cnic = $("#cnic");
        // cnic.length && new Cleave(cnic, {
        //     delimiter: '-',
        //     numericOnly: !0,
        //     blocks: [5, 7, 1],
        // });
    </script>

    <script type="text/javascript">
        $(document).ready(function() {
            e = $("#subscription");
            e.wrap('<div class="position-relative"></div>');
            e.select2({
                dropdownAutoWidth: !0,
                dropdownParent: e.parent(),
                width: "100%",
                containerCssClass: "select-lg",
                templateResult: c,
                templateSelection: c,
                escapeMarkup: function(e) {
                    return e
                }
            });
        });

        function c(e) {
            return e.id ? "<i class='" + $(e.element).data("icon") + " me-2'></i>" + e.text : e.text
        }
    </script>
@endsection
