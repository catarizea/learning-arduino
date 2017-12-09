import five from 'johnny-five';
import temporal from 'temporal';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const motorOnOffPin = new five.Pin({ pin: 5, mode: five.Pin.INPUT });
    const motorDirectionPin = new five.Pin({ pin: 4, mode: five.Pin.INPUT });
    const potentiometerPin = new five.Pin({ pin: 'A0', mode: five.Pin.INPUT });

    const motor = new five.Motor({ pins: { pwm: 9, dir: 3, cdir: 2 } });

    const cycle = 100;
    let direction = 1;

    temporal.loop(cycle, () => {
      motorOnOffPin.query(state => {
        console.log(`motor on off value: ${state.value}`);

        if (!state.value) {
          motor.stop();
        } else {
          potentiometerPin.query(speedState => {
            const speed = Math.ceil(speedState.value / 4);
            console.log(`motor speed value: ${speed}`);

            if (!speed) {
              motor.stop();
            } else {
              motorDirectionPin.query(dirState => {
                console.log(`motor direction value: ${dirState.value}`);

                if (direction === dirState.value) {
                  motor.forward(speed);
                } else {
                  motor.reverse(speed);
                }

                direction = dirState.value;
              });
            }

          });
        }

      });
    });

  });
}

export default doExercise;
