<?php

return [
    'leftbar' => [
        'dashboard' => 'Dashboard',
        'administration' => 'Administration',
        'roles_and_permissions' => 'Role & Permission',
        'roles' => 'Roles',
        'permissions' => 'Permissions',
        'sites' => 'Sites'
    ],
    'roles' => [
        'role_singular' => 'Role',
        'role_plural' => 'Roles',
        'add_new_role' => 'Add New Role',
        'edit_role' => 'Edit Role',
        'update_role' => 'Update Role',
        'delete_role' => 'Delete Role',
        'pages' => [
            'index' => [
                'title' => 'Roles',
                'description' => 'A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what he need',
                'rolecard_title' => ':value',
                'rolecard_guard' => ':value',
                'rolecard_total_users' => 'Total :value users',
                'rolecard_total_permissions' => 'Total :value permissions',
            ],
            'create' => [
                'create_role' => 'Create Role',
                'save_role' => 'Save Role',
            ],
            'edit' => [
                'edit_role' => 'Edit Role',
                'update_role' => 'Update Role',
            ]
        ],
    ],
    'permissions' => [
        'permission_singular' => 'Permission',
        'permission_plural' => 'Permissions',
        'add_new_permission' => 'Add New Permission',
        'create_permission' => 'Create Permission',
        'edit_permission' => 'Edit Permission',
        'update_permission' => 'Update Permission',
        'delete_permission' => 'Delete Permission',
        'pages' => [
            'index' => [
                'title' => 'Permissions',
                'description' => '',
            ],
            'fields' => [
                'permission_name' => 'Permission name',
                'permission_name_description' => '',
                'guard_name' => 'Guard name',
                'guard_name_description' => '',
            ],
            'extras' => [],
        ],
    ],
    'commons' => [
        'view_all' => 'View All',
        'add_new' => 'Add New',
        'save' => 'Save',
        'update' => 'Update',
        'create' => 'Create',
        'edit' => 'Edit',
        'delete' => 'Delete',
        'cancel' => 'Cancel',
        'yes' => 'Yes',
        'no' => 'No',
        'make_default' => 'Make Default',
        'data_not_found' => 'Data not found!',
        'made_default' => 'Made it default',
        'are_you_sure' => 'Are you sure?',
        'are_you_sure_you_want_to_delete_the_selected_items' => 'Are you sure you want to delete the selected items?',
        'data_saved' => 'Data saved!',
        'data_updated' => 'Data updated!',
        'data_deleted' => 'Data deleted!',
        'something_went_wrong' => 'Something went wrong!',
        'yes_delete' => 'Yes, delete it!',
        'no_cancel' => 'No, cancel!',
        'please_select_at_least_one_item' => 'Please select at least one item!',
        'fields' => [
            'default' => 'Default',
            'default_description' => '',
            'status' => 'Status',
            'status_description' => '',
            'created_at' => 'Created at',
            'created_by' => 'Created by :value',
            'updated_at' => 'Updated at',
            'updated_by' => 'Updated by :value',
            'deleted_at' => 'Deleted at',
            'deleted_by' => 'Deleted by :value',
            'actions' => 'Actions',
            'hash' => '#',
        ]
    ],
];
