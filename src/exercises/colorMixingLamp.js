import five from 'johnny-five';
import temporal from 'temporal';
import rgbHex from 'rgb-hex';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const rgbLed = new five.Led.RGB({ pins: { red: 11, green: 9, blue: 10 } });

    const colors = [
      { color: 'red', value: 0 },
      { color: 'green', value: 0 },
      { color: 'blue', value: 0 },
    ];

    const inputPins = [
      new five.Pin({ pin: 'A2', mode: five.Pin.INPUT }),
      new five.Pin({ pin: 'A0', mode: five.Pin.INPUT }),
      new five.Pin({ pin: 'A1', mode: five.Pin.INPUT }),
    ];

    temporal.loop(10, function() {
      inputPins.forEach((pin, key) => {
        pin.query(state => {
          const value = Math.ceil(state.value / 4);
          colors[key].value = value;
        });
      });

      const hexColor = rgbHex(colors[0].value, colors[1].value, colors[2].value);

      rgbLed.color(`#${hexColor}`);
    });

  });
}

export default doExercise;
