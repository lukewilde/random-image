var sequence = require('./random-sequence.js')
  , gm = require('gm').subClass({ imageMagick: true })
  , filename = __dirname + '/images/first.png'

gm(512, 512, '#ffffff')
  .write(filename, function (err, image) {

    for (var i = 0, i < 512; i++) {
      for (var j = 0, j < 512; j++) {

        var color = sequence.get() * 255
          , colorString = 'rgb(' + color + ', ' + color + ', ' + color + ')'

        gm(filename)
          .drawPoint(i, j, colorString)
      }
    }

  }
)
