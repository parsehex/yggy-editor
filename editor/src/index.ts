import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const appDiv = document.getElementById('app');

if (!appDiv) {
	throw new Error('Could not find #app element');
}

const app = createApp(App);
app.use(createPinia());

app.mount(appDiv);

// blank component:
// <script setup lang="ts">
// //
// </script>

// <template>
// 	<!--  -->
// </template>
