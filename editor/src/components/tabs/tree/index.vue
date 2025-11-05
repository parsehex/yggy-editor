<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Tree';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div>
			<button type="button" class="undo" disabled>Undo last link</button>
		</div>
		<ul></ul>
	</div>
</template>
<style lang="scss">
div#tree-tab {
	font-family: sans-serif;

	$headerHeight: 30px;

	&>div {
		position: fixed;
		background-color: rgba(255, 255, 255, 0.8);
		width: 10em;
		text-align: center;
		padding: 5px;
		height: $headerHeight;
	}

	&>ul {
		margin-top: $headerHeight !important;
		padding-left: 0 !important;
		border-left: 0 !important;
	}

	ul {
		list-style-type: none;
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
