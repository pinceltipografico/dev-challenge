import { getUser } from '../../helpers';

export default {
  employees: async (root, args, { ctx }, info) => {
    let employees = [];
    if(root.employees) {
      employees = root.employees.map(id => getUser(id));
    }
    return employees;
  }
};
