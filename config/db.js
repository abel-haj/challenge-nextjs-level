// import level
const { Level } = require('level');
// create database instance
const db = new Level('./database', { valueEncoding: 'json' });
// new database for users
const users = db.sublevel('users', { valueEncoding: 'json', })

// select * form user where username='' and password=''
export const getUser = async (username, password) => {

  // input data empty or null
  if (!username || !password)
    return { code: 400, user: null, }

  try {
    const val = await users.get(username)

    // wrong password
    if (val.password !== password)
      return { code: 400, user: null, }

    // account blocked
    if (val.active === 0)
      return { code: 401, user: null, }

    // good
    return { code: 200, user: { username: username, images: val.images } }

  } catch (error) {
    // key not found
    // console.log('WHOOPS, AN ERROR', error);
    return { code: 400, user: null, }
  }

};

// save liked images to database
export const updateImage = async (username, image) => {

  try {

    // search for username
    const u = await users.get(username)

    if (u.images.includes(image))
      // already liked image => remove like
      u.images = u.images.filter((img) => img !== image)

    else
      // image not found => add like
      u.images.push(image)

    // update database
    await users.put(username, u)

    // no error occured
    return true

  } catch (error) {
    // username not found or failed to save
    // console.log('WHOOPS, AN ERROR', error);
    return false
  }

};