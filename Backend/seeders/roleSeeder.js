import Role from '../model/role.schema.js';

const roles = ['Admin', 'User', 'Organizer'];

const seedRoles = async () => {
  for (const roleName of roles) {
    const existingRole = await Role.findOne({ role_Name: roleName });
    if (existingRole) {
      console.log(`Role '${roleName}' already exists.`);
    } else {
      const newRole = new Role({ role_Name: roleName });
      await newRole.save();
      console.log(`Role '${roleName}' created.`);
    }
  }
};

export default seedRoles;
