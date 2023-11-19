 <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo ">
        <a href="{{ route('hall_owner.dashboard') }}" class="app-brand-link">
            <span class="app-brand-logo demo">
                <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                        fill="#7367F0" />
                    <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616" />
                    <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                        fill="#7367F0" />
                </svg>
            </span>
            <span class="app-brand-text demo menu-text fw-bold text-primary">{{ env('APP_NAME') }}</span>
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
            {{-- <i class="ti ti-chevrons-left  d-none d-xl-block ti-sm align-middle"></i> --}}
            <i class="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle"></i>
            <i class="ti ti-chevrons-right d-block d-xl-none ti-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
        <!-- Dashboards -->
        <li class="menu-item {{ request()->routeIs('hall_owner.dashboard') ? 'active' : null }}">
            <a href="{{ route('hall_owner.dashboard') }}" class="menu-link">
                <i class="fa-solid fa-home menu-icon"></i>
                <div>{{ __('lang.leftbar.dashboard') }}</div>
            </a>
        </li>

        @canany(['hall_owner.permissions.index', 'hall_owner.roles.index'])
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">{{ __('lang.leftbar.administration') }}</span>
            </li>
        @endcanany

        {{-- Roles & Permissions --}}
        @canany(['hall_owner.permissions.index', 'hall_owner.roles.index'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['hall_owner.roles.index', 'hall_owner.permissions.index'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-lock menu-icon"></i>
                    <div>{{ __('lang.leftbar.roles_and_permissions') }}</div>
                    {{-- <div class="badge bg-label-primary rounded-pill ms-auto">3</div> --}}
                </a>
                <ul class="menu-sub">

                    @can('hall_owner.roles.index')
                        <li class="menu-item {{ request()->routeIs('hall_owner.roles.index') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.roles.index') }}" class="menu-link">
                                <div>{{ __('lang.leftbar.roles') }}</div>
                            </a>
                        </li>
                    @endcan

                    @can('hall_owner.permissions.index')
                        <li class="menu-item {{ request()->routeIs('hall_owner.permissions.index') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.permissions.index') }}" class="menu-link">
                                <div>{{ __('lang.leftbar.permissions') }}</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Halls</span>
        </li>

        @php
            $path = Request::segment(3);
        @endphp

        {{-- Halls Menu --}}
        @canany(['hall_owner.halls.index', 'hall_owner.halls.create'])
            <li
                class="menu-item {{ $path == 'settings' ||in_array(request()->route()->getName(),['hall_owner.halls.index', 'hall_owner.halls.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-hotel menu-icon"></i>
                    <div>Halls</div>
                </a>
                <ul class="menu-sub">

                    @can('hall_owner.halls.index')
                        <li
                            class="menu-item {{ request()->routeIs('hall_owner.halls.index') || $path == 'settings' ? 'active' : null }}">
                            <a href="{{ route('hall_owner.halls.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('hall_owner.halls.create')
                        <li class="menu-item {{ request()->routeIs('hall_owner.halls.create') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.halls.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        {{-- Hall types Menu --}}
        @canany(['admin.hall-types.index', 'admin.hall-types.create'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['admin.hall-types.index', 'admin.hall-types.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-hotel menu-icon"></i>
                    <div>Hall Types</div>
                </a>
                <ul class="menu-sub">

                    @can('admin.hall-types.index')
                        <li class="menu-item {{ request()->routeIs('admin.hall-types.index') ? 'active' : null }}">
                            <a href="{{ route('admin.hall-types.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('admin.hall-types.create')
                        <li class="menu-item {{ request()->routeIs('admin.hall-types.create') ? 'active' : null }}">
                            <a href="{{ route('admin.hall-types.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Catering</span>
        </li>

        {{-- Cuisines Menu --}}
        @canany(['hall_owner.cuisines.index', 'hall_owner.cuisines.create'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['hall_owner.cuisines.index', 'hall_owner.cuisines.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-plate-wheat menu-icon"></i>
                    <div>Cuisines</div>
                </a>
                <ul class="menu-sub">

                    @can('hall_owner.cuisines.index')
                        <li class="menu-item {{ request()->routeIs('hall_owner.cuisines.index') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.cuisines.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('hall_owner.cuisines.create')
                        <li class="menu-item {{ request()->routeIs('hall_owner.cuisines.create') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.cuisines.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        {{-- Menus Menu --}}
        @canany(['hall_owner.menus.index', 'hall_owner.menus.create'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['hall_owner.menus.index', 'hall_owner.menus.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-list-check menu-icon"></i>
                    <div>Menus</div>
                </a>
                <ul class="menu-sub">

                    @can('hall_owner.menus.index')
                        <li class="menu-item {{ request()->routeIs('hall_owner.menus.index') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.menus.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('hall_owner.menus.create')
                        <li class="menu-item {{ request()->routeIs('hall_owner.menus.create') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.menus.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Others</span>
        </li>

        {{-- Decorations Menu --}}
        @canany(['hall_owner.decorations.index', 'hall_owner.decorations.create'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['hall_owner.decorations.index', 'hall_owner.decorations.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-holly-berry menu-icon"></i>
                    <div>Decorations</div>
                </a>
                <ul class="menu-sub">

                    @can('hall_owner.decorations.index')
                        <li class="menu-item {{ request()->routeIs('hall_owner.decorations.index') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.decorations.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('hall_owner.decorations.create')
                        <li class="menu-item {{ request()->routeIs('hall_owner.decorations.create') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.decorations.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        {{-- Packages Menu --}}
        @canany(['hall_owner.packages.index', 'hall_owner.packages.create'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['hall_owner.packages.index', 'hall_owner.packages.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-cubes menu-icon"></i>
                    <div>Packages</div>
                </a>
                <ul class="menu-sub">

                    @can('hall_owner.packages.index')
                        <li class="menu-item {{ request()->routeIs('hall_owner.packages.index') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.packages.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('hall_owner.packages.create')
                        <li class="menu-item {{ request()->routeIs('hall_owner.packages.create') ? 'active' : null }}">
                            <a href="{{ route('hall_owner.packages.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany
    </ul>
</aside>
