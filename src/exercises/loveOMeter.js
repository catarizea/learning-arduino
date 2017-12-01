import five from 'johnny-five';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const outputPins = [
      new five.Pin({ pin: 2, mode: 1 }),
      new five.Pin({ pin: 3, mode: 1 }),
      new five.Pin({ pin: 4, mode: 1 }),
    ];

    const switchPins = arr => {
      arr.forEach(pin => {
        if (pin.set === 'low') {
          outputPins[pin.key].low();
        } else {
          outputPins[pin.key].high();
        }
      });
    };

    const baselineTemp = 22;
    const temperature = new five.Thermometer({
      controller: 'TMP36',
      pin: 'A0',
    });

    temperature.on('change', function() {
      console.log(`${this.celsius} °C`, `${this.fahrenheit} °F`);
      const temp = this.celsius;
      if (temp <= baselineTemp) {
        switchPins([
          { key: 0, set: 'low' },
          { key: 1, set: 'low' },
          { key: 2, set: 'low' },
        ]);
      } else if (temp < baselineTemp + 2) {
        switchPins([
          { key: 0, set: 'high' },
          { key: 1, set: 'low' },
          { key: 2, set: 'low' },
        ]);
      } else if (temp < baselineTemp + 4) {
        switchPins([
          { key: 0, set: 'high' },
          { key: 1, set: 'high' },
          { key: 2, set: 'low' },
        ]);
      } else {
        switchPins([
          { key: 0, set: 'high' },
          { key: 1, set: 'high' },
          { key: 2, set: 'high' },
        ]);
      }
    });
  });
}

export default doExercise;
