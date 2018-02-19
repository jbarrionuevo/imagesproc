var express = require('express');
var router = express.Router();
var cv = require('opencv');
/* GET users listing. */
router.get('/', function(req, res, next) {

  cv.readImage("./public/images/mona001a.jpg", function(err, im){
  im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
    for (var i=0;i<faces.length; i++){
      var x = faces[i]
      im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
    }
    im.save('./out.jpg');
  });
})

  res.send('respond with a facemona');
});

module.exports = router;
