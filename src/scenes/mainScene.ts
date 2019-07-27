import ChoiceButton from '../ChoiceButton';
import dialogue from '../data/dialogue';
import images from '../data/images';
import DialogueText from '../DialogueText';

const choiceTextYStart = 75; // relative to mainText
const choiceTextHeight = 30;

export class MainScene extends Phaser.Scene {
  private dialogueIndex = 0;
  private mainText: DialogueText;
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
    this.mainText = new DialogueText(this, '');

    // TODO NOTE hardcoded limit of 3 choices
    const textStyle = {
      fontSize: '20px',
      stroke: 'black',
      fill: 'white',
      strokeThickness: 2,
    };
    for (let i = 3; i >= 0; i--) {
      const choiceWidth = 350;
      const x = +this.game.config.width - (choiceWidth / 2);
      const y = this.mainText.y - (choiceTextHeight * i) - (this.mainText.height / 2);
      const choice = new ChoiceButton(this, x, y, '', choiceWidth, textStyle);
      choice.setVisible(false);
      this.choiceTexts.push(choice);
    }

    this.bg = this.add.image(0, 0, '');
    this.bg.depth = -1;

    this.drawDialogue();
  }

  drawDialogue() {
    const d = dialogue[this.dialogueIndex];

    // draw main text
    this.mainText.text = d.text;

    // draw choices
    for (let i = 0; i < d.choices.length; i++) {
      // if (!this.choiceTexts[i]) {
      //   const x = 400;
      //   const y = (this.mainText.y + choiceTextYStart) + (i * choiceTextHeight);

      //   this.choiceTexts[i] = new ChoiceButton(this, x, y, '', 450, style);
      // }
      this.choiceTexts[i].text = d.choices[i].text;
      // this.choiceTexts[i].x = +this.game.config.width / 2;

      this.choiceTexts[i].onClick(() => {
        this.dialogueIndex = d.choices[i].targetDialogueIndex;
        this.reset();
        this.drawDialogue();
      });

      this.choiceTexts[i].setVisible(true);
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
      c.setVisible(false);
    }
  }
}
