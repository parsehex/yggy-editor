<script setup lang="ts">
import TabsList from 'components/header/TabsList.vue';
import Controls from 'components/header/Controls.vue';
</script>
<template>
	<div id="header">
		<Controls />
		<TabsList />
	</div>
</template>
<style lang="scss">
div#editor>div#header {
	width: 100%;
	height: 100%;
	padding-left: 5px;
	padding-top: 3px;

	div#controls button {
		font-size: 1em;
	}
}

div#header button#push {
	margin-left: 10px;
}

div#header button#save,
div#header button#push,
div#header button#pull,
div#header button#clear {
	border: 0;

	&.active {
		background-color: #212121;
		color: #9e9e9e;
	}

	&[disabled] {
		background-color: #eeeeee;
		color: #bdbdbd;
	}
}
</style>
