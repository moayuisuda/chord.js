# chord.js

## :tophat: Get any chord/scale/scaleChords you want.
### More info in https://moayuisuda.github.io/rad.js/

```js
import {chord, scale, scaleChords} from 'rad.js'

chord('Cm7add11omit5/Gb'); // ["Gb", "C", "Eb", "Bb", "F"]
chord({root: 'C', type: 'm7', add: ['11'], omit: ['5'], on: 'Gb'}); // ["Gb", "C", "Eb", "Bb", "F"]
chord('Cm7add11omit5/Gb', 4, '#'); // ["Gb3", "D#4", "A#4", "F5", "C5"]

scale({root: 'C', type: 'aeolian'}); // ["C", "D", "Eb", "F", "G", "Ab", "Bb", "C"]
scale({root: 'C', type: 'aeolian'}, 4, '#'); // ["C4", "D4", "D#4", "F4", "G4", "G#4", "A#4", "C5"]

scaleChords({root: 'C', type: 'ionian'}); // ["C", "Dm", "Em", "F", "G", "Am", "Bdim"]
```

Or you can just use it as a global variable
```js
<script src="./rad.js"></script>

chord.chord('Cm7add11omit5/G');
chord.scale({root: 'C', type: 'ionian'});
chord.scaleChords({root: 'C', type: 'ionian'});
```


