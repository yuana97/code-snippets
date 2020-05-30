Micro Machines (Top Down Car Racing)

2d car racing

All credit to FamTrinli who made this youtube tutorial: https://www.youtube.com/watch?v=YzhhVHb0WVY

# Table of contents
1. [Setup](#setup)
1. [Game](#game)

## Setup <a name="setup"></a>

1. Install SFML https://www.youtube.com/watch?v=XEGLsHp2bw0
1. write make.sh https://pastebin.com/buiAJkmX
1. copy the images directory

## Game <a name="game"></a>

1. main.cpp: render car and racetrack https://pastebin.com/jjD6nkju
    1. bash make.sh, open main, see the drawn canvas.
1. main.cpp: add car movement w/ acceleration, angular velocity, and friction https://pastebin.com/tt9cQw8R
    1. recompile, you shoudl be able to move the car with the arrow keys.
1. main.cpp: add camera tracking for the car https://pastebin.com/XsTatC3U
    1. recompile, watch the camera follow the car.
1. main.cpp: fix the camera centering and increase the turn rate https://pastebin.com/kPfzX5sB
    1. recompile, watch the camera follow the car.
1. main.cpp: Generalize the car data into a struct. Add computer-controlled car opponents. https://pastebin.com/AwAz2aiU
    1. recompile, watch the computer cars race forward (off the map)
1. main.cpp: Add angular velocity to the move method. https://pastebin.com/n9xs6aLU
    1. recompile, watch the ai cars move in a circle.
1. main.cpp: Add collision detection to nudge colliding cars away from each other. https://pastebin.com/0xpRxKtw
    1. recompile, collide your car with the ais, watch it be bumped aside.
1. main.cpp: Implement some wayfinding logic for the ai cars. https://pastebin.com/mTkU7BL7
    1. recompile, watch the ai cars move in a triangle.
1. main.cpp: Implement smooth turning for the ai cars https://pastebin.com/vuzb0A0H
    1. recompile, watch the ai cars smoothly move between the triangle waypoints.
1. main.cpp: Increase the map size and add the correct waypoints. https://pastebin.com/VHL4viZP
    1. recompile, race your ai opponents!

## Done
