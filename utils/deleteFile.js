const fs = require("fs");
const path = require("path");

module.exports = (imagePath) => {
  imagePath = imagePath.split("images")[1];
  fs.unlink(path.join(".", "public", "images", imagePath), (error) => {
    if (error) {
      return 0;
    }
    return 1;
  });
};
