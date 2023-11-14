<!DOCTYPE html>
<html lang="en" class="light-style customizer-hide" dir="ltr" data-theme="theme-default"
    data-assets-path="{{ asset('theme-assets') }}/" data-template="vertical-menu-template">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title>Login Page - {{ env('APP_NAME') }}</title>
    <meta name="description" content="Login Page - Markees" />
    <meta name="keywords" content="login, page, markees, wedding_planner, wedding">

    <link rel="icon" type="image/x-icon" href="{{ asset('theme-assets') }}/img/favicon/favicon.ico" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/fonts/fontawesome.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/fonts/tabler-icons.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/fonts/flag-icons.css" />

    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/css/rtl/core.css"
        class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/css/rtl/theme-default.css"
        class="template-customizer-theme-css" />

    <link rel="stylesheet" href="{{ asset('theme-assets') }}/css/demo.css" />

    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/node-waves/node-waves.css" />
    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/libs/typeahead-js/typeahead.css" />

    <link rel="stylesheet"
        href="{{ asset('theme-assets') }}/vendor/libs/formvalidation/dist/css/formValidation.min.css" />

    <link rel="stylesheet" href="{{ asset('theme-assets') }}/vendor/css/pages/page-auth.css">

    <script src="{{ asset('theme-assets') }}/vendor/js/helpers.js"></script>

    <script src="{{ asset('theme-assets') }}/vendor/js/template-customizer.js"></script>

    <script src="{{ asset('theme-assets') }}/js/config.js"></script>
</head>

<body>

    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner py-4">
                @yield('content')

            </div>
        </div>
    </div>

    <!-- build:js assets/vendor/js/core.js -->
    <script src="{{ asset('theme-assets') }}/vendor/libs/jquery/jquery.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/popper/popper.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/js/bootstrap.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/node-waves/node-waves.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/hammer/hammer.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/i18n/i18n.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/typeahead-js/typeahead.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/js/menu.js"></script>
    <!-- endbuild -->

    <!-- Vendors JS -->
    <script src="{{ asset('theme-assets') }}/vendor/libs/formvalidation/dist/js/FormValidation.min.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js"></script>

    <!-- Main JS -->
    <script src="{{ asset('theme-assets') }}/js/main.js"></script>

    <!-- Page JS -->
    <script src="{{ asset('theme-assets') }}/js/pages-auth.js"></script>
</body>

</html>
