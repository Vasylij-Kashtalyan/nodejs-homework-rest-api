const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");

// шлях до папки в котрій зберігаємо аватарки
const avatarsDir = path.join(__dirname, "../../public/avatars");

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user;

    const { path: tempPath, originalname } = req.file; // шлях де знаходиться аватарка і імя

    const [extension] = originalname.split(".").reverse(); // забираємо останній елемент масива
    const newName = `${_id}.${extension}`;

    const uploadPath = path.join(avatarsDir, newName); // куди переміщуємо аватарку

    const image = await Jimp.read(tempPath);
    image.resize(250, 250).write(uploadPath);

    await fs.rename(tempPath, uploadPath);
    const avatartURL = path.join("avatars", newName); // новий шлях до аватарки

    await User.findByIdAndUpdate(_id, { avatartURL }); // записуємо в базу

    res.json({
      avatartURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path); // видаляє шлях до файлу
    throw error;
  }
};

module.exports = setAvatar;
