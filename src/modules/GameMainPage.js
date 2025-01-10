import Phaser from 'phaser';
import React, { useEffect, useRef } from 'react';
import GameMainClass from './GameMainClass';

const GameMainPage = () => {
   const gameContainer = useRef(null);

   useEffect(() => {
      const config = {
         type: Phaser.AUTO,
         parent: gameContainer.current,
         width: 720, // 540
         height: 1280, //  960
         physics: {
            default: 'arcade',
            arcade: {
               gravity: { y: 200 },
               debug: false,
            },
         },
         scene: [GameMainClass],
         scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
         },
      };

      const phaserGame = new Phaser.Game(config);

      return () => {
         phaserGame.destroy(true);
      };
   }, []);

   return (
      <div
         ref={gameContainer}
         style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
         }}
      />
   );
};

export default GameMainPage;
