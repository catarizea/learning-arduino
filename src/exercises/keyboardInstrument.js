import five from 'johnny-five';
import temporal from 'temporal';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const piezo = new five.Piezo({ pin: 8 });
    const inputPin = new five.Pin({ pin: 'A0', mode: five.Pin.INPUT });
    const cycle = 50;
    const notes = [262, 294, 330, 349];

    temporal.loop(cycle, function() {
      inputPin.query(state => {
        const value = state.value;
        console.log(`Input: ${value}`);

        let frequency;
        if (!value) {
          frequency = null;
        } else if (value >= 1 && value < 15) {
          frequency = notes[0];
        } else if (value >= 15 && value < 700) {
          frequency = notes[1];
        } else if (value >= 700 && value < 1010) {
          frequency = notes[2];
        } else {
          frequency = notes[3];
        }

        piezo.frequency(frequency, cycle);
      });
    });
  });
}

export default doExercise;
