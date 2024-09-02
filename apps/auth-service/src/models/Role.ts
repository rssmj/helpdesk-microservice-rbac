import roles from '../config/roles.json';

// Define an interface for the role data structure
interface RoleInterface {
  name: string;
  permissions: string[];
}

class Role {
  private roles: RoleInterface[];

  constructor() {
    // Load the roles from the JSON file
    this.roles = roles.roles;
  }

  // Method to get a role by its name
  getRoleByName(name: string): RoleInterface | undefined {
    return this.roles.find((role) => role.name === name);
  }

  // Method to get all roles
  getRoles(): RoleInterface[] {
    return this.roles;
  }
}

export default Role;
