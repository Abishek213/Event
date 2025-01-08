import Permission from '../model/permission.schema.js';

const seedPermissions = async () => {
  const permissions = [
    { permissionName: 'CREATE_EVENT' },
    { permissionName: 'DELETE_EVENT' },
    { permissionName: 'VIEW_EVENT' },
    { permissionName: 'MANAGE_USERS' },
  ];

  try {
    for (const perm of permissions) {
      const existingPermission = await Permission.findOne({ permissionName: perm.permissionName });
      if (!existingPermission) {
        await Permission.create(perm);
        console.log(`Permission ${perm.permissionName} created`);
      }
    }
  } catch (error) {
    console.error('Error seeding permissions:', error);
  }
};

export default seedPermissions;
