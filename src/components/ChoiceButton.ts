const TARGET_WIDTH = 400;
const PADDING = 4;
const TEXT_STYLE: Phaser.Types.GameObjects.Text.TextSyle = {
	align: 'center',
	fontSize: '20px',
	stroke: 'black',
	color: 'white',
	strokeThickness: 2,
	wordWrap: {
		width: TARGET_WIDTH - PADDING,
	},
};
const BG_COLOR = 0x000000;
const BG_HOVER_COLOR = 0x3f3f3f;

export default class ChoiceButton extends Phaser.GameObjects.Container {
	private textStr: string;
	private onClickListener: () => void;
	private rectObject: Phaser.GameObjects.Rectangle;
	private textObject: Phaser.GameObjects.Text;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		text: string
	) {
		super(scene, x, y);
		scene.add.existing(this);

		this.textStr = text;

		this.rectObject = new Phaser.GameObjects.Rectangle(scene, 0, 0, TARGET_WIDTH, 0, BG_COLOR);
		this.textObject = new Phaser.GameObjects.Text(scene, PADDING / 2, PADDING / 2, this.textStr, TEXT_STYLE);
		this.add([this.rectObject, this.textObject]);

		this.resize();

		this.rectObject.setInteractive();
		this.rectObject.addListener('pointerdown', () => {
			if (!this.onClickListener) return;
			this.onClickListener();
		});
		this.rectObject.addListener('pointerover', () => {
			this.rectObject.fillColor = BG_HOVER_COLOR;
		});
		this.rectObject.addListener('pointerout', () => {
			this.rectObject.fillColor = BG_COLOR;
		});
	}

	private resize() {
		this.rectObject.height = this.textObject.height + PADDING;
		this.textObject.x = -(this.textObject.width / 2);

		this.rectObject.setSize(this.rectObject.width, this.rectObject.height);
		if (this.rectObject.input) {
			this.rectObject.input.hitArea.setSize(this.rectObject.width, this.rectObject.height);
		}
	}

	get height() { return this.rectObject.height; }
	get width() { return this.rectObject.width; }

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
