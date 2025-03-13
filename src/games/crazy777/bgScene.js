import Phaser from 'phaser';
import backgroundImg from '../../assets/crazy777/images/casinoBg.jpeg';
import crazyImg from '../../assets/crazy777/images/crazy777.png';
import volatilityFull from '../../assets/crazy777/images/volatilityFull.png';
import volatilityEmpty from '../../assets/crazy777/images/volatilityEmpty.png';
import arrowLeftImg from '../../assets/crazy777/images/arrowLeft.png';
import arrowRightImg from '../../assets/crazy777/images/arrowRight.png';
import img1 from '../../assets/crazy777/images/Rewards.png';
import img2 from '../../assets/crazy777/images/vip.png';
import img3 from "../../assets/crazy777/images/777.png";
import Continue from '../../assets/crazy777/images/Continue.png';
import bgMusic from '../../assets/crazy777/audio/crazy777.mp3';
// Scene 1
export class BgScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BgScene' }); // Unique key for the scene
    this.imageIndex = 0; // Current index of the carousel
    this.images = []; // Array to hold image keys
  }

  preload() {
    // Load assets
    this.load.image('background', backgroundImg);
    this.load.image('arrowLeft', arrowLeftImg);
    this.load.image('arrowRight', arrowRightImg);
    this.load.image('volatilityFull', volatilityFull);
    this.load.image('volatilityEmpty', volatilityEmpty);
    this.load.image('crazy777', crazyImg);
    this.load.image('Continue', Continue);

    //carousel
    this.load.image('image1', img1);
    this.load.image('image2', img2);
    this.load.image('image3', img3);

    //audio
    this.load.audio('bgMusic', bgMusic);

  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    // Add background
    this.add.sprite(width / 2, height / 2, 'background').setOrigin(0.5, 0.5).setDisplaySize(width, height);

    // Play music
    this.music = this.sound.add('bgMusic', { loop: true, volume: 0.8 });
    this.music.play();

    //title
    const title = this.add.sprite(width / 2, 50, 'crazy777').setOrigin(0.5, 0.5);

    //volatility
    const volatility = 2; // ie volatility value (1 to 5)

    // Add the text "Volatility: "
    const label = this.add.text(100, 80, 'Volatility: ', {
      fontSize: '24px',
      color: '#ffffff',
    });
    // Dynamically add images
    const startX = label.x + label.width + 10; // Start placing images to the right of the label
    const startY = label.y;

    for (let i = 0; i < 5; i++) {
      const texture = i < volatility ? 'volatilityFull' : 'volatilityEmpty';
      this.add.image(startX + i * 50, startY + 10, texture); // Adjust spacing and size
    }



    // Add images to the array
    this.images = ['image1', 'image2', 'image3'];

    // Create a container to hold the entire carousel
    this.carouselContainer = this.add.container(width/2, height/2); // Center the container at (400, 300)

    // Display the first image
    this.currentImage = this.add.sprite(0, 0, this.images[this.imageIndex]); // Position relative to container
    this.carouselContainer.add(this.currentImage);

    // Add left arrow
    const leftArrow = this.add.sprite(-300, 0, 'arrowLeft').setInteractive(); // Relative to container center
    leftArrow.on('pointerdown', () => this.changeImage(-1));
    this.carouselContainer.add(leftArrow);

    // Add right arrow
    const rightArrow = this.add.sprite(300, 0, 'arrowRight').setInteractive(); // Relative to container center
    rightArrow.on('pointerdown', () => this.changeImage(1));
    this.carouselContainer.add(rightArrow);

    // Auto-slide timer
    this.time.addEvent({
      delay: 3000, // Time between slides (ms)
      callback: () => this.changeImage(1),
      loop: true,
    });


    // Add a button to switch to Scene 2
    const switchButton = this.add.sprite(width / 2, height - 50, 'Continue', {
      // font: '24px Arial',
      // fill: '#ffffff',
    }).setOrigin(0.5, 0.5);

    switchButton.setInteractive();
    switchButton.on('pointerdown', () => {
      this.music.stop(); // Stop Scene 1 music
      this.scene.start('GameScene'); // Start Scene 2
    });


  }


  changeImage(direction) {
    // Calculate new index
    this.imageIndex = (this.imageIndex + direction + this.images.length) % this.images.length;

    // Update the image
    this.currentImage.setTexture(this.images[this.imageIndex]);
  }
}

