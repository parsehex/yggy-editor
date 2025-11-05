<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Images';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div id="upload">
			<div> Upload image file <br />
				<input type="text" class="name" placeholder="Image file name (or leave blank)" />
				<input type="file" />
				<button type="button" class="submit">Upload</button>
				<br /><br /> Preview <select class="image-file-preview-select"></select>
			</div>
			<div>
				<img id="image-file-preview" />
			</div>
		</div>
		<button type="button" class="create">Create image</button>
		<div class="list"></div>
	</div>
</template>
<style lang="scss">
#images-tab {
	div#upload {
		padding: 2px;
		margin: 3px;
		margin-top: 12px;
		margin-bottom: 15px;
		border: 1px solid;
		display: flex;

		input.name {
			width: 220px;
		}

		&>div {
			width: 49%;

			&:last-of-type {
				border-left: 1px solid;
			}
		}

		img#image-file-preview {
			max-height: 300px;
		}
	}

	.list {
		&>div {
			display: inline-block;
			width: 50%;
			border: 1px solid#90A4AE;
			padding: 4px;
		}

		img.image-preview {
			max-height: 100px;
			float: left;
			border: 1px solid;
			margin-right: 5px;
		}
	}
}
</style>
