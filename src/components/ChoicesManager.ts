import ChoiceButton from './ChoiceButton';

const CHOICE_MARGIN = 5;

/*
	This is a manager and not a Phaser Container because if it was a Container then it
	would need to update its position and size according to the current choices which
	doesn't really have any benefit right now.
*/
export default class ChoicesManager {
	private scene: Phaser.Scene;
	private choiceObjects: ChoiceButton[] = [];
	private baseX: number;
	private baseY: number;

	constructor(scene: Phaser.Scene, baseX: number, baseY: number) {
		this.scene = scene;
		this.baseX = baseX;
		this.baseY = baseY;
	}

	public clearChoices() {
		for (const c of this.choiceObjects) {
			c.setVisible(false);
		}
	}

	/**
	 * Add a new choice to the stack.
	 */
	public addChoice(text: string, listener: () => void) {
		const c = this.getFreeChoice();
		c.text = text;
		c.onClick(listener);
		c.setVisible(true);

		this.reflowChoices();
	}

	/**
	 * Returns a ChoiceButton that isn't currently being used.
	 * Creates one if none are available.
	 * 
	 * Don't forget get to call `.setVisible(true)`
	 */
	private getFreeChoice() {
		for (const c of this.choiceObjects) {
			if (c.visible) continue;
			return c;
		}

		const c = new ChoiceButton(this.scene, 0, 0, '');
		this.choiceObjects.unshift(c);

		return c;
	}

	/** Updates all choice positions if necessary */
	private reflowChoices() {
		for (let i = 0; i < this.choiceObjects.length; i++) {
			const c = this.choiceObjects[i];
			if (!c.visible) continue;

			const baseY = i > 0 ? this.choiceObjects[i - 1].y : this.baseY;

			c.x = this.baseX;
			c.y = baseY - ((c.height) + CHOICE_MARGIN);
		}
	}
}
