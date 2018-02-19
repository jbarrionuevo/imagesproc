var express = require('express');
var router = express.Router();
var cv = require('opencv');
/* GET users listing. */
router.get('/', function(req, res, next) {

  cv.readImage("./public/images/in/mona001a.jpg", function(err, im) {
    im.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
      for (var i = 0; i < faces.length; i++) {
        var x = faces[i]
        im.ellipse(x.x + x.width / 2, x.y + x.height / 2, x.width / 2, x.height / 2);
      }
      im.save('./public/images/out/monaout.jpg');
    });
  })

  if (cv.ImageSimilarity === undefined) {
    console.log('TODO: Please port Features2d.cc to OpenCV 3')
    process.exit(0);
  }

  cv.readImage("./public/images/in/mona001a.jpg", function(err, car1) {
    if (err) throw err;

    cv.readImage("./public/images/in/jve001a.jpg", function(err, car2) {
      if (err) throw err;

      cv.ImageSimilarity(car1, car2, function(err, dissimilarity) {
        if (err) throw err;

        console.log('Dissimilarity: ', dissimilarity);
      });

    });

  });

  res.send('Dissimilarity: ');
});

module.exports = router;
