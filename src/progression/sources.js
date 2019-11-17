import {
    context,
    Time,
    Synth,
    Part,
    Transport
} from 'tone'

let template =
    `    <div class="module progression" id="progression">
    <h1>PROGRESSION</h1>
    <div class="progression_bar">
        <div class="bar_import">↓ Import <input type="file" @input="importJson($event)" /></div>
        <span class="bar_dec--beat">beat</span><select name="" id="" v-model="type">
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
            //the events will be given to the callback with the time they occur
            for(let i = 0; i < chord.length; i ++) {
                synth.triggerAttackRelease(chord[i % chord.length], '16n', time + i * Time('16n'));
            }
        }, [{
                time: 0,
            },
            {
                time: '0:1:0',
            }, {
                time: '0:2:0',
            }, {
                time: '0:3:0',
            }
        ])
    },

}

let synth = new Synth().toMaster();


export {
    template,
    loopMap,
    synth
}