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


        @if (auth('admin')->user()->can('admin.permissions.index') ||
                auth('admin')->user()->can('admin.roles.index'))
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Administration</span>
            </li>
        @endif

        {{-- Roles & Permissions --}}
        @canany(['admin.permissions.index', 'admin.roles.index'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['admin.roles.index', 'admin.permissions.index'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-lock menu-icon"></i>
                    <div>Roles & Permissions</div>
                    {{-- <div class="badge bg-label-primary rounded-pill ms-auto">3</div> --}}
                </a>
                <ul class="menu-sub">

                    @can('admin.roles.index')
                        <li class="menu-item {{ request()->routeIs('admin.roles.index') ? 'active' : null }}">
                            <a href="{{ route('admin.roles.index') }}" class="menu-link">
                                <div>Roles</div>
                            </a>
                        </li>
                    @endcan

                    @can('admin.permissions.index')
                        <li class="menu-item {{ request()->routeIs('admin.permissions.index') ? 'active' : null }}">
                            <a href="{{ route('admin.permissions.index') }}" class="menu-link">
                                <div>Permissions</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Others</span>
        </li>

        {{-- subscriptions --}}
        @canany(['admin.subscriptions.index', 'admin.subscriptions.create'])

            <li
                class="menu-item {{ in_array(request()->route()->getName(),['admin.subscriptions.index', 'admin.subscriptions.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-solid fa-bolt menu-icon"></i>
                    <div>Subscriptions</div>
                </a>
                <ul class="menu-sub">

                    @can('admin.subscriptions.index')
                        <li class="menu-item {{ request()->routeIs('admin.subscriptions.index') ? 'active' : null }}">
                            <a href="{{ route('admin.subscriptions.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('admin.subscriptions.create')
                        <li class="menu-item {{ request()->routeIs('admin.subscriptions.create') ? 'active' : null }}">
                            <a href="{{ route('admin.subscriptions.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        @canany(['admin.hall-owners.index', 'admin.hall-owners.create'])
            <li
                class="menu-item {{ in_array(request()->route()->getName(),['admin.hall-owners.index', 'admin.hall-owners.create'])? 'open active': null }}">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="fa-brands fa-mizuni menu-icon"></i>
                    <div>Hall Owners</div>
                </a>
                <ul class="menu-sub">

                    @can('admin.hall-owners.index')
                        <li class="menu-item {{ request()->routeIs('admin.hall-owners.index') ? 'active' : null }}">
                            <a href="{{ route('admin.hall-owners.index') }}" class="menu-link">
                                <div>View All</div>
                            </a>
                        </li>
                    @endcan

                    @can('admin.hall-owners.create')
                        <li class="menu-item {{ request()->routeIs('admin.hall-owners.create') ? 'active' : null }}">
                            <a href="{{ route('admin.hall-owners.create') }}" class="menu-link">
                                <div>Add New</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany
    </ul>
</aside>
