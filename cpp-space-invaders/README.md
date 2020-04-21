Credit to Nick Tasios for his guide here: http://nicktasios.nl/posts/space-invaders-from-scratch-part-1.html

# Space Invaders From Scratch - Coding Guide
I've decomposed the project into several main step. Within each main step there are detailed steps for how to complete it. Each step should have the final code of the affected file and each substep should contain the corresponding code snippets.

# Table of contents
0. [Setup](#setup)
1. [Create a window](#window)

## Setup (MacOS) <a name="setup"></a>
Source: https://www.youtube.com/watch?v=Tz0dq2krCW8
If you're on Windows, set up Windows Subsystem For Linux https://www.windowscentral.com/install-windows-subsystem-linux-windows-10 and run the commands in your linux subsystem.

1. Setup glew and glfw:
    1. Install homebrew https://brew.sh/
    2. cd /usr/local && sudo chmod -R a+rXw * (go to binaries, change permissions of all files so all users get Read, eXecute, Write permissions)
    3. brew install glew && brew install glfw3
1. Setup IDE
    1. Install VS Code https://code.visualstudio.com/
    2. Install C/C++ plugin

## Create a game window <a name="window"></a>
Image: https://drive.google.com/open?id=1x1gkS-EUPpUbFIbky7bppJU1Ub6MuAZl
Final code: https://github.com/Grieverheart/space_invaders/blob/4ebf869c7bd1c7541a5db80f3f8d52fc62e1f389/main.cpp

1. main.cpp: Create a window https://pastebin.com/vvD8nLTb
    1. Initialize GLFW, create window, set context to the window https://pastebin.com/zTSTnQS9
    2. Initialize GLEW, make some OpenGL calls https://pastebin.com/2Mcdge0h
1. Create a game loop to persist the window https://pastebin.com/QEznDjBQ
    1. Until the window receives a 'close' event, we should swap the front and back buffers and thereby display something on the screen. https://pastebin.com/K0JWREFr
    2. Once the window receives a 'close' event, clean up our program. https://pastebin.com/ZJ1fWA8S
1. Add GL debugging logs https://pastebin.com/rpnJe00k
    1. Create a gl_debug function to catch and print all gl errors, then add it to main. https://pastebin.com/b43y58cd
1. make.sh: write a make script to compile the game https://pastebin.com/mEYGpfq8
    1. Once that's done, cd to your game directory and run bash make.sh
    2. This creates a main.exe file. Navigate to your game directory and double click main.exe.
    3. You should see the game window appear: https://drive.google.com/open?id=1x1gkS-EUPpUbFIbky7bppJU1Ub6MuAZl

