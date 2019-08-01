import updateActiveTab from './update-tab';
import drawScene from 'game/draw';

export default function draw() {
	drawScene();
	updateActiveTab();
}
