const multer = require("multer");

const storage = multer.diskStorage({
  //destination for files
  destination: function (request: any, file: any, callback: any) {
    callback(null, "./public/uploads/images");
  },

  //add back the extension
  filename: function (request: any, file: any, callback: any) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

export { upload };
