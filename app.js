var sequenceGenerator = require('./random-sequence.js')
  , gm = require('gm').subClass({ imageMagick: true })
  , filename = __dirname + '/images/third.png'
  , sequence = sequenceGenerator(1)
  , imageSize = 512

gm(imageSize, imageSize, '#ffffff')
  .write(filename, function (err) {

    if (err) {
      console.log(err)
    }

    drawColumn(0)

  }
)

function drawColumn (column) {

  var graphic = gm(filename)

  for (var j = 0; j < imageSize; j++) {
    var color = Math.round(sequence.get() * 255)
      , colorString = 'rgb(' + color + ', ' + color + ', ' + color + ')'

    graphic
      .drawPoint(column, j)
      .fill(colorString)
  }

  graphic.write(filename, function(error) {
    if (error) {
      console.log(error)
      return
    }

    if (column < imageSize) {
      drawColumn(column + 1)
    }

    return
  })
}
