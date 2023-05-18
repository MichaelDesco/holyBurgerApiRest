const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    const imageName = file.originalname.split('.').slice(0, -1).join('.');
    cb(null, imageName + '_' + Date.now() + '.' + extension);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier invalide'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };

