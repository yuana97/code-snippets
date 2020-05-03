Docker Crash Course (notes on https://docker-curriculum.com/)

# Table of contents
1. [Basic commands](#basic)

## Basic commands <a name="prereqs"></a>
**Install**
1. install docker https://www.docker.com/products/docker-desktop
1. Checkup: in terminal run 'docker run hello-world'. You should see a Hello from Docker message.

**Pull and run busybox**
1. docker pull busybox
1. docker run busybox echo "hello from busybox" (this runs 'echo ...' on the busybox container and then exits the busybox container)
1. docker run -it busybox sh (open up a shell in an instance of busybox)
1. illustration that containers are prepackaged environments:
    1. if you haven't already, docker run -it busybox sh as before
    2. ls (you should see a linux root directory)
    3. rm -rf bin (delete all binaries so commands like ls won't work)
    4. ls (you should see command not found)
    5. exit (you should go back to your regular terminal)
    6. docker run -it busybox sh (open up a new instance of busybox)
    7. ls (you should see the commands back, as this is a new instance of busybox)
    8. exit
1. cleanup
    1. docker ps -a
    2. docker rm 51ba8b706b45 37572788f681 (put your container id's listed by docker ps -a in the rm command)