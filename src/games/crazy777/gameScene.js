import Phaser from 'phaser';
import backgroundImg from '../../assets/crazy777/images/casinoBg.jpeg'
import bgMusic from '../../assets/crazy777/audio/crazy777.mp3'


// Scene 2
export class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload() {
      // Load assets
      this.load.image('background', backgroundImg);
      this.load.audio('bgMusic', bgMusic);
    }
  
    create() {
        const width=this.scale.width; 
        const height=this.scale.height

      // Add background
      this.add.sprite(width/2, height/2, 'background').setOrigin(0.5,0.5).setDisplaySize(width,height);
  
      // Play music
      this.music = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
      this.music.play();
  
      // Add a button to switch back to Scene 1
    //   const switchButton = this.add.text(300, 500, 'Go to Scene 1', {
    //     font: '24px Arial',
    //     fill: '#ffffff',
    //   });
    //   switchButton.setInteractive();
    //   switchButton.on('pointerdown', () => {
    //     this.music.stop(); // Stop Scene 2 music
    //     this.scene.start('Scene1'); // Start Scene 1
    //   });
    }
  }