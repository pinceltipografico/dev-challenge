import { setUser, getUser } from '../../../helpers';
import uuid62 from 'uuid62';

export default async function User(root, { user }, { ctx }, info) {

  try {
    const decodedId = uuid62.decode(user.id)
    const storedUser = await getUser(decodedId);
    const {id, ...toUpdate} = user;
    await setUser({...storedUser, ...toUpdate});
  }catch(err) {
    if(err.code === 'ENOENT'){ 
      throw new Error(`User with id: ${user.id} not exist!`)
    }
    throw err
  }

  return true;
}
