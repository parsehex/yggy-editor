<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import { useAppStore } from 'store';
import getData from 'game/data/get';
import { Dialogue } from 'game/types';
import { querySelector } from 'dom-util';
import ChoiceNode from './ChoiceNode.vue';

// TODO once all of this is finished, digest it all and make a
//   visual map using tldraw, put in Docs

const props = defineProps<{
	dialogue: Dialogue;
	renderedDialogueIDs: number[];
}>();

const store = useAppStore();
const { gameState, editorState } = toRefs(store);

// Check if this dialogue has already been rendered in current branch and globally
const isAlreadyRenderedInBranch = computed(() => props.renderedDialogueIDs.includes(props.dialogue.id));
const isRenderedGlobally = computed(() => {
	// Check against the global set of rendered dialogue IDs
	return editorState.value.tree.renderedDialogueIDs.has(props.dialogue.id);
});
console.log(isRenderedGlobally.value, props.dialogue.text);

// these two do not work
// causes Maximum recursive updates error
onMounted(() => {
	// Add this node's ID to the global registry when mounted
	if (!editorState.value.tree.renderedDialogueIDs.has(props.dialogue.id)) {
		editorState.value.tree.renderedDialogueIDs.add(props.dialogue.id);
	}
});
onUnmounted(() => {
	// Remove this node's ID when component is destroyed
	if (editorState.value.tree.renderedDialogueIDs.has(props.dialogue.id)) {
		editorState.value.tree.renderedDialogueIDs.delete(props.dialogue.id);
	}
});

const isActive = computed(() => gameState.value.currentDialogueID === props.dialogue.id && !isRenderedGlobally.value);
const isCollapsed = computed(() => editorState.value.tree.collapsed.dialogue.includes(props.dialogue.id));

const character1Name = computed(() => {
	if (props.dialogue.character1ID === null) return null;
	const ch = getData('characters', props.dialogue.character1ID);
	return ch ? ch.name : null;
});

const character2Name = computed(() => {
	if (props.dialogue.character2ID === null) return null;
	const ch = getData('characters', props.dialogue.character2ID);
	return ch ? ch.name : null;
});

const isLinkingDialogue = computed(() =>
	!editorState.value.tree.linking.finalized && editorState.value.tree.linking.dialogueID === props.dialogue.id
);

function toggleCollapse() {
	const index = editorState.value.tree.collapsed.dialogue.indexOf(props.dialogue.id);
	if (index > -1) {
		editorState.value.tree.collapsed.dialogue.splice(index, 1);
	} else {
		editorState.value.tree.collapsed.dialogue.push(props.dialogue.id);
	}
}

function goToDialogue() {
	// TODO: Implement go to dialogue logic
	console.log('Go to dialogue:', props.dialogue.id);
}

function linkDialogue() {
	// TODO: Implement link dialogue logic
	console.log('Link dialogue:', props.dialogue.id);
}
</script>
<template>
	<li :class="['dialogue', { 'reference': isRenderedGlobally, 'active': isActive, 'collapsed': isCollapsed }]"
		:data-id="dialogue.id.toString()">
		<div class="content">
			<span :class="['text', isActive ? 'font-bold' : '', isRenderedGlobally ? 'italic' : '']"
				:title="'Click to toggle collapse'" @click="toggleCollapse">{{ dialogue.text }}</span>
			<span v-if="character1Name" class="character">{{ character1Name }}</span>
			<span v-if="character2Name" class="character">{{ character2Name }}</span>
			<template v-if="!isRenderedGlobally">
				<button class="go-to" title="Go to dialogue in preview" @click="goToDialogue">Go</button>
				<button :class="['link', { 'active': isLinkingDialogue }]" title="Link dialogue to choice"
					@click="linkDialogue">Link</button>
			</template>
		</div>
		<ul v-if="!isRenderedGlobally && dialogue.choices.length > 0 && !isAlreadyRenderedInBranch"
			class="choices list-none pl-3">
			<ChoiceNode v-for="choiceId in dialogue.choices" :key="choiceId" :choiceId="choiceId"
				:renderedDialogueIDs="[...props.renderedDialogueIDs, props.dialogue.id]" />
		</ul>
	</li>
</template>
<style lang="css" scoped>
li.dialogue.highlight>div.content>span.text {
	color: white;

	background-color: #1E88E5;
}

li.dialogue.reference>div.content>span.text {
	font-style: italic;
}

li.dialogue.collapsed span.text {
	border-bottom: 1px solid;
}

li.dialogue.collapsed>ul {
	display: none;
}
</style>
