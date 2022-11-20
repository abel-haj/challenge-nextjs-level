// database helper
const { updateImage } = require('../../config/db');

module.exports = async (req, res) => {
  // image id and username : strings
  const { image, username } = req.body

  // returns a boolean wether or not the image was added to user
  const result = await updateImage(username, image)

  if (!image || !username || !result)
    return res.status(400).json({ message: 'Image not updated', error: true })

  return res.status(200).json({ message: "Image updated", success: true })
}