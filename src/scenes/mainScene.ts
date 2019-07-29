import dialogue from '../data/dialogue';
import images from '../data/images';
import DialogueText from '../components/DialogueText';
import ChoicesManager from '../components/ChoicesManager';
import characters from '../data/characters';

export class MainScene extends Phaser.Scene {
  private dialogueIndex = 0;
  private mainText: DialogueText;
  private bg: Phaser.GameObjects.Image;
  private choices: ChoicesManager;
  private char: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload(): void {
    // load scene images
    for (const img of images) {
      this.load.image(img.name, `./assets/images/${img.filename}`);
    }

    // load character images
    for (const ch of characters) {
      this.load.image(ch.name, `./assets/images/${ch.imageFilename}`);
    }
  }

  create(): void {
    this.mainText = new DialogueText(this);

    const baseX = this.game.canvas.width - (350 / 2);
    const baseY = this.mainText.y - (this.mainText.height / 2);
    this.choices = new ChoicesManager(this, baseX, baseY);

    this.bg = this.add.image(0, 0, '');
    this.char = this.add.image(0, 0, '');
    this.bg.depth = -2;
    this.char.depth = -1;

    this.drawDialogue();
  }

  drawDialogue() {
    const d = dialogue[this.dialogueIndex];

    // draw main text
    this.mainText.text = d.text;
    this.mainText.setCharacter(d.character);

    // draw character image
    this.char.setTexture(d.character);

    const charWidth = this.game.canvas.height * this.char.displayWidth / this.char.displayHeight;
    this.char.displayHeight = this.game.canvas.height;
    this.char.displayWidth = charWidth;
    this.char.y = this.char.displayHeight / 2;
    this.char.x = this.char.displayWidth / 2;

    // draw choices
    for (let i = 0; i < d.choices.length; i++) {
      this.choices.addChoice(d.choices[i].text, () => {
        this.dialogueIndex = d.choices[i].targetDialogueIndex;
        if (!dialogue[this.dialogueIndex]) {
          throw new Error('Choice leads to non-existent dialogue');
        }

        this.reset();
        this.drawDialogue();
      });
    }

    // draw background image
    if (d.image) {
      this.bg.setTexture(d.image);
      this.bg.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
      this.bg.x = this.game.canvas.width / 2;
      this.bg.y = this.game.canvas.height / 2;
    }
  }

  reset() {
    this.mainText.text = '';
    this.choices.clearChoices();
  }
}
