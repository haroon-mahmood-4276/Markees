@php
    $user = auth('tenant')->user();
@endphp
<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo ">
        <a href="index.html" class="app-brand-link">
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
        <li class="menu-item {{ request()->routeIs('tenant.dashboard') ? 'active' : null }}">
            <a href="{{ route('tenant.dashboard') }}" class="menu-link">
                <i class="fa-solid fa-home menu-icon"></i>
                <div>{{ __('lang.leftbar.dashboard') }}</div>
            </a>
        </li>

        @if ($user->canAny(['tenant.permissions.index', 'tenant.roles.index']))
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">{{ __('lang.leftbar.administration') }}</span>
            </li>
        @endif

        {{-- Roles & Permissions --}}
        @if ($user->canAny(['tenant.permissions.index', 'tenant.roles.index']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.roles.index', 'tenant.permissions.index'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-lock menu-icon"></i>
                    <div>{{ __('lang.leftbar.roles_and_permissions') }}</div>
                    {{-- <div class="badge bg-label-primary rounded-pill ms-auto">3</div> --}}
                </a>
                <ul class="menu-sub">

                    @can('tenant.roles.index')
                        <li class="menu-item {{ request()->routeIs('tenant.roles.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.roles.index') }}" class="menu-link">
                                <div>{{ __('lang.leftbar.roles') }}</div>
                            </a>
                        </li>
                    @endcan

                    @can('tenant.permissions.index')
                        <li class="menu-item {{ request()->routeIs('tenant.permissions.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.permissions.index') }}" class="menu-link">
                                <div>{{ __('lang.leftbar.permissions') }}</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endif

        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Others</span>
        </li>

        {{-- Hall types Menu --}}
        @if ($user->canAny(['tenant.hallTypes.index', 'tenant.hallTypes.create']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.hallTypes.index', 'tenant.hallTypes.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Hall Types</div>
                </a>
                <ul class="menu-sub">

                    @if ($user->can('tenant.hallTypes.index'))
                        <li class="menu-item {{ request()->routeIs('tenant.hallTypes.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.hallTypes.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endif

                    @if ($user->can('tenant.hallTypes.create'))
                        <li class="menu-item {{ request()->routeIs('tenant.hallTypes.create') ? 'active' : null }}">
                            <a href="{{ route('tenant.hallTypes.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endif
                </ul>
            </li>
        @endif

        {{-- Decorations Menu --}}
        @if ($user->canAny(['tenant.decorations.index', 'tenant.decorations.create']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.decorations.index', 'tenant.decorations.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Decorations</div>
                </a>
                <ul class="menu-sub">

                    @if ($user->can('tenant.decorations.index'))
                        <li class="menu-item {{ request()->routeIs('tenant.decorations.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.decorations.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endif

                    @if ($user->can('tenant.decorations.create'))
                        <li class="menu-item {{ request()->routeIs('tenant.decorations.create') ? 'active' : null }}">
                            <a href="{{ route('tenant.decorations.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endif
                </ul>
            </li>
        @endif

        {{-- Cuisines Menu --}}
        @if ($user->canAny(['tenant.cuisines.index', 'tenant.cuisines.create']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.cuisines.index', 'tenant.cuisines.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Cuisines</div>
                </a>
                <ul class="menu-sub">

                    @if ($user->can('tenant.cuisines.index'))
                        <li class="menu-item {{ request()->routeIs('tenant.cuisines.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.cuisines.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endif

                    @if ($user->can('tenant.cuisines.create'))
                        <li class="menu-item {{ request()->routeIs('tenant.cuisines.create') ? 'active' : null }}">
                            <a href="{{ route('tenant.cuisines.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endif
                </ul>
            </li>
        @endif

        {{-- Menus Menu --}}
        @if ($user->canAny(['tenant.menus.index', 'tenant.menus.create']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.menus.index', 'tenant.menus.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Menus</div>
                </a>
                <ul class="menu-sub">

                    @if ($user->can('tenant.menus.index'))
                        <li class="menu-item {{ request()->routeIs('tenant.menus.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.menus.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endif

                    @if ($user->can('tenant.menus.create'))
                        <li class="menu-item {{ request()->routeIs('tenant.menus.create') ? 'active' : null }}">
                            <a href="{{ route('tenant.menus.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endif
                </ul>
            </li>
        @endif

        {{-- Packages Menu --}}
        {{-- @if ($user->canAny(['tenant.packages.index', 'tenant.packages.create']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.packages.index', 'tenant.packages.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Packages</div>
                </a>
                <ul class="menu-sub">

                    @if ($user->can('tenant.packages.index'))
                        <li class="menu-item {{ request()->routeIs('tenant.packages.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.packages.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endif

                    @if ($user->can('tenant.packages.create'))
                        <li class="menu-item {{ request()->routeIs('tenant.packages.create') ? 'active' : null }}">
                            <a href="{{ route('tenant.packages.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endif
                </ul>
            </li>
        @endif --}}

        {{-- Halls Menu --}}
        @if ($user->canAny(['tenant.halls.index', 'tenant.halls.create']))
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['tenant.halls.index', 'tenant.halls.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Halls</div>
                </a>
                <ul class="menu-sub">

                    @if ($user->can('tenant.halls.index'))
                        <li class="menu-item {{ request()->routeIs('tenant.halls.index') ? 'active' : null }}">
                            <a href="{{ route('tenant.halls.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endif

                    @if ($user->can('tenant.halls.create'))
                        <li class="menu-item {{ request()->routeIs('tenant.halls.create') ? 'active' : null }}">
                            <a href="{{ route('tenant.menus.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endif
                </ul>
            </li>
        @endif
    </ul>
</aside>
