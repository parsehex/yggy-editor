import update from './update';
import drawScene from 'game/draw-scene';

export default function draw() {
	drawScene();
	update();
}
