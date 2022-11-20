// import database helper
const { getUser } = require('../../config/db');

const msgs = {
  // 
  200: "Login successful",
  // Informations de connexion invalides
  400: "Invalid credentials",
  // Ce compte a été bloqué.
  401: "This account was blocked",
}

module.exports = async (req, res) => {
  const { username, password } = req.body;

  // returns a status code
  const result = await getUser(username, password);

  return res.status(result.code).json({
    error: result.code !== 200,
    message: msgs[result.code], 
    user: result.user,
  });
}