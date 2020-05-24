Tetris

All credit to FamTrinli who made this youtube tutorial: https://www.youtube.com/watch?v=zH_omFPqMO4

# Table of contents
1. [Setup](#setup)
1. [Tiles](#tiles)
1. [Movement](#move)
1. [Polish](#polish)

## Setup <a name="setup"></a>

1. Install SFML https://www.youtube.com/watch?v=XEGLsHp2bw0
1. write make.sh https://pastebin.com/buiAJkmX
1. copy the images directory
1. create starter main.cpp https://pastebin.com/VpEbZAV6
1. bash make.sh
    1. click resulting 'main' file, you should see a blank rectangular window.

## Tiles <a name="tiles"></a>

1. main.cpp: add code to draw tiles.png texture https://pastebin.com/mu7csFf9
    1. recompile, see the tiles painted on screen
1. main.cpp: grab the blue square of the tiles texture https://pastebin.com/10p5yREq
    1. recompile, see blue square only
1. main.cpp: add data to encode tiles and draw the T tile https://pastebin.com/cmDuRQhV
    1. recompile, see T tiles rendered

## Movement <a name="move"></a>

1. main.cpp: add event handlers to move horizontally/rotate the tile https://pastebin.com/Qek7CWZj
    1. recompile, move/rotate block with arrow keys
1. main.cpp: add timer to drop the block https://pastebin.com/dae452s1
    1. recompile, watch block fall
1. main.cpp: add collision detection and generalize drawing logic https://pastebin.com/AGjLH1Kq
    1. recompile, you can play a mini tetris now

## Polish <a name="polish"></a>

1. main.cpp: add event trigger to speed up falling, and randomly choose colors of incoming blocks https://pastebin.com/sBgmmfE0
    1. recompile, blocks should be randomly colored and you can drop them with arrow down
1. main.cpp: add line destruction https://pastebin.com/QE8WPjip
    1. recompile, making lines should delete lines
1. main.cpp: Add a beautiful background image and frame https://pastebin.com/6uZaKxRV
    1. recompile, your game should look beautiful.

## Todos <a name="todo"></a>

https://drive.google.com/open?id=1h4v9F-lqritzupAC4bHdM9kwG9jqBBny

Congrats you've finished tetris! Todos: 

1. Fix bug with the single starting square
1. Fix bug that we have to use absolute paths. might be a mac thing or something is configured wrong in the ide or makefile
1. Add some features:
    1. Keep score
    1. Shadow block
    1. Multiplayer
    1. etc.
