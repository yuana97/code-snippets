#include <SFML/Graphics.hpp>
#include <math.h>
using namespace sf;

// checkpoints
const int num = 8;
int points[num][2] = {
    300, 610,
    1270, 430,
    1380, 2380,
    1900, 2460,
    1970, 1700,
    2550, 1680,
    2560, 3150,
    500, 3300};

// car encoded by position, speed, angle w/ a move method
struct Car
{
  float x, y, speed, angle;
  int n;

  Car()
  {
    speed = 2;
    angle = 0;
    n = 0; // first waypoint for ai cars
  }

  void move()
  {
    x += sin(angle) * speed;
    y -= cos(angle) * speed;

    // target point
    float tx = points[n][0];
    float ty = points[n][1];

    // point the car towards the target
    float beta = angle - atan2(tx - x, -ty + y); // difference between current angle and target angle
    if (sin(beta) < 0)
      angle += 0.08;
    else
      angle -= 0.08; // move angle towards target angle

    // if a car gets within 25 pixels of a way point, point it to the next waypoint.
    if ((x - tx) * (x - tx) + (y - ty) * (y - ty) < 25 * 25)
      n = (n + 1) % num;
  }
};

int main()
{
  RenderWindow app(VideoMode(640, 480), "Car Racing Game!");
  app.setFramerateLimit(60);

  Texture t1, t2;
  t1.loadFromFile("/Users/alleyuan/code-snippets/16_games/07 Top Down Racing/images/background.png");
  t2.loadFromFile("/Users/alleyuan/code-snippets/16_games/07 Top Down Racing/images/car.png");

  Sprite sBackground(t1), sCar(t2);
  sBackground.scale(2, 2);
  sCar.setPosition(300, 300);
  sCar.setOrigin(22, 22);

  // set ai cars and starting positions
  const int N = 5;
  Car car[N];
  for (int i = 0; i < N; i++)
  {
    car[i].x = 300 + i * 50;
    car[i].y = 1700 + i * 80;
    car[i].speed = 7 + i;
  }

  float x = 300, y = 300;
  float speed = 0, angle = 0; // initial speed/angle (angle=direciton from car center)
  float maxSpeed = 12.0;
  float acc = 0.2, dec = 0.3; // acceleration.deceleration
  float turnSpeed = 0.08;     // angular velocity when turning

  int offsetX = 0, offsetY = 0;

  while (app.isOpen())
  {
    Event e;
    while (app.pollEvent(e))
    {
      if (e.type == Event::Closed)
        app.close();
    }

    // set directions
    bool Up = 0, Right = 0, Down = 0, Left = 0;
    if (Keyboard::isKeyPressed(Keyboard::Up))
      Up = 1;
    if (Keyboard::isKeyPressed(Keyboard::Right))
      Right = 1;
    if (Keyboard::isKeyPressed(Keyboard::Down))
      Down = 1;
    if (Keyboard::isKeyPressed(Keyboard::Left))
      Left = 1;

    // CAR MOVEMENT
    // positive speed
    if (Up && speed < maxSpeed)
    {
      if (speed < 0)
        speed += dec;
      else
        speed += acc;
    }

    // negative speed
    if (Down && speed > -maxSpeed)
    {
      if (speed > 0)
        speed -= dec;
      else
        speed -= acc;
    }

    // friction
    if (!Up && !Down)
    {
      if (speed - dec > 0)
        speed -= dec;
      else if (speed + dec < 0)
        speed += dec;
      else
        speed = 0;
    }

    // angle
    if (Right && speed != 0)
      angle += turnSpeed * speed / maxSpeed;
    if (Left && speed != 0)
      angle -= turnSpeed * speed / maxSpeed;

    // set new position and orientation
    car[0].speed = speed;
    car[0].angle = angle;

    // move all cars
    for (int i = 0; i < N; i++)
      car[i].move();

    float R = 22; // car radius

    // collision
    for (int i = 0; i < N; i++)
      for (int j = 0; j < N; j++)
      {
        int dx = car[i].x - car[j].x;
        int dy = car[i].y - car[j].y;
        if (dx * dx + dy * dy < 4 * R * R) // upon collision, nudge each car away from the collision
        {
          car[i].x += dx / 10;
          car[i].y += dy / 10;
          car[j].x -= dx / 10;
          car[j].y -= dy / 10;
        }
      }

    // camera offset
    if (car[0].x > 320)
      offsetX = car[0].x - 320;
    if (car[0].y > 240)
      offsetY = car[0].y - 240;

    if (x > 320)
      offsetX = car[0].x - 320;
    if (y > 240)
      offsetY = car[0].y - 240;

    app.clear(Color::White);
    sBackground.setPosition(-offsetX, -offsetY); // follow the car w/ the camera
    app.draw(sBackground);

    Color colors[10] = {Color::Red, Color::Green, Color::Magenta, Color::Blue, Color::White};

    // re-render cars
    for (int i = 0; i < N; i++)
    {
      sCar.setPosition(car[i].x - offsetX, car[i].y - offsetY);
      sCar.setRotation(car[i].angle * 180 / 3.141592);
      sCar.setColor(colors[i]);
      app.draw(sCar);
    }

    app.display();
  }

  return 0;
}