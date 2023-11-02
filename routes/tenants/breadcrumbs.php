<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('tenant.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('tenant.dashboard'));
});

// Roles Breadcrumbs
Breadcrumbs::for('tenant.roles.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push(__('lang.roles.role_plural'), route('tenant.roles.index'));
});

Breadcrumbs::for('tenant.roles.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.roles.index');
    $trail->push(__('lang.roles.pages.create.create_role'), route('tenant.roles.create'));
});

Breadcrumbs::for('tenant.roles.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.roles.index');
    $trail->push(__('lang.commons.edit') . ' ' . __('lang.roles.role_singular'));
});

// Permisisons Breadcrumbs
Breadcrumbs::for('tenant.permissions.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push(__('lang.permissions.permission_plural'), route('tenant.permissions.index'));
});

Breadcrumbs::for('tenant.permissions.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.permissions.index');
    $trail->push(__('lang.permissions.create_permission'), route('tenant.permissions.create'));
});

Breadcrumbs::for('tenant.permissions.edit', function (BreadcrumbTrail $trail, $permission_id) {
    $trail->parent('tenant.permissions.index');
    $trail->push(__('lang.permissions.edit_permission'),  route('tenant.permissions.edit', ['id' => $permission_id]));
});

// HallTypes Breadcrumbs
Breadcrumbs::for('tenant.hallTypes.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Hall Types', route('tenant.hallTypes.index'));
});

Breadcrumbs::for('tenant.hallTypes.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.hallTypes.index');
    $trail->push('Create Hall Type', route('tenant.hallTypes.create'));
});

Breadcrumbs::for('tenant.hallTypes.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.hallTypes.index');
    $trail->push('Edit Hall Type');
});

// Decorations Breadcrumbs
Breadcrumbs::for('tenant.decorations.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Decorations', route('tenant.decorations.index'));
});

Breadcrumbs::for('tenant.decorations.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.decorations.index');
    $trail->push('Create Decoration', route('tenant.decorations.create'));
});

Breadcrumbs::for('tenant.decorations.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.decorations.index');
    $trail->push('Edit Decoration');
});

// Cuisine Breadcrumbs
Breadcrumbs::for('tenant.cuisines.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Cuisines', route('tenant.cuisines.index'));
});

Breadcrumbs::for('tenant.cuisines.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.cuisines.index');
    $trail->push('Create Cuisine', route('tenant.cuisines.create'));
});

Breadcrumbs::for('tenant.cuisines.edit', function (BreadcrumbTrail $trail, $id) {
    $trail->parent('tenant.cuisines.index');
    $trail->push('Edit Cuisine', route('tenant.cuisines.edit', ['id' => $id]));
});

// Menus Breadcrumbs
Breadcrumbs::for('tenant.menus.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Menus', route('tenant.menus.index'));
});

Breadcrumbs::for('tenant.menus.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.menus.index');
    $trail->push('Create Menu', route('tenant.menus.create'));
});

Breadcrumbs::for('tenant.menus.edit', function (BreadcrumbTrail $trail, $id) {
    $trail->parent('tenant.menus.index');
    $trail->push('Edit Menu', route('tenant.menus.edit', ['id' => $id]));
});

// Packages Breadcrumbs
Breadcrumbs::for('tenant.packages.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Packages', route('tenant.packages.index'));
});

Breadcrumbs::for('tenant.packages.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Create Packages', route('tenant.packages.create'));
});

Breadcrumbs::for('tenant.packages.edit', function (BreadcrumbTrail $trail, $id) {
    $trail->parent('tenant.packages.index');
    $trail->push('Edit Packages', route('tenant.packages.edit', ['id' => $id]));
});

// Halls Breadcrumbs
Breadcrumbs::for('tenant.halls.index', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Halls', route('tenant.halls.index'));
});

Breadcrumbs::for('tenant.halls.create', function (BreadcrumbTrail $trail) {
    $trail->parent('tenant.dashboard');
    $trail->push('Create hall', route('tenant.halls.create'));
});

Breadcrumbs::for('tenant.halls.edit', function (BreadcrumbTrail $trail, $id) {
    $trail->parent('tenant.halls.index');
    $trail->push('Edit hall', route('tenant.halls.edit', ['id' => $id]));
});

// Halls slots Breadcrumbs
Breadcrumbs::for('tenant.halls.slots.index', function (BreadcrumbTrail $trail, $hall_id) {
    $trail->parent('tenant.halls.index', $hall_id);
    $trail->push('Halls Slots', route('tenant.halls.slots.index', ['hall_id' => $hall_id]));
});

Breadcrumbs::for('tenant.halls.slots.create', function (BreadcrumbTrail $trail, $hall_id) {
    $trail->parent('tenant.halls.slots.index', $hall_id);
    $trail->push('Create Halls Slots', route('tenant.halls.slots.create', ['hall_id' => $hall_id]));
});

Breadcrumbs::for('tenant.halls.slots.edit', function (BreadcrumbTrail $trail, $hall_id, $id) {
    $trail->parent('tenant.halls.slots.index', $hall_id);
    $trail->push('Edit Halls Slots', route('tenant.halls.slots.edit', ['hall_id' => $hall_id, 'id' => $id]));
});
