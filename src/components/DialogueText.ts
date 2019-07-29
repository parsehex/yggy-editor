const BG_COLOR = 0x111111;
const BG_ALHPA = 0.8;

export default class DialogueText extends Phaser.GameObjects.Container {
	private textStr = '';
	private rectObject: Phaser.GameObjects.Rectangle;
	private textObject: Phaser.GameObjects.Text;
	private charName: Phaser.GameObjects.Text;

	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0);
		scene.add.existing(this);

		const width = scene.game.canvas.width;
		const height = scene.game.canvas.height / 4.5;
		const x = width / 2;
		const y = scene.game.canvas.height - (height / 2);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.rectObject = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, BG_COLOR, BG_ALHPA);

		const tX = -(width / 2) + 10;
		const tY = -(height / 2) + 5;

		this.charName = new Phaser.GameObjects.Text(scene, tX, tY, '', {
			fontSize: '14px',
			// stroke: 'black',
			color: 'white',
			// strokeThickness: 2,
			wordWrap: {
				width: scene.game.canvas.width - 75,
			},
		});

		this.textObject = new Phaser.GameObjects.Text(scene, tX, tY + 20, this.textStr, {
			fontSize: '22px',
			stroke: 'black',
			color: 'white',
			strokeThickness: 2,
			wordWrap: {
				width: scene.game.canvas.width - 75,
			},
		});

		this.add([this.rectObject, this.charName, this.textObject]);
	}

	public setCharacter(name: string) {
		this.charName.text = name;
	}

	get text() { return this.textStr; }
	set text(s: string) {
		this.textStr = s;
		this.textObject.text = s;
	}
}
