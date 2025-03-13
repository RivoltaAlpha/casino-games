import Phaser from 'phaser';
import { useEffect } from 'react';
import { BgScene } from './bgScene';
import { GameScene } from './gameScene';

const Crazy777 = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            scene: [BgScene,GameScene] ,
            audio: {
                disableWebAudio: false,
            },
            // scale: {
            //     mode: Phaser.Scale.FIT, // Ensures the game fits within the available space
            //     //autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the game
            // },
        };

        const game = new Phaser.Game(config);

        // Cleanup on component unmount
        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div>
            <div id="phaser-game" />
        </div>
    );
};

export default Crazy777;
