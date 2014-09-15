module.exports = function createRandomSequence(seed) {

  var generator =
      { initialSeed: seed ? '0.' + seed : Math.random()
      }

  generator.get = function() {
    return generator.currentSeed = logisticMap(generator.currentSeed)
  }

  function logisticMap(x) {
    return 4 * x * (1 - x)
  }

  function init() {

    generator.currentSeed = generator.initialSeed

    for (var i = 0; i < 100; i++) {
      generator.currentSeed = logisticMap(generator.currentSeed)
    }

    return generator
  }

  return init()
}
