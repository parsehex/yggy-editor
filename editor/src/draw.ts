import update from './update';
import drawScene from '../../src/draw-scene';

export default function draw() {
	drawScene();
	update();
}
