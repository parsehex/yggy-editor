import dialogue from '../data/dialogue';
import ChoiceButton from '../ChoiceButton';

interface Img {
  name: string;
  filename: string;
}
const images: Img[] = [
  { name: 'room', filename: 'blank-room.png' },
];

const choiceTextYStart = 325;
const choiceTextHeight = 35;

export class MainScene extends Phaser.Scene {
  private dialogueIndex = 0;
  private mainText: Phaser.GameObjects.Text;
  private choiceTexts: ChoiceButton[] = [];
  private bg: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload(): void {
    for (const img of images) {
      this.load.image(img.name, `./assets/images/${img.filename}`);
    }
  }

  create(): void {
    this.mainText = this.add.text(400, 200, '', {
      align: 'center',
      fontSize: '30px',
      stroke: 'black',
      fill: 'white',
      strokeThickness: 3,
      wordWrap: {
        width: +this.game.config.width - 75,
      },
    });

    this.bg = this.add.image(0, 0, '');
    this.bg.depth = -1;

    this.drawDialogue();
  }

  drawDialogue() {
    const d = dialogue[this.dialogueIndex];

    // draw main text
    this.mainText.text = d.text;
    this.mainText.x = (+this.game.config.width / 2) - (this.mainText.width / 2);

    // draw choices
    for (let i = 0; i < d.choices.length; i++) {
      if (!this.choiceTexts[i]) {
        const x = 400;
        const y = choiceTextYStart + (i * choiceTextHeight);
        const style = {
          fontSize: '20px',
          stroke: 'black',
          fill: 'white',
          strokeThickness: 2,
        };

        this.choiceTexts[i] = new ChoiceButton(this, x, y, '', 450, style);
        this.add.existing(this.choiceTexts[i]);
      }

      this.choiceTexts[i].text = d.choices[i].text;
      this.choiceTexts[i].x = +this.game.config.width / 2;

      this.choiceTexts[i].onClick(() => {
        this.dialogueIndex = d.choices[i].targetDialogueIndex;
        this.reset();
        this.drawDialogue();
      });
    }

    // draw background image
    if (d.image) {
      this.bg.setTexture(d.image);
      this.bg.setDisplaySize(+this.game.config.width, +this.game.config.height);
      this.bg.x = +this.game.config.width / 2;
      this.bg.y = +this.game.config.height / 2;
    }
  }

  reset() {
    this.mainText.text = '';
    for (const c of this.choiceTexts) {
      c.destroy();
    }
    this.choiceTexts.length = 0;
  }
}
