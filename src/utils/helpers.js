import five from 'johnny-five';
import { forOwn, sortBy } from 'lodash';

export const mapValueToInterval = (value, fromArr, toArr) => {
  return (value - fromArr[0]) / (fromArr[1] - fromArr[0]) * (toArr[1] - toArr[0]) + toArr[0];
};

export const getPiezoFrequency = (inputValue, inputArr) => {
  const notes = five.Piezo.Notes;
  const toArr = [99999, 0];
  let noteValues = [];

  forOwn(notes, note => {
    if (note <= toArr[0]) {
      toArr[0] = note;
    }
    if (note > toArr[1]) {
      toArr[1] = note;
    }
    noteValues.push(note);
  });

  noteValues = sortBy(noteValues);

  const inputValueMapped = parseInt(mapValueToInterval(inputValue, inputArr, toArr), 10);
  let frequency = noteValues[0];

  for (let i = 0; i < noteValues.length; i++) {
    if (noteValues[i] >= inputValueMapped) {
      frequency = noteValues[i];
      break;
    }
  }

  return frequency;
}
