<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';
import getData from 'game/data/get';
import data from 'game/data';
</script>
<template>
	<h3>Choices</h3>
	<div class="choices">
		<!--  -->
	</div>
</template>
<style scoped>
h3 {
	border-bottom: 1px dashed gray;
}

div.choices>div:not(:last-of-type) {
	padding-bottom: 4px;
	margin: 0.25em 0;

	display: flex;
}
</style>
