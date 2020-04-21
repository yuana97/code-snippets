// import stdio and rendering libraries
#include <cstdio>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

// given an error, put it into the error buffer
#define GL_ERROR_CASE(glerror) \
  case glerror:                \
    snprintf(error, sizeof(error), "%s", #glerror)

// while there are errors, print error, which file it came from, and which line of code.
inline void gl_debug(const char *file, int line)
{
  GLenum err;
  while ((err = glGetError()) != GL_NO_ERROR)
  {
    char error[128];
    // put error description in the buffer
    switch (err)
    {
      GL_ERROR_CASE(GL_INVALID_ENUM);
      break;
      GL_ERROR_CASE(GL_INVALID_VALUE);
      break;
      GL_ERROR_CASE(GL_INVALID_OPERATION);
      break;
      GL_ERROR_CASE(GL_INVALID_FRAMEBUFFER_OPERATION);
      break;
      GL_ERROR_CASE(GL_OUT_OF_MEMORY);
      break;
    default:
      snprintf(error, sizeof(error), "%s", "UNKNOWN_ERROR");
      break;
    }
    // print "error - file: line\n"
    fprintf(stderr, "%s - %s: %d\n", error, file, line);
  }
}

#undef GL_ERROR_CASE

// callback to print errors to console
void error_callback(int error, const char *description)
{
  fprintf(stderr, "Error: %s\n", description);
}

// play the game
int main(int argc, char *argv[])
{
  // on error, print errors to console
  glfwSetErrorCallback(error_callback);

  // initialize glfw. if it fails, exit the program.
  if (!glfwInit())
  {
    return -1;
  }

  // create a 640x480 window titled "Space Invaders"
  GLFWwindow *window = glfwCreateWindow(640, 480, "Space Invaders", NULL, NULL);
  // window doesn't render => close the program
  if (!window)
  {
    glfwTerminate();
    return -1;
  }
  // bind OpenGL calls to this window (allows us to draw on this window)
  glfwMakeContextCurrent(window);

  // initialize GLEW so we can make OpenGL calls. Print an error and close the window if it fails
  GLenum err = glewInit();
  if (err != GLEW_OK)
  {
    fprintf(stderr, "Error initializing GLEW.\n");
    glfwTerminate();
    return -1;
  }

  // if we see the below log statements, we've successfully attached OpenGL to the window
  // query the openGL version
  int glVersion[2] = {-1, 1};
  glGetIntegerv(GL_MAJOR_VERSION, &glVersion[0]);
  glGetIntegerv(GL_MINOR_VERSION, &glVersion[1]);

  gl_debug(__FILE__, __LINE__);

  // print some information about our version of OpenGL.
  printf("Using OpenGL: %d.%d\n", glVersion[0], glVersion[1]);
  printf("Renderer used: %s\n", glGetString(GL_RENDERER));
  printf("Shading Language: %s\n", glGetString(GL_SHADING_LANGUAGE_VERSION));

  // set the buffer clear color to red (rgba code)
  glClearColor(1.0, 0.0, 0.0, 1.0);
  // persist the window until user closes it
  while (!glfwWindowShouldClose(window))
  {
    // 'buffer' means an image which can be displayed on the screen
    // OpenGL has a 'front buffer' which is displayed on the screen and a 'back buffer'
    // which is used for drawing.

    // every tick, clear the front buffer and swap in the back buffer
    glClear(GL_COLOR_BUFFER_BIT);
    glfwSwapBuffers(window);
    // process pending events (for example, clicking the close button)
    glfwPollEvents();
  }

  // clean up our program and exit
  glfwDestroyWindow(window);
  glfwTerminate();
  return 0;
}