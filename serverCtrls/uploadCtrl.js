var multer = require('multer');

module.exports = function (app) {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
        var err = new Error();
        err.code = 'filetype';
        return cb(err);
      } else {
        cb(null, file.originalname);
      }
    }
  });

  var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
  }).single('myfile');

  app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
        } else if (err.code === 'filetype') {
          res.json({ success: false, message: 'Filetype is invalid. Must be .png' });
        } else {
          res.json({ success: false, message: 'Unable to upload file' });
        }
      } else {
        if (!req.file) {
          res.json({ success: false, message: 'No file was selected' });
        } else {
          res.json({ success: true, message: 'File uploaded!' });
        }
      }
    });
  });
}
