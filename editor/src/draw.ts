import updateActiveTab from './update-tab';
import drawScene from 'game/draw';

export default function draw() {
	// not totally sure why this helps
	// without it the dom diffing i think acts strange
	setTimeout(() => {
		drawScene();
		// updateActiveTab();
	}, 0);
}
