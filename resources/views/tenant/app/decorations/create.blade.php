@extends('tenant.app.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'tenant.decorations.create') }}
@endsection

@section('page-title', 'Create Decoration')

@section('page-vendor')
@endsection

@section('page-css')
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/vendor/libs/filepond/filepond.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.preview.min.css">
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
        <h2 class="content-header-title float-start mb-0 mx-3">Create Decoration</h2>
        {{ Breadcrumbs::render('tenant.decorations.create') }}
    </div>
@endsection

@section('content')
    <form class="form form-vertical" action="{{ route('tenant.decorations.store') }}" method="POST"
        enctype="multipart/form-data">

        <div class="row g-3">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">

                @csrf
                {{ view('tenant.app.decorations.form-fields') }}

            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row g-1">
                                <div class="col-md-12">
                                    <label class="form-label" style="font-size: 15px" for="attachment">Decoration
                                        Pictures</label>
                                    <input id="attachment" type="file"
                                        class="filepond @error('attachment') is-invalid @enderror" name="attachment[]"
                                        multiple accept="image/png, image/jpeg, image/jpg" />
                                    @error('attachment')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror

                                </div>
                            </div>
                            <hr>
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-success w-100  buttonToBlockUI me-1">
                                        <i class="fa-solid fa-floppy-disk icon mx-2"></i>
                                        Save Decoration
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <a href="{{ route('tenant.decorations.index') }}" class="btn btn-danger w-100 ">
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
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.preview.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.typevalidation.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.imagecrop.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.imagesizevalidation.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.filesizevalidation.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/filepond/filepond.min.js"></script>
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

        FilePond.create(document.getElementById('attachment'), {
            styleButtonRemoveItemPosition: 'right',
            imageCropAspectRatio: '1:1',
            acceptedFileTypes: ['image/png', 'image/jpeg'],
            maxFileSize: '1536KB',
            ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
            storeAsFile: true,
            allowMultiple: true,
            maxFiles: 3,
            checkValidity: true,
            credits: {
                label: '',
                url: ''
            }
        });

        $(document).ready(function() {
            e = $("#hallType");
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
