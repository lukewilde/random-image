var sequenceGenerator = require('./random-sequence.js')
  , gm = require('gm').subClass({ imageMagick: true })
  , filename = __dirname + '/images/first.png'
  , sequence = sequenceGenerator(1)
  , imageSize = 256

gm(imageSize, imageSize, '#ffffff')
  .write(filename, function (err) {

    if (err) {
      console.log(err)
    }


    var graphic = gm(filename)

    for (var i = 0; i < imageSize; i++) {

      for (var j = 0; j < imageSize; j++) {

        var color = Math.round(sequence.get()) * 255
          , colorString = 'rgb(' + color + ', ' + color + ', ' + color + ')'

        graphic
          .drawPoint(i, j)
          .fill(colorString)
      }

      console.log(i)

      graphic.write(filename, function(error) {
        if (error) {
          console.log(error)
        } else {
          console.log('wooo')
        }
      })
    }

  }
)
