const multer = require("multer");
const path = require('path');
const fileFilterIS = (req, file, cb) => {
  if (file.mimetype === "application/pdf" ||  file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
  } else {
      cb("Please upload only PDF or Word documents.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../public/uploads/'));
  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-CVs-${file.originalname}`);

  },
});
var Newsphoto = multer({ storage: storage, fileFilter: fileFilterIS });

module.exports = Newsphoto;