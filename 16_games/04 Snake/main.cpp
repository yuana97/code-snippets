#include <SFML/Graphics.hpp>
#include <time.h>
using namespace sf;

int N = 30, M = 20;
int size = 16;
int w = size * N;
int h = size * M;

int dir, num = 4; // direction, size of snake

struct Snake
{ int x, y; } s[100]; // snake = array of points

struct Fruit
{ int x,y; } f;

// move the snake
void Tick()
{
  for (int i = num; i > 0; --i) // move snake body
  {
    s[i].x = s[i-1].x;
    s[i].y = s[i-1].y;
  }

  // move snake head
  if (dir == 0) s[0].y += 1;
  if (dir == 1) s[0].x -= 1;
  if (dir == 2) s[0].x += 1;
  if (dir == 3) s[0].y -= 1;

  // eat fruit => grow snake and regenerate fruit
  if ((s[0].x == f.x) && (s[0].y == f.y))
  {
    num++;
    f.x = rand() % N;
    f.y = rand() % M;
  }

  // reflect the snake when it goes through sides
  if (s[0].x > N) s[0].x = 0; if (s[0].x < 0) s[0].x = N;
  if (s[0].y > M) s[0].y = 0; if (s[0].y < 0) s[0].y = M;

  // chop the snake when it collides with itself
  for (int i = 1; i < num; i++)
    if (s[0].x == s[i].x && s[0].y == s[i].y) num = i;
}

int main()
{
  srand(time(0)); // seed rng
  RenderWindow window(VideoMode(w, h), "Snake Game!");

  Texture t1,t2,t3;
  t1.loadFromFile("/Users/alleyuan/code-snippets/16_games/04 Snake/images/white.png");
  t2.loadFromFile("/Users/alleyuan/code-snippets/16_games/04 Snake/images/red.png");
  t3.loadFromFile("/Users/alleyuan/code-snippets/16_games/04 Snake/images/green.png");

  Sprite sprite1(t1);
  Sprite sprite2(t2);
  Sprite sprite3(t3);

  Clock clock; // timer
  float timer = 0, delay = 0.1;

  // coords of first fruit
  f.x = 10;
  f.y = 10;

  // game loop
  while(window.isOpen())
  {
    float time = clock.getElapsedTime().asSeconds(); // set timer
    clock.restart();
    timer += time;

    // event handlers
    Event e;
    while (window.pollEvent(e))
    {
      // window close
      if (e.type == Event::Closed)
        window.close();
    }

    // movement event handlers
    if (Keyboard::isKeyPressed(Keyboard::Left)) dir = 1;
    if (Keyboard::isKeyPressed(Keyboard::Right)) dir = 2;
    if (Keyboard::isKeyPressed(Keyboard::Up)) dir = 3;
    if (Keyboard::isKeyPressed(Keyboard::Down)) dir = 0;

    // move the snake every <delay> seconds
    if (timer > delay) {
      timer = 0;
      Tick();
    }

    window.clear();

    // DRAW
    for (int i = 0; i < N; i++) // draw game grid
      for (int j = 0; j < M; j++)
        { sprite1.setPosition(i*size,j*size); window.draw(sprite1); }

    for (int i = 0; i < num; i++) // draw snake
    {
      sprite2.setPosition(s[i].x*size, s[i].y*size);
      window.draw(sprite2);
    }

    sprite3.setPosition(f.x * size, f.y*size);
    window.draw(sprite3);

    window.display();
  }

  return 0;
}