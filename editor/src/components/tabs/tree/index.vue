<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';
import { querySelector } from 'dom-util';
import data from 'game/data';
import DialogueNode from './DialogueNode.vue';
import _editorDelegate from 'delegate';

const TAB_NAME = 'Tree';

const store = useAppStore();
const { openedTab, editorState } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());

const firstDialogue = computed(() => {
	// don't really have a way to set any dialogue as the first or the root
	// so we just use the first one
	if (!data.dialogue) return;
	return data.dialogue[0];
});

const isUndoDisabled = computed(() => (
	!editorState.value.tree.linking.finalized ||
	editorState.value.tree.linking.dialogueID === null ||
	editorState.value.tree.linking.choiceID === null
));

function undoLink() {
	// TODO: Implement undo link logic
	console.log('Undo link');
}

_editorDelegate(`#tree-tab li.dialogue.reference > div.content > span.text`, 'mouseover', (e, t) => {
	const id = +t.closest('li.dialogue').dataset.id;
	// find original dialogue and highlight it
	const dEl = querySelector(`#tree-tab li.dialogue:not(.reference)[data-id="${id}"]`);
	dEl.classList.add('highlight');
});
_editorDelegate(`#tree-tab li.dialogue.reference > div.content > span.text`, 'mouseout', (e, t) => {
	// find any highlighted dialogue (should only be one) and un-higlhight it
	const dEl = querySelector(`#tree-tab li.dialogue:not(.reference).highlight`);
	dEl.classList.remove('highlight');
});
</script>
<template>
	<div :class="['tab space-y-2', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div class="controls bg-white/80 text-center fixed flex w-40 gap-2 p-1">
			<button class="undo" :disabled="isUndoDisabled" @click="undoLink">Undo</button>
		</div>
		<ul class="tree-list list-none pt-6 pl-3 px-0">
			<DialogueNode v-if="firstDialogue" :dialogue="firstDialogue" :renderedDialogueIDs="[]" />
		</ul>
	</div>
</template>
<style lang="scss">
div#tree-tab {
	$headerHeight: 30px;

	ul {
		padding-left: 15px;
		border-left: 1px solid gray;
		margin: 6px 0;

		// makes it easier to pick a branch in devtools:
		background-color: white;
	}

	li.dialogue {
		&.active>div.content>span.text {
			font-weight: bold;
		}

		&.highlight>div.content>span.text {
			color: white;
			;
			background-color: #1E88E5;
		}

		&.reference>div.content>span.text {
			font-style: italic;
		}
	}

	li.choice {
		&.cycle-dialogue>div.content>span.text {
			font-style: italic;
			color: #263238;
		}
	}

	li {
		white-space: nowrap;
		background-color: white;

		div.content {
			display: flex;
			margin: 0 2px;
			// min-width: 350px;

			* {
				// required to be able to set span width (which is required for text overflow)
				display: inline-block;
			}

			span.text {
				// TODO text is cut off after less and less space the farther right you go
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				min-width: 225px;
				max-width: 275px;
				// max-width: 275px;
				padding: 2px;
			}
		}

		button {
			margin: 0 7px;
			font-size: 0.7em;

			// add some space to whichever button is last
			&.create-dialogue {
				margin-right: 15px;
			}

			&.link.active {
				background-color: lightblue;
			}
		}

		&.collapsed {
			&>div.content>span.text {
				border-bottom: 1px solid;
			}

			&>ul {
				display: none;
			}
		}

		&:not(.dialogue)>div.content>span.text {
			color: #0D47A1;
		}

		&.dialogue>div.content>span.character {
			font-size: 0.85em;
			padding: 2px;
			margin: 0 4px;
			border: 1px solid gray;
		}
	}
}
</style>
