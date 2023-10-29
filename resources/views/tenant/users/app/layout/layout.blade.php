<!doctype html>
<html lang="en">

<head>
    <title>@yield('page-title') - {{ env('APP_NAME') }}</title>
    <link rel="apple-touch-icon" href="{{ global_asset('theme-assets') }}/images/ico/apple-icon-120.html">
    <link rel="shortcut icon" type="image/x-icon" href="{{ global_asset('theme-assets') }}/images/ico/favicon.ico">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500&display=swap"
        rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/vendors/css/vendors.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendors/css/forms/select/select2.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendors/css/extensions/toastr.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/vendors/css/animate/animate.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendors/css/extensions/sweetalert2.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendors/css/pickers/flatpickr/flatpickr.min.css">
    @yield('page-vendor')

    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/bootstrap-extended.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/colors.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/components.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/themes/dark-layout.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/themes/bordered-layout.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/themes/semi-dark-layout.min.css">

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/css/core/menu/menu-types/vertical-menu.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/css/plugins/extensions/ext-component-sweet-alerts.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/css/plugins/extensions/ext-component-toastr.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/css/plugins/forms/pickers/form-flat-pickr.min.css">
    @yield('page-css')
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css"
        href="{{ global_asset('theme-assets') }}/vendors/css/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/extras/cup.min.css">
    <link rel="stylesheet" type="text/css" href="{{ global_asset('theme-assets') }}/css/app.min.css">
    <!-- END: Custom CSS-->

    <style>
        .select2-container--default .select2-results>.select2-results__options {
            max-height: 250px !important;
        }

        .form-text {
            color: gray;
        }

        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }

        .no-scrollbar {
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;
            /* Firefox */
        }
    </style>

    <script src="{{ global_asset('theme-assets') }}/vendors/js/vendors.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/js/pickers/flatpickr/flatpickr.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/js/extensions/sweetalert2.all.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/js/forms/select/select2.full.min.js"></script>
    @yield('page-css')
</head>

<body class="bg-white">

    @include('tenant.users.app.layout.header')

    <div class="">
        @yield('content')
    </div>

    @include('tenant.users.app.layout.footer')
    <!-- BEGIN: Page Vendor JS-->
    {{-- <script src="{{ global_asset('theme-assets') }}/js/scripts/components/components-tooltips.min.js"></script> --}}
    <script src="{{ global_asset('theme-assets') }}/vendors/js/extensions/toastr.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendors/js/extensions/polyfill.min.js"></script>

    @yield('vendor-js')

    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="{{ global_asset('theme-assets') }}/js/core/app-menu.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/js/core/app.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/js/scripts/customizer.min.js"></script>
    <!-- END: Theme JS-->
    <!-- BEGIN: Page JS-->
    @yield('page-js')
    <!-- END: Page JS-->

    <script>
        $(window).on('load', function() {
            if (feather) {
                feather.replace({
                    width: 14,
                    height: 14
                });
            }

            // toggleAccordian();
        });

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        function showBlockUI(element = null) {
            blockUIOptions = {
                message: '<div class="spinner-grow text-primary" role="status"></div>',
                css: {
                    backgroundColor: 'transparent',
                    border: '0'
                },
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8
                }
            };
            if (element) {
                $(element).block(blockUIOptions);
            } else {
                $.blockUI(blockUIOptions);
            }
        }

        function hideBlockUI(element = null) {
            if (element) {
                $(element).unblock();
            } else {
                $.unblockUI();
            }
        }

        function changeTableRowColor(element) {
            if ($(element).is(':checked'))
                $(element).closest('tr').addClass('table-danger');
            else {
                $(element).closest('tr').removeClass('table-danger');
            }
        }

        function changeAllTableRowColor() {
            $('.dt-checkboxes').trigger('change');
        }

        function convertToSlug(element) {
            element.value = element.value.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
        }
    </script>

    @yield('page-scripts')
</body>

</html>
