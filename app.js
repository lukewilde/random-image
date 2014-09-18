var Canvas = require('canvas')
  , fs = require('fs')
  , sequenceGenerator = require('./random-sequence.js')

var out = fs.createWriteStream(__dirname + '/images/origional.png')
  , imageSize = 512
  , canvas = new Canvas(imageSize, imageSize)
  , ctx = canvas.getContext('2d')
  , canvasData = ctx.getImageData(0, 0, imageSize, imageSize)
  , stream = canvas.pngStream()
  , sequence = sequenceGenerator(1)

stream.on('data', function(chunk){
  out.write(chunk)
})

stream.on('end', function(){
  console.log('saved png')
})


function drawPixel (x, y, color) {
  var index = (x + y * imageSize) * 4

  canvasData.data[index + 0] = color
  canvasData.data[index + 1] = color
  canvasData.data[index + 2] = color
  canvasData.data[index + 3] = 255
}

for(var x = 0; x < imageSize; x++) {
  for(var y = 0; y < imageSize; y++) {
    var color = Math.round(sequence.get()) * 255
    drawPixel(x, y, color)
  }
}

drawPixel(0, 0, 0)
ctx.putImageData(canvasData, 0, 0)
