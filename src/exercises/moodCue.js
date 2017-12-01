import five from 'johnny-five';
import temporal from 'temporal';
import { mapValueToInterval } from '../utils/helpers';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const servo = new five.Servo({ pin: 9, range: [0, 180] });
    const inputPin = new five.Pin({ pin: 'A0', mode: five.Pin.INPUT });

    temporal.loop(500, function() {
      inputPin.query(state => {
        const value = parseInt(mapValueToInterval(state.value, [0, 1023], [0, 179]), 10);
        console.log(`Angle: ${value}`);
        servo.to(value);
      });
    });
  });
}

export default doExercise;
