import roles from '../config/roles.json';

interface Role {
  name: string;
  permissions: string[];
}

class Permissions {
  getPermissionsByRoleName(roleName: string): string[] {
    const role = roles.roles.find((r: Role) => r.name === roleName);
    return role ? role.permissions : [];
  }
}

export default Permissions;
