import {
    Time,
    Synth,
    Part,
    JCReverb,
    FeedbackDelay,
    DuoSynth
} from 'tone'

let template =
    `    <div class="module progression" id="progression" isReplace="true">
    <h1>PROGRESSION</h1>
    <div class="progression_bar">
        <input type="file" @input="importJson($event)" class="bar_import" />
        <span class="bar_dec--beat">rhythm</span><select name="" id="" v-model="type">
            <option v-for="type in types" :label="type" :value="type" :key="type"></option>
        </select>
        <span class="bar_dec--beat">bpm</span><input class="bar_input--bpm" v-model="bpm" />

        <span class="bar_dec--beat">chord</span><input class="bar_input--chord"
            v-model="input.chord" />
        <span class="bar_dec--beat">beat</span><input class="bar_input--amount" type="number"
            v-model="input.amount" />
        /
        <input class="bar_input--single" type="number" v-model="input.single" />
        <button class="bar_add" @click="add" v-show="playing === false">＋</button><br />
        <button class="bar_btn" @click="toggle"
            :class="{'button--focus': playing}">{{playing ? "STOP" : "START"}}</button>
        <button class="bar_export" @click="exportJson">Export↑</button>
    </div>

    <div class="progression_input--result">
        <div v-for="item in timeline" :key="item.flag" class="result_item--wrapper">
            <div :class="['result_item', {'result_item--focus': (item.flag == flag)}]">
                <div class="item_pannel" :style="{'width': (item.amount / item.single) * 200 +'px'}"
                    @click="item.focus.call(item)">
                    {{item.chord}} - {{item.amount + '/' + item.single}}
                </div>
                <button class="item_deleBtn" @click="remove(item)" v-show="playing === false">X</button>
            </div>
        </div>
    </div>
</div>`

let loopMap = {
    // time: the real time when the loop is fired
    // single: the time of each loop
    scale: function (synth, chord, single) {
        return new Part(function (time, event) {
            for (let i = 0; i < chord.length; i++) {
                synth.triggerAttackRelease(chord[i % chord.length], '16n', time + i * Time('16n'));
            }
        }, [{
            time: 0
        }])
    },

    quick: function (synth, chord, single) {
        return new Part(function (time, event) {
            for (let i = 0; i < chord.length; i++) {
                synth.triggerAttackRelease(chord[i % chord.length], '8n', time + i * Time('32n'));
            }
        }, [{
            time: 0
        }])
    },

}

var synth = new Synth({oscillator: {type: 'sine'}}).toMaster();

export {
    template,
    loopMap,
    synth
}