import five from 'johnny-five';
import temporal from 'temporal';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const inputPin = new five.Pin({ pin: 2, mode: five.Pin.INPUT });

    const outputPins = [
      new five.Pin({ pin: 3, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 4, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 5, mode: five.Pin.OUTPUT }),
    ];

    let iter = 0;
    temporal.loop(100, function() {
      inputPin.query(state => {
        const inputValue = state.value;

        if (!inputValue) {
          iter = 0;
          outputPins[0].high();
          outputPins[1].low();
          outputPins[2].low();
        } else {
          outputPins.forEach((pin, key) => {
            if (key === iter) {
              outputPins[key].high();
            } else {
              outputPins[key].low();
            }
          });
          iter += 1;
          if (iter > 2) {
            iter = 0;
          }
        }
      });
    });
  });
}

export default doExercise;
