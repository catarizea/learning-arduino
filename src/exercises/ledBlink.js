import five from 'johnny-five';

const doExercise = () => {
  const board = new five.Board();

  board.on('ready', function() {
    console.log('Ready!');

    const led = new five.Led(13);
    led.blink(2000);
  });
}

export default doExercise;
