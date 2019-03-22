import fs from 'fs';
import util from 'util';

const readDir = util.promisify(fs.readdir);

import { getUser } from '../../../helpers';

export default async function users(root, args, { ctx }, info) {
  const files = await readDir('./data/users');

  // todo: 3. can we accept a input variable into the graphql query to only show certain users? Maybe allowing
  //  filter by name to begin with.

  // Changed the method: getUsers to perform with streams to increase performance
  const users = await files
    .filter(filename => filename.includes('.json'))
    .map(filename => getUser(filename.replace('.json', '')))
  return users;
}
