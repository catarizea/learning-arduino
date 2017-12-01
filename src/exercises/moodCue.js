import five from 'johnny-five';
import temporal from 'temporal';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const servo = new five.Servo({ pin: 9, range: [0, 180] });
    const inputPin = new five.Pin({ pin: 'A0', mode: five.Pin.INPUT });

    temporal.loop(500, function() {
      inputPin.query(state => {
        // map from [0, 1024] to [0, 180]
        const value = Math.floor(state.value / 5.68);

        console.log(`Angle: ${value}`);
        servo.to(value);
      });
    });
  });
}

export default doExercise;
