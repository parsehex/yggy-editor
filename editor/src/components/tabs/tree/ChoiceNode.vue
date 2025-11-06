<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useAppStore } from 'store';
import getData from 'game/data/get';
import DialogueNode from './DialogueNode.vue';
import { Choice } from 'game/types';

const props = defineProps<{
	choiceId: number;
	renderedDialogueIDs: number[];
}>();

const store = useAppStore();
const { editorState } = toRefs(store);

const choice = computed(() => getData('choices', props.choiceId));
const choiceText = computed(() => choice.value.text.length > 0 ? choice.value.text : '(cycle dialogue)');
const isCycleDialogue = computed(() => choice.value.text.length === 0);
const isCollapsed = computed(() => editorState.value.tree.collapsed.choices.includes(props.choiceId));

const isLinkingChoice = computed(() =>
	!editorState.value.tree.linking.finalized && editorState.value.tree.linking.choiceID === props.choiceId
);

function toggleCollapse() {
	const index = editorState.value.tree.collapsed.choices.indexOf(props.choiceId);
	if (index > -1) {
		editorState.value.tree.collapsed.choices.splice(index, 1);
	} else {
		editorState.value.tree.collapsed.choices.push(props.choiceId);
	}
}

function linkChoice() {
	// TODO: Implement link choice logic
	console.log('Link choice:', props.choiceId);
}

function createDialogue() {
	// TODO: Implement create dialogue logic
	console.log('Create dialogue for choice:', props.choiceId);
}

function unlinkChoice() {
	// TODO: Implement unlink choice logic
	console.log('Unlink choice:', props.choiceId);
}
</script>
<template>
	<li :class="['choice', { 'collapsed': isCollapsed, 'cycle-dialogue': isCycleDialogue }]"
		:data-id="choice.id.toString()">
		<div class="content">
			<span class="text" :title="'Click to toggle collapse'" @click="toggleCollapse">{{ choiceText }}</span>
			<button :class="['link', { 'active': isLinkingChoice }]" title="Link choice to dialogue"
				@click="linkChoice">Link</button>
			<template v-if="choice.targetDialogueID === null">
				<button class="create-dialogue" @click="createDialogue">+ Dialogue</button>
			</template>
			<template v-else>
				<button class="unlink" title="Remove dialogue link" @click="unlinkChoice">Unlink</button>
			</template>
		</div>
		<ul v-if="choice.targetDialogueID !== null" class="list-none pl-3">
			<DialogueNode :dialogue="getData('dialogue', choice.targetDialogueID)"
				:renderedDialogueIDs="props.renderedDialogueIDs" />
		</ul>
	</li>
</template>
