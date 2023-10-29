@extends('tenant.app.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'tenant.menus.create') }}
@endsection

@section('page-title', 'Create Menus')

@section('page-vendor')
@endsection

@section('page-css')
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/vendors/filepond/filepond.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendors/filepond/plugins/filepond.preview.min.css">
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
    <div class="content-header-left col-md-9 col-12 mb-2">
        <div class="row breadcrumbs-top">
            <div class="col-12">
                <h2 class="content-header-title float-start mb-0">Create Menus</h2>
                <div class="breadcrumb-wrapper">
                    {{ Breadcrumbs::render('tenant.menus.create') }}
                </div>
            </div>
        </div>
    </div>
@endsection

@section('content')
    <form class="form form-vertical" action="{{ route('tenant.menus.store') }}" method="POST"
        enctype="multipart/form-data">

        <div class="row">
            <div class="col-lg-9 col-md-9 col-sm-12 position-relative">

                @csrf
                {{ view('tenant.app.menus.form-fields', ['menus' => $menus, 'cuisines' => $cuisines]) }}

            </div>

            <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
                <div class="sticky-md-top top-lg-100px top-md-100px top-sm-0px" style="z-index: auto;">
                    <div class="card" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
                        <div class="card-body">
                            <div class="row g-1">
                                <div class="col-md-12">
                                    <label class="form-label fs-5" for="attachment">Menus Pictures</label>
                                    <input id="attachment" type="file"
                                        class="filepond @error('attachment') is-invalid @enderror" name="attachment[]"
                                        multiple accept="image/png, image/jpeg, image/jpg" />
                                    @error('attachment')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror

                                </div>
                            </div>
                            <hr>
                            <div class="row g-1">
                                <div class="col-md-12">
                                    <button type="submit"
                                        class="btn btn-success w-100  buttonToBlockUI me-1">
                                        <i data-feather='save'></i>
                                        Save Cuisine
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <a href="{{ route('tenant.menus.index') }}"
                                        class="btn btn-danger w-100 ">
                                        <i data-feather='x'></i>
                                        {{ __('lang.commons.cancel') }}
                                    </a>
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
    <script src="{{ global_asset('theme-assets') }}/vendors/filepond/plugins/filepond.preview.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/filepond/plugins/filepond.typevalidation.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/filepond/plugins/filepond.imagecrop.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/filepond/plugins/filepond.imagesizevalidation.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/filepond/plugins/filepond.filesizevalidation.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/filepond/filepond.min.js"></script>
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

        $('#has_sub_menu').on('change', function() {
            if ($(this).is(':checked')) {
                // $('#menu_price_and_cuisines').collapse('hide');
                $('#menu_price_and_cuisines').hide('fast', 'linear');
                $('#price').val(0);
            } else {
                // $('#menu_price_and_cuisines').collapse('show');
                $('#menu_price_and_cuisines').show('fast', 'linear');
            }
        });

        var MenuPrice = 0;

        e = $("#cuisines");
        e.wrap('<div class="position-relative"></div>');
        e.select2({
            dropdownAutoWidth: !0,
            dropdownParent: e.parent(),
            width: "100%",
            containerCssClass: "select-lg",
            tags: true,
            multiple: true,
        }).on('change', function() {
            MenuPrice = 0;
            $("#cuisines :selected").each(function(i, el) {
                MenuPrice += parseInt($(el).data('price'));
            });
            $('#price').val(MenuPrice);
        });
    </script>
@endsection
