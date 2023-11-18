<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('hall_owner.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('hall_owner.dashboard'));
});

// Roles Breadcrumbs
Breadcrumbs::for('hall_owner.roles.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push(__('lang.roles.role_plural'), route('hall_owner.roles.index'));
});

Breadcrumbs::for('hall_owner.roles.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.roles.index');
    $trail->push(__('lang.roles.pages.create.create_role'));
});

Breadcrumbs::for('hall_owner.roles.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.roles.index');
    $trail->push(__('lang.commons.edit') . ' ' . __('lang.roles.role_singular'));
});

// Permisisons Breadcrumbs
Breadcrumbs::for('hall_owner.permissions.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push(__('lang.permissions.permission_plural'), route('hall_owner.permissions.index'));
});

Breadcrumbs::for('hall_owner.permissions.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.permissions.index');
    $trail->push(__('lang.permissions.create_permission'), route('hall_owner.permissions.create'));
});

Breadcrumbs::for('hall_owner.permissions.edit', function (BreadcrumbTrail $trail, $permission_id) {
    $trail->parent('hall_owner.permissions.index');
    $trail->push(__('lang.permissions.edit_permission'),  route('hall_owner.permissions.edit', ['id' => $permission_id]));
});

// HallTypes Breadcrumbs
Breadcrumbs::for('hall_owner.hallTypes.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Hall Types', route('hall_owner.hallTypes.index'));
});

Breadcrumbs::for('hall_owner.hallTypes.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.hallTypes.index');
    $trail->push('Create Hall Type');
});

Breadcrumbs::for('hall_owner.hallTypes.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.hallTypes.index');
    $trail->push('Edit Hall Type');
});

// Decorations Breadcrumbs
Breadcrumbs::for('hall_owner.decorations.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Decorations', route('hall_owner.decorations.index'));
});

Breadcrumbs::for('hall_owner.decorations.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.decorations.index');
    $trail->push('Create Decoration');
});

Breadcrumbs::for('hall_owner.decorations.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.decorations.index');
    $trail->push('Edit Decoration');
});

// Cuisine Breadcrumbs
Breadcrumbs::for('hall_owner.cuisines.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Cuisines', route('hall_owner.cuisines.index'));
});

Breadcrumbs::for('hall_owner.cuisines.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.cuisines.index');
    $trail->push('Create Cuisine');
});

Breadcrumbs::for('hall_owner.cuisines.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.cuisines.index');
    $trail->push('Edit Cuisine');
});

// Menus Breadcrumbs
Breadcrumbs::for('hall_owner.menus.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Menus', route('hall_owner.menus.index'));
});

Breadcrumbs::for('hall_owner.menus.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.menus.index');
    $trail->push('Create Menu');
});

Breadcrumbs::for('hall_owner.menus.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.menus.index');
    $trail->push('Edit Menu');
});

// Packages Breadcrumbs
Breadcrumbs::for('hall_owner.packages.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Packages', route('hall_owner.packages.index'));
});

Breadcrumbs::for('hall_owner.packages.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Create Packages');
});

Breadcrumbs::for('hall_owner.packages.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.packages.index');
    $trail->push('Edit Packages');
});

// Halls Breadcrumbs
Breadcrumbs::for('hall_owner.halls.index', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Halls', route('hall_owner.halls.index'));
});

Breadcrumbs::for('hall_owner.halls.create', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.dashboard');
    $trail->push('Create hall');
});

Breadcrumbs::for('hall_owner.halls.edit', function (BreadcrumbTrail $trail) {
    $trail->parent('hall_owner.halls.index');
    $trail->push('Edit hall');
});

// Halls slots Breadcrumbs
Breadcrumbs::for('hall_owner.halls.slots.index', function (BreadcrumbTrail $trail, $hall_id) {
    $trail->parent('hall_owner.halls.index', $hall_id);
    $trail->push('Halls Slots', route('hall_owner.halls.slots.index', ['hall' => $hall_id]));
});

Breadcrumbs::for('hall_owner.halls.slots.create', function (BreadcrumbTrail $trail, $hall_id) {
    $trail->parent('hall_owner.halls.slots.index', $hall_id);
    $trail->push('Create Halls Slots');
});

Breadcrumbs::for('hall_owner.halls.slots.edit', function (BreadcrumbTrail $trail, $hall_id) {
    $trail->parent('hall_owner.halls.slots.index', $hall_id);
    $trail->push('Edit Halls Slots');
});
