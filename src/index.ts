import './events';
import state from './state';
import drawScene from './draw-scene';
import { initElements } from './elements';
import { loadData } from './data';

window.addEventListener('load', async () => {
  // draw the game
  await loadData();

  state.currentDialogueIndex = 0;
  initElements();

  drawScene();
});
