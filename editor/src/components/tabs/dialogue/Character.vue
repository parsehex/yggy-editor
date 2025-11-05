<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';
import data from 'game/data';
import getData from 'game/data/get';

const props = defineProps({
	number: String, // '1' or '2'
});

const store = useAppStore();
const { currentDialogue } = toRefs(store);

const charLabel = computed(() => 'Character ' + props.number + ': ');
const character = computed(() => {
	if (!currentDialogue.value) return null;
	const id = charId.value;
	if (id === 'none') return null;
	return getData('characters', id);
});
const charId = computed({
	get: () => {
		if (!currentDialogue.value) return 'none';
		return props.number === '1' ? currentDialogue.value.character1ID : currentDialogue.value.character2ID || 'none';
	},
	set: (newId: string) => {
		if (newId === 'none') {
			// @ts-ignore sorry TypeScript
			const val = 'none' as number;
			if (props.number === '1') currentDialogue.value.character1ID = val;
			else currentDialogue.value.character2ID = val;
			return;
		}
		const id = +newId;
		if (id.toString() !== newId) throw new Error('');
		if (props.number === '1') {
			currentDialogue.value.character1ID = id;
		} else {
			currentDialogue.value.character2ID = id;
		}
	},
});

const charFrames = computed(() => character.value.frames.map((fid, i) => ({
	text: getData('frames', fid).name,
	value: i.toString(),
})));
const charFrameIndex = computed({
	get: () => {
		if (!currentDialogue.value) return 'none';
		const i = props.number === '1' ? currentDialogue.value.character1FrameIndex : currentDialogue.value.character2FrameIndex;
		return typeof i === 'number' ? i : 'none';
	},
	set: (newIndex: string) => {
		if (newIndex === 'none') {
			const val = null as number;
			if (props.number === '1') currentDialogue.value.character1FrameIndex = val;
			else currentDialogue.value.character2FrameIndex = val;
			return;
		}
		const id = +newIndex;
		if (id.toString() !== newIndex) throw new Error('');
		if (props.number === '1') {
			currentDialogue.value.character1FrameIndex = id;
		} else {
			currentDialogue.value.character2FrameIndex = id;
		}
	},
});

const isTalking = computed({
	get: () => {
		if (!currentDialogue.value) return false;
		return currentDialogue.value.ownerCharacterID === charId.value;
	},
	set: () => {
		if (!currentDialogue.value || charId.value === 'none') return;
		const checked = currentDialogue.value.ownerCharacterID === charId.value;
		// only allow enabling a diabled checkbox so that they act like radio buttons
		if (checked) return;
		currentDialogue.value.ownerCharacterID = charId.value;
	},
});
</script>
<template>
	<div class="character">
		<span>{{ charLabel }}</span>
		<select v-model="charId">
			<option value="none">None</option>
			<option v-for="ch in data.characters" :key="ch.id.toString()" :value="ch.id.toString()">{{ ch.name }}</option>
		</select>
		<select v-if="typeof charId === 'number'" v-model="charFrameIndex">
			<option v-for="f in charFrames" :key="f.value" :value="f.value">{{ f.text }}</option>
		</select>
		<label v-if="typeof charId === 'number'" class="owner" :for="'dialogue-owner-ch' + charId"> Is talking? <input
				:id="'dialogue-owner-ch' + charId" class="owner" type="radio" :checked="isTalking" @change="isTalking = true" />
		</label>
	</div>
</template>
