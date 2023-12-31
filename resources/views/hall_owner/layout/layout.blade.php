<!DOCTYPE html>

<html class="light-style layout-navbar-fixed layout-menu-fixed" lang="en" dir="ltr" data-theme="theme-default"
    data-assets-path="{{ asset('theme-assets') }}/" data-template="vertical-menu-template">

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
    <link rel="icon" type="image/x-icon" href="{{ asset('theme-assets') }}/img/favicon/favicon.ico" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500&display=swap"
        rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/fonts/fontawesome.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/fonts/tabler-icons.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/fonts/flag-icons.css" />

    <!-- Core CSS -->
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/css/rtl/core.min.css"
        class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/css/rtl/theme-default.css"
        class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/css/demo.min.css" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/node-waves/node-waves.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/typeahead-js/typeahead.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/animate-css/animate.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/sweetalert2/sweetalert2.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/select2/select2.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/toastr/toastr.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/flatpickr/flatpickr.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/load-awesome/fire.min.css">
    @yield('page-vendor')

    <script src="{{ asset('theme-assets') }}/vendor/js/helpers.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/js/template-customizer.min.js"></script>
    <script src="{{ asset('theme-assets') }}/js/config.js"></script>
    @yield('page-css')
    <style>
        .dataTables_scroll {
            border: 1px solid #eee;
            border-radius: 10px;
            overflow: hidden;
        }

        :root {
            /* --dd-radius: 6px !important; */
            --dd-shadow: 0 0 2.5em rgba(0, 0, 0, 0.1) !important;
            --dd-overlay: rgba(0, 0, 0, .75) !important;
            --dd-background: #FFFFFF !important;
            --dd-text1: #333333 !important;
            --dd-text2: #FFFFFF !important;
            --dd-primary: #7367f0 !important;
            --dd-gradient: linear-gradient(45deg, #e61e68 0%, #FD4741 100%) !important;
            --dd-range: rgba(0, 0, 0, 0.05) !important;
            --dd-monthBackground: #7367f0 !important;
            --dd-monthText: var(--dd-text2) !important;
            --dd-monthBorder: transparent !important;
            --dd-confirmButtonBackground: #7367f0 !important;
            --dd-confirmButtonText: var(--dd-text2) !important;
            --dd-selectedBackground: #7367f0 !important;
            --dd-selectedText: var(--dd-text2) !important;
        }
    </style>

    @yield('custom-css')
</head>

<body style="overflow-y: scroll">
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar  ">
        <div class="layout-container">

            <!-- Menu -->
            @include('hall_owner.layout.leftbar')
            <!-- End Menu -->

            <!-- Layout container -->
            <div class="layout-page">

                <!-- TopBar -->
                @include('hall_owner.layout.topbar')
                <!-- End TopBar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->
                    <div class="container-xxl flex-grow-1 container-p-y">
                        @include('hall_owner.layout.alerts')

                        @yield('breadcrumbs')

                        @yield('content')
                    </div>
                    <!-- End Content -->

                    <!-- Footer -->
                    @include('hall_owner.layout.footer')
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

    <script src="{{ asset('theme-assets') }}/vendor/libs/jquery/jquery.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/popper/popper.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/js/bootstrap.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/block-ui/block-ui.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/node-waves/node-waves.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/hammer/hammer.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/typeahead-js/typeahead.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/js/menu.js"></script>

    <script src="{{ asset('theme-assets') }}/js/main.js"></script>

    <!-- Vendors JS -->
    <script src="{{ asset('theme-assets') }}/vendor/libs/sweetalert2/sweetalert2.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/select2/select2.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/toastr/toastr.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/moment/moment.min.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/moment/moment-timezone.min.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/flatpickr/flatpickr.js"></script>
    @yield('vendor-js')

    <!-- Main JS -->

    <!-- Page JS -->
    @yield('page-js')

    <script>
        moment.tz.setDefault("{{ Config::get('app.timezone') }}");
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
                message: `
            <div class="d-flex justify-content-center flex-column align-items-center">
                <div class="la-fire la-3x text-primary">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p class="mt-2 text-primary">Please wait...</p>
            </div>`,
                css: {
                    backgroundColor: 'transparent',
                    border: '0'
                },
                overlayCSS: {
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
