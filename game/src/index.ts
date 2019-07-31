import state from './state';
import drawScene from './draw-scene';
import { initElements } from './elements';
import { loadData } from './data';
import { initEvents } from './events';

window.addEventListener('load', async () => {
  // draw the game
  await loadData();

  // TODO
  state.currentDialogueID = 0;
  initElements();
  initEvents();

  drawScene();
});
