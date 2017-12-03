import five from 'johnny-five';
import temporal from 'temporal';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const inputPin = new five.Pin({ pin: 8, mode: five.Pin.INPUT });

    const outputPins = [
      new five.Pin({ pin: 2, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 3, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 4, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 5, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 6, mode: five.Pin.OUTPUT }),
      new five.Pin({ pin: 7, mode: five.Pin.OUTPUT }),
    ];

    const turnOnLeds = howMany => {
      for (let i = 0; i < howMany; i++) {
        outputPins[i].high();
      }
    }

    const turnOffLeds = () => {
      outputPins.forEach(pin => {
        pin.low();
      })
    }

    const cycle = 1000;

    // adjust here time here now is at 10 seconds
    const timeUnit = 10 * cycle;

    let timePassed = 0;

    temporal.loop(cycle, () => {
      inputPin.query(state => {
        console.log(`input value: ${state.value}`);
        console.log(`time passed: ${timePassed}`);

        if (!state.value) {
          // if you tilt the board, the sensor is switched off
          if (timePassed > 0) {
            turnOffLeds();
          }
          timePassed = 0;
        } else {
          if (timePassed && timePassed >= timeUnit
            && timePassed % timeUnit === 0) {
            turnOnLeds(timePassed / timeUnit);
          }
          timePassed += cycle;
        }
      });
    });

  });
}

export default doExercise;
