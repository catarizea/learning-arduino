import five from 'johnny-five';
import temporal from 'temporal';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const inputPin = new five.Pin({ pin: 2, mode: five.Pin.INPUT });
    const outputPin = new five.Pin({ pin: 9, mode: five.Pin.OUTPUT });

    const cycle = 100;

    temporal.loop(cycle, () => {
      inputPin.query(state => {
        console.log(`input value: ${state.value}`);

        if (!state.value) {
          outputPin.low();
        } else {
          outputPin.high();
        }
      });
    });

  });
}

export default doExercise;
