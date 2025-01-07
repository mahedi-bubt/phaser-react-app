// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';
// import { GameMainClass } from './GameMainClass';

// const GameMainPage = () => {
//    const gameContainer = useRef(null);

//    useEffect(() => {
//       const config = {
//          type: Phaser.AUTO,
//          width: 1200,
//          height: 800,
//          physics: {
//             default: 'arcade',
//             arcade: {
//                gravity: { y: 300 },
//                debug: false,
//             },
//          },
//          scene: [GameMainClass],
//          parent: gameContainer.current, // Attach Phaser game to this container
//       };

//       const game = new Phaser.Game(config);

//       return () => {
//          game.destroy(true); // Destroy Phaser instance when unmounting
//       };
//    }, []);

//    return <div ref={gameContainer} />;
// };

// export default GameMainPage;

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { GameMainClass } from './GameMainClass';

const GameMainPage = () => {
   const gameContainer = useRef(null);
   const [game, setGame] = useState(null); // Keep track of the game instance
   const [showStartButton, setShowStartButton] = useState(true); // Toggle button visibility

   useEffect(() => {
      const handleResize = () => {
         if (game) {
            game.scale.resize(window.innerWidth, window.innerHeight);
         }
      };

      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
         if (game) game.destroy(true);
      };
   }, [game]);

   const startGame = () => {
      setShowStartButton(false); // Hide start button

      const config = {
         type: Phaser.AUTO,
         width: window.innerWidth,
         height: window.innerHeight,
         physics: {
            default: 'arcade',
            arcade: {
               gravity: { y: 300 },
               debug: false,
            },
         },
         scene: [GameMainClass],
         parent: gameContainer.current,
         scale: {
            mode: Phaser.Scale.ENVELOP, // Maintain aspect ratio (9:16)
            autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
         },
      };

      const phaserGame = new Phaser.Game(config);
      setGame(phaserGame);

      phaserGame.events.on('gameOver', () => {
         setShowStartButton(true); // Show button when game ends
      });
   };

   return (
      <div>
         {showStartButton && (
            <button
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '20px 40px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  zIndex: 10,
               }}
               onClick={startGame}
            >
               Start Game
            </button>
         )}
         <div ref={gameContainer} style={{ width: '100%', height: '100%' }} />
      </div>
   );
};

export default GameMainPage;
