<template>
    <div class="module progression" id="progression">
        <h1>PROGRESSION</h1>
        <div class="progression_bar">
            <span class="progression_dec--beat">beat</span><select name="" id="" v-model="type">
                <option v-for="type in types" :label="type" :value="type" :key="type"></option>
            </select>
            <span class="progression_dec--beat">bpm</span><input class="progression_input--bpm" v-model="bpm" />

            <span class="progression_dec--beat">chord</span><input class="progression_input--chord"
                v-model="input.chord" />
            <span class="progression_dec--beat">beat</span><input class="progression_input--amount" type="number"
                v-model="input.amount" />
            /
            <input class="progression_input--single" type="number" v-model="input.single" />
            <button class="progression_add" @click="add" v-show="playing === false">＋</button><br />
            <button class="progression_btn" @click="toggle"
                :class="{'button--focus': playing}">{{playing ? "STOP" : "START"}}</button>
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
    </div>
</template>