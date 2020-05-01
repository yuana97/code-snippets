Written walkthrough following Techlead's https://www.youtube.com/watch?v=t1aXuJkmTg8 .

This guide covers the development and deployment of a 'Multiplayer Paint'

Finished at www.canvasgamedemo.com

# Table of contents
1. [Troubleshooting](#troubleshooting)
1. [Prerequisites](#prereqs)
1. [Development Pt 1](#development1)
1. [Development Pt 2](#development2)

## Troubleshooting <a name="troubleshooting"></a>
**sshfs i/o error**
1. pgrep -lf sshfs (copy the PID of the sshfs process)
1. kill -9 <PID> (kill sshfs process)
1. sudo umount -f /Users/alleyuan/canvasgamedemo (unmount directory)
1. mrd (alias to sshfs and remount directory)

## Prerequisites
**Purchase domain name and server**
1. buy a domain name at https://www.namecheap.com/ I used canvasgamedemo.com
1. Provision a droplet (a small ec2 instance) on https://www.digitalocean.com/ . Select Ubuntu OS
1. https://cloud.digitalocean.com/settings/security add your ssh key.
1. copy your droplet's ip address
1. open up a terminal and run 'ssh root@<DROPLET_IP>' and log into your server.

**Create a non-root user for your server and set up a firewall**
All terminal commands should be run while ssh'd onto your server, not on your computer.
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04

1. adduser allen (use your preferred username)
1. usermod -aG sudo allen (add allen to the superuser group)
1. firewall
    1. ufw allow OpenSSH (allow ssh connections thru firewall)
    2. ufw enable (enable firewall)
1. login as new user
    1. ctrl+c to logout of root
    2. ssh allen@<MY_DROPLET_IP> (replace with your username and your ip)

**Point your domain name to your provisioned server**
1. go to namecheap.com and click on your domain name. go to advanced DNS
1. Under host records you should see two entries. Set both their types to 'A Record' and set their values to your server's IP address.

**Set up Apache server**
https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04

1. get apache
    1. sudo apt update
    2. sudo apt install apache2
1. enable web traffic thru firewall
    1. sudo ufw app list (we should see Apache Full on the list)
    2. sudo ufw allow in "Apache Full"
    3. Checkup: Go to http://<DROPLET_IP> and you should see the apache default page
1. install mysql
    1. sudo apt install mysql-server
    2. sudo mysql_secure_installation
1. set mysql root user to authenticate with password
    1. sudo mysql (open up mysql shell)
    2. SELECT user,authentication_string,plugin,host FROM mysql.user; (you should see root uses auth_socket to authenticate)
    3. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>'; (replace <password> with your own password)
    4. FLUSH PRIVILEGES; (server reloads grant tables and puts changes into effect)
    5. Checkup: SELECT user,authentication_string,plugin,host FROM mysql.user; (confirm root uses mysql_native_password)
    6. run 'exit' to exit the mysql shell
1. install php: sudo apt install php libapache2-mod-php php-mysql
1. configure Apache to serve index.php over index.html file
    1. sudo nano /etc/apache2/mods-enabled/dir.conf (open up apache config in a text editor)
    2. move index.php to go right after DirectoryIndex in the list
    3. ctrl+x -> y -> enter to save the file
    4. sudo systemctl restart apache2 (restart server, get changes)
    5. sudo apt install php-cli (install command line interface)
1. set up virtual hosts
    1. sudo mkdir /var/www/canvasgamedemo (replace canvasgamedemo with your domain)
    2. sudo chown -R $USER:$USER /var/www/canvasgamedemo (change owner to myself)
    3. sudo chmod -R 755 /var/www/canvasgamedemo (give myself read/write/exec permission on this directory)
    4. nano /var/www/canvasgamedemo/index.html and write a simple html page like https://pastebin.com/z13YqFUM
    5. sudo nano /etc/apache2/sites-available/canvasgamedemo.conf and write a configuration block like https://pastebin.com/mRRMAuzM
    6. sudo a2ensite canvasgamedemo.conf (enable the site I just created)
    7. sudo a2dissite 000-default.conf (disable the default site)
    8. Checkup: sudo apache2ctl configtest (check for config errors: you should see 'Syntax OK')
    9. sudo systemctl restart apache2
    10. Checkup: Now I go to http://www.canvasgamedemo.com/ and see my site being served
1. verify PHP processing on server
    1. sudo nano /var/www/canvasgamedemo/info.php and add a basic PHP file like https://pastebin.com/6fjp5KW8
    2. Checkup: visit http://canvasgamedemo/info.php and see a page with PHP info about the server

**Set up development on your server**
Run the below commands on your computer.

Now we can serve web assets. The only thing left to do is get code from the development machine (my computer) to the server (and of course to write the code).

There are a couple ways of doing this (for example rsync, scp). We will use sshfs to create a remote directory.

1. install sshfs to mount a remote directory (Windows users follow instructions here https://linuxize.com/post/how-to-use-sshfs-to-mount-remote-directories-over-ssh/)
    1. brew cask install osxfuse
    2. brew install sshfs
1. mkdir ~/canvasgamedemo
1. sshfs allen@138.197.110.75:/var/www/canvasgamedemo ~/canvasgamedemo (sshfs [remote user]@[server ip address]:[remote directory] [local directory])
1. Checkup: Open up ~/canvasgamedemo in VS Code. You should see your server code here with the index.html and info.php. Now you're ready to code!
1. You may want to set up some aliases for common commands for example mounting the remote drive, or sshing into your server. To do this, vim ~/.bash_profile and add in "alias mrd="sshfs allen@138.197.110.75:/var/www/canvasgamedemo ~/canvasgamedemo"" and so on for your commands.

The above steps cover up to 2:30 in the linked video

## Development <a name="development1"></a>
**Scaffold**
1. cd ~/canvasgamedemo (replace ~/canvasgamedemo with your mounted drive)
1. git clone https://github.com/Simonwep/pickr.git
1. delete index.html and info.php from the setup
1. Add a simple index.php https://pastebin.com/Ux4Rg5by
1. Add a simple canvas draw.php https://pastebin.com/X24nSyUJ We import scripts and styles we need and scaffold an html template.
1. Checkup: go to www.canvasgamedemo.com and you should see 'Hello there'. Go to canvasgamedemo.com/draw.php and you should see a blank canvas.

**Draw on the canvas**
1. Add the draw.js script we included in draw.php https://pastebin.com/p8awcLZS Now you should see the grid being drawn on the canvas
1. Add some logic to draw.js to draw on the grid https://pastebin.com/zaTk3h0f Now you should be able to mousedown on the grid and draw.
1. Leverage the pickr library to add color picking https://pastebin.com/MwYZpVEf Now you should be able to click 'Choose color', choose color, and draw in a different color.

**Main page**
1. Scaffold index.php https://pastebin.com/e0dDu7MG
1. Add index.js to draw a grid on the index page https://pastebin.com/X2it3iC3
1. Add logic to highlight selected boxes and go to the draw page when the user clicks on the boxes https://pastebin.com/MS1DYC0c

## Development Pt 2 <a name="development2">

1. Go to https://firebase.google.com/ and create a new project called canvasgamedemo. Once done go to your project page and click the web symbol ( </> ). Register your app and paste the configuration into your index.php like https://pastebin.com/7UxLYDYc
1. on your firebase project page click 'Cloud Firestore' and provision a database. Once that's done, click 'start a collection' named app with a document called grid.
1. scaffold save function: pass querystring vars to save function in draw.php https://pastebin.com/pnfe6v1p and add save function to draw.js: https://pastebin.com/aaFJ25zj
    1. Checkup: draw something and press 'save'. You should see your request body being printed below the save button.
1. install firebase admin on your server:
    1. ssh into your cloud instance
    2. sudo apt install python-pip
    3. cd into your server directory (in my case, /var/www/canvasgamedemo)
    4. pip install -U firebase-admin
1. get in touch with database:
    1. go to firebase project settings > service accounts > generate new private key. That should download a json file, move the contents of this json file to a new file called creds.json in your project directory.
    2. create a file save.py: https://pastebin.com/32mwrR1R . Checkup: cd /var/www/canvasgamedemo and run python save.py . Now you should be able to go to your database and see your data inside.
1. write to the database (draw and submit)
    1. modify save.py to write the pixel-painting mapping to the db https://pastebin.com/HfJ610TV
    2. invoke save.py via draw.php https://pastebin.com/cpmbwQM3
    3. add firestore script to index.php and remove the configuration https://pastebin.com/cRDskvgA
    4. move the configuration to index.js https://pastebin.com/JDvm2HWj
    5. on your server 'cd /var/www/canvasgamedemo' and then 'mkdir tmp' and then 'sudo chmod -R 777 .' so your draw.php has permissions to write to files in canvasgamedemo/tmp
    5. In order for our Apache server user to run save.py we need to install firebase-admin as root. To do this, sudo -i and pip install firebase-admin.
    6. Checkup: go to canvasgamedemo.com, click a square, draw something, and press save. You should be redirected back to index. Then check your Firestore and you should see a new entry for your drawing.
1. read the database (see the parent painting)
    1. attempt to read the db and log data in index.js https://pastebin.com/d62NR1RQ . Checkup: go to your website and open up chrome inspector > console. You should see 'FirebaseError: Missing or insufficient permissions'
    2. go to Firebase > Database > Rules and change the rules document to the following https://pastebin.com/i7z4mzFB in order to allow reading by anyone. Checkup: Refresh canvasgamedemo.com, open console, and confirm data is being logged
    3. Add some logic to index.js to paint on the parent after reading in the data https://pastebin.com/h7m5bpxp
1. Now you should be done. Checkup: draw something on a child page and go back to the parent. You should see your drawing now.

