#include <SFML/Graphics.hpp>
#include <time.h>
using namespace sf;

int main()
{
  srand(time(0));

  RenderWindow app(VideoMode(480, 480), "Minesweeper");

  int w = 32; // width of a texture rectangle
  int grid[12][12]; // grid, encoded by index of rectangle in tiles.jpg to display
  int sgrid[12][12]; // shown grid

  // load texture/sprite
  Texture t;
  t.loadFromFile("/Users/alleyuan/code-snippets/16_games/05 Minesweeper/images/tiles.jpg");
  Sprite s(t);

  // set initial state of sgrid and grid
  for (int i = 1; i <= 10; i++)
  for (int j = 1; j <= 10; j++)
  {
    sgrid[i][j] = 10; // all squares untouched to the player
    if (rand()%5 == 0) grid[i][j] = 9; // 1/5 chance of placing a mine
    else (grid[i][j]) = 0; // else set an empty grid
  }

  // set mine counts
  for (int i = 1; i <= 10; i++)
  for (int j = 1; j <= 10; j++)
  {
    int n = 0;
    if (grid[i][j] == 9) continue;
    if (grid[i+1][j] == 9) n++;
    if (grid[i][j+1] == 9) n++;
    if (grid[i-1][j] == 9) n++;
    if (grid[i][j-1] == 9) n++;
    if (grid[i+1][j+1] == 9) n++;
    if (grid[i-1][j-1] == 9) n++;
    if (grid[i-1][j+1] == 9) n++;
    if (grid[i+1][j-1] == 9) n++;
    grid[i][j] = n;
  }

  while (app.isOpen()) // game loop
  {
    // grab the mouse location in the grid
    Vector2i pos = Mouse::getPosition(app);
    int x = pos.x/w;
    int y = pos.y/w;

    // event handlers
    Event e;
    while (app.pollEvent(e))
    {
      // close window
      if (e.type == Event::Closed)
        app.close();

      // reveal/flag grids in response to clicks
      if (e.type == Event::MouseButtonPressed)
        if (e.key.code == Mouse::Left) sgrid[x][y] = grid[x][y];
        else if (e.key.code == Mouse::Right) sgrid[x][y] = 11;
    }

    // redraw sgrid
    app.clear(Color::White);
    for (int i = 1; i <= 10; i++)
    for (int j = 1; j <= 10; j++)
    {
      if (sgrid[x][y] == 9) sgrid[i][j] = grid[i][j]; // on clicking a mine, reveal the whole grid (game over)
      s.setTextureRect(IntRect(sgrid[i][j]*w,0,w,w)); // paint the sgrid[i][j]th rectangle
      s.setPosition(i*w, j*w);
      app.draw(s);
    }

    app.display();
  }

  return 0;
}