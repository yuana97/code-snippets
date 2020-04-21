#!/bin/bash

# command: g++ - use the g++ compiler
# options:
#   -Wall : enables extra warning flags
#   -std=c++11 : compile c++11 code
#   -O0 : optimization level 0 (don't optimize the code)
#   -g : generate debug information
#   -o main : write the compiler output to a file called 'main'
#   -lglfw -lglew : use the glfw and glew libraries
#   -framework OpenGL : use the OpenGL framework
# argument:
#   main.cpp : the target file to compile
g++ -Wall -std=c++11 -O0 -g -o main -lglfw -lglew -framework OpenGL main.cpp