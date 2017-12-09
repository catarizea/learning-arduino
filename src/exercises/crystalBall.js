import five from 'johnny-five';
import temporal from 'temporal';
import randomInt from 'random-int';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready for LCD!');

    const tiltSwitchPin = new five.Pin({ pin: 6, mode: five.Pin.INPUT });

    // [ rs, en, d4, d5, d6, d7 ]
    const lcd = new five.LCD({
      pins: [12, 11, 5, 4, 3, 2],
      rows: 2,
      cols: 16,
    });

    const answers = [
      'Yes',
      'Most likely',
      'Certainly',
      'Outlook good',
      'Unsure',
      'Ask again',
      'Doubtful',
      'No',
    ];

    lcd.cursor(0, 0).print('Ask the');
    lcd.cursor(1, 0).print('Crystal Ball!');

    const cycle = 2000;
    let answerKey = randomInt(7);
    let currentSwitchState = null;

    temporal.loop(cycle, () => {
      tiltSwitchPin.query(state => {
        console.log(`tilt switch value: ${state.value}`);

        if (!state.value) {
          answerKey = randomInt(7);
          currentSwitchState = 0;
          lcd.clear();
        } else {
          if (!currentSwitchState) {
            if (currentSwitchState === null) {
              lcd.clear();
            }
            lcd.cursor(0, 0).print('The ball says:');
            lcd.cursor(1, 0).print(answers[answerKey]);
            currentSwitchState = 1;
          }
        }

      });
    });

  });
}

export default doExercise;
