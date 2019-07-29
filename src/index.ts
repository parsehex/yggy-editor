import './events';
import state from './state';
import drawScene from './draw-scene';
import { initElements } from './elements';

window.addEventListener('load', () => {
  // draw the game
  state.currentDialogueIndex = 0;

  initElements();

  drawScene();
});
