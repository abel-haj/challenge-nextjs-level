
// import level
const { Level } = require('level');
// create db
const db = new Level('./database', { valueEncoding: 'json' });
// 
const users = db.sublevel('users', { valueEncoding: 'json', })

// log all keys and values in this sublevel
const readAll = async () => {
  const keys = await users.keys().all();
  const values = await users.values().all();

  console.info('KEYS');
  console.table(keys);
  console.info('');
  console.info('VALUES');
  console.table(values);
};

// dummy data
const insertAll = () => {
  users.put('muser1', { password: 'mpassword1', active: 1, images: [] }, (err) => {
    if (err) return console.log('Ooops! AT DATABASE 1 ============>  ', err);
  });
  users.put('muser2', { password: 'mpassword2', active: 1, images: [] }, (err) => {
    if (err) return console.log('Ooops! AT DATABASE 2 ============>  ', err);
  });
  users.put('muser3', { password: 'mpassword3', active: 0, images: [] }, (err) => {
    if (err) return console.log('Ooops! AT DATABASE 3 ============>  ', err);
  });
};

// clear all entries in this sublevel
const deleteAll = () => {
  users.clear();
};

deleteAll();
insertAll();
readAll();