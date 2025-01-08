import User from '../model/user.schema.js';
import bcryptjs from 'bcryptjs';
import Role from '../model/role.schema.js';

const users = [
  { fullname: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'Admin' },
  { fullname: 'User', email: 'user@example.com', password: 'user123', role: 'User' },
  { fullname: 'Organizer', email: 'organizer@example.com', password: 'organizer123', role: 'Organizer' }
];

const seedUsers = async () => {
  for (const userData of users) {
    const { email, role } = userData;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User '${email}' already exists.`);
    } else {
      // Find the role by its name
      const roleFound = await Role.findOne({ role_Name: role });
      if (!roleFound) {
        console.log(`Role '${role}' not found for user '${email}'.`);
        continue; // Skip user creation if role is not found
      }
      
      // Hash the password
      const hashedPassword = await bcryptjs.hash(userData.password, 10);
      
      // Create the user
      const newUser = new User({
        fullname: userData.fullname,
        email,
        password: hashedPassword,
        role: roleFound._id,
        isApproved:false
      });
      
      await newUser.save();
      console.log(`User '${email}' created.`);
    }
  }
};

export default seedUsers;
