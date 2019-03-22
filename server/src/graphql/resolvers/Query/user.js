import { getUser } from '../../../helpers';
import uuid62 from 'uuid62';

export default async function user(root, { id }, { ctx }, info) {
  const decodedId = uuid62.decode(id);
  return getUser(decodedId);
}
