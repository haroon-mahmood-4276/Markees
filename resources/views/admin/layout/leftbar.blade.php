<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo ">
        <a href="{{ route('admin.dashboard') }}" class="app-brand-link">
            <span class="app-brand-logo">

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
        <li class="menu-item {{ request()->routeIs('admin.dashboard') ? 'active' : null }}">
            <a href="{{ route('admin.dashboard') }}" class="menu-link">
                <i class="fa-solid fa-home menu-icon"></i>
                <div>Dashboard</div>
            </a>
        </li>

        @if (auth('admin')->user()->can('admin.permissions.index') || auth('admin')->user()->can('admin.roles.index'))
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Administration</span>
            </li>
        @endif

        {{-- Roles & Permissions --}}
        @canany(['permissions.index', 'roles.index'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['roles.index', 'permissions.index'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-lock menu-icon"></i>
                    <div>Roles & Permissions</div>
                    {{-- <div class="badge bg-label-primary rounded-pill ms-auto">3</div> --}}
                </a>
                <ul class="menu-sub">

                    @can('roles.index')
                        <li class="menu-item {{ request()->routeIs('admin.roles.index') ? 'active' : null }}">
                            <a href="{{ route('admin.roles.index') }}" class="menu-link">
                                <div>Roles</div>
                            </a>
                        </li>
                    @endcan

                    @can('permissions.index')
                        <li class="menu-item {{ request()->routeIs('admin.permissions.index') ? 'active' : null }}">
                            <a href="{{ route('admin.permissions.index') }}" class="menu-link">
                                <div>Permissions</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany
    </ul>
</aside>
