<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('admin.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('admin.dashboard'));
});

// Roles Breadcrumbs
Breadcrumbs::for('admin.roles.index', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard');
    $trail->push('Roles', route('admin.roles.index'));
});

Breadcrumbs::for('admin.roles.create', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.roles.index');
    $trail->push('Create Role');
});

Breadcrumbs::for('admin.roles.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.roles.index');
    $trail->push('Edit Role');
});

// Permissions Breadcrumbs
Breadcrumbs::for('admin.permissions.index', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard');
    $trail->push('Permissions', route('admin.permissions.index'));
});

// Subscriptions Breadcrumbs
Breadcrumbs::for('admin.subscriptions.index', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard');
    $trail->push('Subscriptions', route('admin.subscriptions.index'));
});

Breadcrumbs::for('admin.subscriptions.create', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.subscriptions.index');
    $trail->push('Create Subscription');
});

Breadcrumbs::for('admin.subscriptions.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.subscriptions.index');
    $trail->push('Edit Subscription');
});
