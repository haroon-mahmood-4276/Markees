<!DOCTYPE html>

<html class="light-style layout-navbar-fixed layout-menu-fixed" lang="{{ LaravelLocalization::getCurrentLocale() }}"
    dir="{{ LaravelLocalization::getCurrentLocaleDirection() }}" data-theme="theme-default"
    data-assets-path="{{ global_asset('theme-assets') }}/" data-template="vertical-menu-template">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>@yield('page-title') - {{ env('APP_NAME') }}</title>

    <meta name="description" content="Start your development with a Dashboard for Bootstrap 5" />
    <meta name="keywords" content="dashboard, bootstrap 5 dashboard, bootstrap 5 design, bootstrap 5">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    @yield('seo-breadcrumb')

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ global_asset('theme-assets') }}/img/favicon/favicon.ico" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500&display=swap"
        rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/fonts/fontawesome.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/fonts/tabler-icons.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/fonts/flag-icons.css" />

    <!-- Core CSS -->
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/css/rtl/core.min.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/css/rtl/theme-default.css"
    class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/css/demo.css" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/node-waves/node-waves.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/typeahead-js/typeahead.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/animate-css/animate.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/sweetalert2/sweetalert2.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/select2/select2.css" />
    <link rel="stylesheet" href="{{ global_asset('theme-assets') }}/vendor/libs/flatpickr/flatpickr.css" />
    @yield('page-vendor')

    <script src="{{ global_asset('theme-assets') }}/vendor/js/helpers.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/js/template-customizer.min.js"></script>
    <script src="{{ global_asset('theme-assets') }}/js/config.js"></script>
    @yield('page-css')

    @yield('custom-css')
</head>

<body style="overflow-y: scroll">
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar  ">
        <div class="layout-container">

            <!-- Menu -->
            {{ view('tenant.app.layout.leftbar') }}
            <!-- End Menu -->

            <!-- Layout container -->
            <div class="layout-page">

                <!-- TopBar -->
                {{ view('tenant.app.layout.topbar') }}
                <!-- End TopBar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->
                    <div class="container-xxl flex-grow-1 container-p-y">
                        {{ view('tenant.app.layout.alerts') }}

                        @yield('breadcrumbs')

                        @yield('content')
                    </div>
                    <!-- End Content -->

                    <!-- Footer -->
                    {{ view('tenant.app.layout.footer') }}
                    <!-- End Footer -->

                    <div class="content-backdrop fade"></div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- End Layout page -->
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>

        <!-- Drag Target Area To SlideIn Menu On Small Screens -->
        <div class="drag-target"></div>

    </div>
    <!-- End Layout wrapper -->

    <script src="{{ global_asset('theme-assets') }}/vendor/libs/jquery/jquery.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/popper/popper.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/js/bootstrap.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/block-ui/block-ui.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/node-waves/node-waves.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/hammer/hammer.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/typeahead-js/typeahead.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/js/menu.js"></script>

    <!-- Vendors JS -->
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/sweetalert2/sweetalert2.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/select2/select2.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/moment/moment.js"></script>
    <script src="{{ global_asset('theme-assets') }}/vendor/libs/flatpickr/flatpickr.js"></script>
    @yield('vendor-js')

    <!-- Main JS -->
    <script src="{{ global_asset('theme-assets') }}/js/main.js"></script>

    <!-- Page JS -->
    @yield('page-js')

    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        // const Toast = Swal.mixin({
        //     toast: true,
        //     position: 'top-end',
        //     showConfirmButton: false,
        //     timer: 3000,
        //     timerProgressBar: true,
        //     didOpen: (toast) => {
        //         toast.addEventListener('mouseenter', Swal.stopTimer)
        //         toast.addEventListener('mouseleave', Swal.resumeTimer)
        //     }
        // });

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
    </script>

    @yield('custom-js')
</body>

</html>