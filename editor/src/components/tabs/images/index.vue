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
