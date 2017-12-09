import ex1 from './exercises/ledBlink';
import ex2 from './exercises/spaceShipInterface';
import ex3 from './exercises/loveOMeter';
import ex4 from './exercises/colorMixingLamp';
import ex5 from './exercises/moodCue';
import ex6 from './exercises/lightTheremin';
import ex7 from './exercises/keyboardInstrument';
import ex8 from './exercises/digitalHourglass';
import ex9 from './exercises/motorizedPinwheel';
import ex10 from './exercises/zoetrope';
import ex11 from './exercises/crystalBall';

const currentExercise = process.argv[2] || 'ex1';

const exercises = {
  ex1,
  ex2,
  ex3,
  ex4,
  ex5,
  ex6,
  ex7,
  ex8,
  ex9,
  ex10,
  ex11,
};

exercises[currentExercise]();
