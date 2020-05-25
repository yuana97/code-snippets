#include <SFML/Graphics.hpp>
#include <time.h>
using namespace sf;

bool isCollide(Sprite s1,Sprite s2)
{ return s1.getGlobalBounds().intersects(s2.getGlobalBounds()); }

int main()
{
  srand(time(0)); // seed time

  RenderWindow app(VideoMode(520, 450), "Arkanoid Game!");
  app.setFramerateLimit(60);

  // load textures
  Texture t1,t2,t3,t4;
  t1.loadFromFile("/Users/alleyuan/code-snippets/16_games/03 Arkanoid/images/block01.png");
  t2.loadFromFile("/Users/alleyuan/code-snippets/16_games/03 Arkanoid/images/background.jpg");
  t3.loadFromFile("/Users/alleyuan/code-snippets/16_games/03 Arkanoid/images/ball.png");
  t4.loadFromFile("/Users/alleyuan/code-snippets/16_games/03 Arkanoid/images/paddle.png");

  // set sprite positions
  Sprite sBackground(t2), sBall(t3), sPaddle(t4);
  sPaddle.setPosition(300, 440);
  sBall.setPosition(300,300);

  Sprite block[1000]; // blocks

  int n = 0; // set block positions
  for (int i = 1; i <= 10; i++)
  for (int j = 1; j <= 10; j++)
  {
    block[n].setTexture(t1);
    block[n].setPosition(i*43,j*20);
    n++;
  }

  float dx=6, dy=5; // frame by frame delta

  // game loop
  while (app.isOpen())
  {
    // event handlers
    Event e;
    while (app.pollEvent(e))
    {
      // window closure
      if (e.type == Event::Closed)
        app.close();
    }

    sBall.move(dx,0); // move ball by delta
    for (int i = 0; i < n; i++) // delete collided blocks and reflect ball
      if (isCollide(sBall,block[i])) { block[i].setPosition(-100,0); dx = -dx; }

    sBall.move(0,dy); // move ball by delta
    for (int i = 0; i < n; i++) // delete collided blocks and reflect ball
      if (isCollide(sBall,block[i])) { block[i].setPosition(-100,0); dy = -dy; }

    // reflect ball off sides
    Vector2f b = sBall.getPosition();
    if (b.x < 0 || b.x > 520) dx = -dx;
    if (b.y < 0 || b.y > 450) dy = -dy;

    // paddle control
    if (Keyboard::isKeyPressed(Keyboard::Right)) sPaddle.move(6,0);
    if (Keyboard::isKeyPressed(Keyboard::Left)) sPaddle.move(-6,0);

    if (isCollide(sPaddle,sBall)) dy = -(rand()%5 + 2); // collide with paddle

    // draw sprites
    app.clear();
    app.draw(sBackground);
    app.draw(sBall);
    app.draw(sPaddle);

    for (int i = 0; i < n; i++)
      app.draw(block[i]);

    app.display();
  }

  return 0;
}
