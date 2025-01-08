import Role from '../model/role.schema.js';
import Permission from '../model/permission.schema.js';
import RolePermission from '../model/rolePermission.schema.js';

const rolePermissionMappings = {
  'Admin': [
    'CREATE_EVENT',
    'DELETE_EVENT',
    'VIEW_EVENT',
    'MANAGE_USERS'
  ],
  'Organizer': [
    'CREATE_EVENT',
    'DELETE_EVENT',
    'VIEW_EVENT'
  ],
  'User': [
    'VIEW_EVENT'
  ]
};

const seedRolePermissions = async () => {
  try {
    // Check if role-permissions already exist
    const existingRolePermissions = await RolePermission.find({});
    if (existingRolePermissions.length > 0) {
      console.log('Role permissions already seeded.');
      return;
    }

    // Get all roles and permissions
    const roles = await Role.find({});
    const permissions = await Permission.find({});

    // Create role-permission associations
    for (const [roleName, permissionNames] of Object.entries(rolePermissionMappings)) {
      const role = roles.find(r => r.role_Name === roleName);
      if (!role) {
        console.log(`Role ${roleName} not found`);
        continue;
      }

      for (const permissionName of permissionNames) {
        const permission = permissions.find(p => p.permissionName === permissionName);
        if (!permission) {
          console.log(`Permission ${permissionName} not found`);
          continue;
        }

        // Create role-permission association
        const rolePermission = new RolePermission({
          role: role._id,
          permission: permission._id
        });

        await rolePermission.save();
        console.log(`Created role-permission: ${roleName} - ${permissionName}`);
      }
    }

    console.log('Role permissions seeded successfully!');
  } catch (error) {
    console.error('Error seeding role permissions:', error);
  }
};

export default seedRolePermissions;