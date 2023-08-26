interface PermissionsSeed {
  name: string
  module: string
  domain: string
}

export const permissionsSeed: PermissionsSeed[] = [
  // GENERAL | USER
  { name: 'create_user', module: 'Users', domain: 'General' },
  { name: 'edit_user', module: 'Users', domain: 'General' },
  { name: 'disable_user', module: 'Users', domain: 'General' },
  { name: 'list_users', module: 'Users', domain: 'General' },
  // GENERAL | ROLE
  { name: 'create_role', module: 'Roles and Permissions', domain: 'General' },
  { name: 'list_roles', module: 'Roles and Permissions', domain: 'General' },
  { name: 'edit_role', module: 'Roles and Permissions', domain: 'General' },
  { name: 'edit_role_permissions', module: 'Roles and Permissions', domain: 'General' }
]
