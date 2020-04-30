Written walkthrough following https://www.youtube.com/watch?v=t1aXuJkmTg8 ... including all the deployment details he skips.

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

The above steps cover up to 2:30 in the linked video.