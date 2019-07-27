export default class ChoiceButton extends Phaser.GameObjects.Container {
	private textStr: string;
	private targetWidth: number;
	private onClickListener: () => void;
	private rectObject: Phaser.GameObjects.Rectangle;
	private textObject: Phaser.GameObjects.Text;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		text: string,
		targetWidth: number,
		textStyle: Phaser.Types.GameObjects.Text.TextSyle
	) {
		super(scene, x, y);

		textStyle.align = 'center';
		textStyle.wordWrap = {
			width: targetWidth,
		};

		this.textStr = text;
		this.targetWidth = targetWidth;

		this.rectObject = new Phaser.GameObjects.Rectangle(scene, 0, 0, targetWidth, 0, 0xffffff);
		this.textObject = new Phaser.GameObjects.Text(scene, 0, 0, this.textStr, textStyle);
		this.add(this.rectObject);
		this.add(this.textObject);

		this.rectObject.fillColor = 0xffffff;

		this.resize();

		this.rectObject.setInteractive();
		this.rectObject.addListener('pointerdown', () => {
			if (!this.onClickListener) return;
			this.onClickListener();
		});
		this.rectObject.addListener('pointerover', () => {
			this.rectObject.fillColor = 0xdddddd;
		});
		this.rectObject.addListener('pointerout', () => {
			this.rectObject.fillColor = 0xffffff;
		});
	}

	private resize() {
		this.rectObject.height = this.textObject.height;
		this.textObject.x = -(this.textObject.width / 2);
		this.rectObject.setSize(this.rectObject.width, this.rectObject.height);
	}

	get text() { return this.textStr; }
	set text(s: string) {
		this.textStr = s;
		this.textObject.text = s;
		this.resize();
	}

	public onClick(callback: () => void) {
		this.onClickListener = callback;
	}
}
