export default class DialogueText extends Phaser.GameObjects.Container {
	private textStr: string;
	private rectObject: Phaser.GameObjects.Rectangle;
	private textObject: Phaser.GameObjects.Text;

	constructor(scene: Phaser.Scene, text: string) {
		super(scene, 0, 0);
		scene.add.existing(this);

		this.textStr = text;

		const width = +scene.game.config.width;
		const height = +scene.game.config.height / 4.5;
		const x = width / 2;
		const y = +scene.game.config.height - (height / 2);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.rectObject = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0x111111, 0.5);

		const tX = -(width / 2) + 10;
		const tY = -(height / 2) + 5;
		this.textObject = new Phaser.GameObjects.Text(scene, tX, tY, this.textStr, {
			fontSize: '22px',
			stroke: 'black',
			color: 'white',
			strokeThickness: 2,
			wordWrap: {
				width: +scene.game.config.width - 75,
			},
		});

		this.add([this.rectObject, this.textObject]);
	}

	get text() { return this.textStr; }
	set text(s: string) {
		this.textStr = s;
		this.textObject.text = s;
	}
}
