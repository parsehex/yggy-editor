import update from './update';
import drawScene from 'game/draw';

export default function draw() {
	drawScene();
	update();
}
