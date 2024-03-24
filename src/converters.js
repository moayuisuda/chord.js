import * as utils from "./utils";
import { typeMap, noteMap, intervalMap, scaleMap, degreeMap } from "./maps";

function absoluteIntervalArr(rootInterval, intervalArr) {
  let result = [rootInterval];
  let abInterval;

  for (let interval of intervalArr) {
    abInterval = rootInterval + interval;
    result.push(abInterval);
  }

  return result;
}

function intervalArrToNotesO(intervalArr, initOctave, signType) {
  let result = [],
    octave,
    note,
    noteKey,
    signIndex = utils.getSignIndex(signType);

  for (let interval of intervalArr) {
    octave = initOctave;
    while (interval >= 12) {
      interval -= 12;
      octave++;
    }

    note = intervalToNote(interval);
    noteKey = note[signIndex] ? note[signIndex] : note[0];

    result.push(noteKey + octave);
  }

  return result;
}

function intervalArrToNotes(intervalArr, signType) {
  let result = [],
    note,
    noteKey,
    signIndex = utils.getSignIndex(signType);

  for (let interval of intervalArr) {
    while (interval >= 12) {
      interval -= 12;
    }

    note = intervalToNote(interval);
    noteKey = note[signIndex] ? note[signIndex] : note[0];

    result.push(noteKey);
  }

  return result;
}

function scaleToIntervalArr(scale) {
  let result = [];

  for (let i = 0; i < scale.length; i++) {
    if (!i) result.push(scale[i]);
    else {
      result.push(result[i - 1] + scale[i]);
    }
  }

  return result;
}

function intervalArrToChord([root, third, fifth], signType) {
  let key,
    signIndex = utils.getSignIndex(signType);
  key = [third - root, fifth - root].join("-");
  let map = utils.mapStringfy(typeMap);
  let type = map[key];
  while (root >= 12) {
    root -= 12;
  }
  return intervalToNote(root)[signIndex] + type;
}

// map getters
function noteToInterval(note) {
  let interval = noteMap[note];
  if (!(Object.prototype.toString.call(interval) === "[object Undefined]"))
    return interval;
  else throw `[Chord] Can't convert "${note}" into interval `;
}

function typeToIntervalArr(type) {
  let result = typeMap.get(type);
  return utils.copy(result);
}

function typeToScale(type) {
  let scale = scaleMap[type];
  if (scale) return utils.copy(scale);
  else throw `[Chord] Can't find a scale matched "${type}"`;
}

function intervalToNote(interval) {
  return intervalMap[interval];
}

function degreeToInterval(degree) {
  let num = Number(degree.match(/\d{1,2}/)[0]);
  let signal = degree.match(/(b|#)/) && degree.match(/(b|#)/)[0];
  let octive = 0;
  while (num >= 9) {
    num -= 7;
    octive++;
  }

  console.log(signal, num, degreeMap[signal ? signal + num : num]);

  return degreeMap[signal ? signal + num : num] + octive * 12;
}

export {
  intervalToNote,
  typeToScale,
  typeToIntervalArr,
  absoluteIntervalArr,
  intervalArrToNotes,
  intervalArrToNotesO,
  scaleToIntervalArr,
  noteToInterval,
  degreeToInterval,
  intervalArrToChord,
};
