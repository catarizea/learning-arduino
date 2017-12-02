import five from 'johnny-five';
import temporal from 'temporal';
import { getPiezoFrequency } from '../utils/helpers';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const piezo = new five.Piezo({ pin: 8 });
    const inputPin = new five.Pin({ pin: 'A0', mode: five.Pin.INPUT });
    const cycle = 100;

    temporal.loop(cycle, function() {
      inputPin.query(state => {
        const value = state.value ? getPiezoFrequency(state.value, [0, 1023]) : null;
        console.log(`Input: ${value}`);
        piezo.frequency(value, cycle);
      });
    });
  });
}

export default doExercise;
