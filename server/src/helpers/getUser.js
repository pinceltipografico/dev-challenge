import fs from 'fs';

// CHANGED TO PERFORM WITH STREAM
// TO IMPROVE PERFORMANCE
export default async function getUser(id) {
  return new Promise((resolve, reject) => {
    let file = ''
    const stream = fs.createReadStream(`./data/users/${id}.json`,{ encoding: 'utf8'})
    stream.on('data', chunk => {
      file += chunk;
    });
    stream.on('close', () => {
      resolve(JSON.parse(file));
      stream.destroy();
    });
    stream.on('error', (err) => reject(err));
  });
}
