<p align="center">
   <a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
</p>

# TourGate

## Getting Started

These instructions will provide you with an easy way to run a project on your local computer in Homestead for development and testing purposes.

### Installing

Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html).

Add the laravel/homestead box to your Vagrant
```
vagrant box add laravel/homestead
```

Install Homestead by cloning the repository onto your host machine
```
git clone https://github.com/laravel/homestead.git  ~/Homestead
```

Create Homestead.yaml config file
```
cd ~/Homestead

// Mac / Linux...
bash init.sh

// Windows...
init.bat
```

Edit Homestead.yaml config
```
// Make sure IP is set to
ip: "192.168.10.10"
```

```
// Commented
#authorize: ~/.ssh/id_rsa.pub
#keys:
#    - ~/.ssh/id_rsa
```

```
// Change

folders:
    - map: ~/code
      to: /home/vagrant/code

sites:
    - map: homestead.test
      to: /home/vagrant/code/public

// To

folders:
    - map: ~/Source/TourGate
      to: /home/vagrant/TourGate

sites:
    - map: TourGate.test
      to: /home/vagrant/TourGate/public
```

Get TourGate
```
cd ~/Source
git clone https://github.com/misterobot404/TourGate.git
```

### Deployment

Connect to Homestead.

Update dependencies

```
cd ~/TourGate/

composer update
npm install -g npm
npm install
npm update
```

Run the migration to change the application database schema
```
php artisan migrate --seed
php artisan passport:install
```

The project is ready for launch and testing.

#### Advanced NGINX configuration

Set http max size
```
sudo nano /etc/nginx/nginx.conf

// Add to http context
client_max_body_size 4M;
```

Enable using precompressed files

```
sudo nano /etc/nginx/nginx.conf

// Add to http context
client_max_body_size 4M;

gzip_static on;
gzip_min_length 1400;
gzip_comp_level 9;
```

Enable caching

```
sudo nano /etc/nginx/sites-available/TourGate.test

// Add caching to the location

// Example
location = /favicon.ico {   
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }
```

### Running

Run Homestead and application on IP 192.168.10.10 (initial startup takes longer)

```
cd ~/Homestead
vagrant up
```

To connect to Homestead (for change the environment settings)
```
cd ~/Homestead
vagrant up
```

Shut down Homestead and application
```
vagrant halt
```

## Built With

Backend
* [Homestead](https://laravel.com/docs/homestead) - official Vagrant box pre-packaged development environment
* [Laravel](https://laravel.com/) - RESTful API service. API response format is HTTP status + JSON based on the [JSend](https://github.com/omniti-labs/jsend) specification

Frontend
* [Vue.js](https://vuejs.org/) - Single-page application
* [Vue Router](https://router.vuejs.org/) - Routing
* [Vuex](https://vuex.vuejs.org/) - State management
* [Vuetify](https://vuetifyjs.com/en/) - UI Library
* [Leaflet](https://leafletjs.com/) - Open-source JavaScript library for interactive maps

## Authors

* **Alexander Zakusilo** - *Programmer* - [misterobot404](https://github.com/misterobot404)

## Browser compatibility

Supported all browsers except IE old versions.

## Security Vulnerabilities

If you discover a security vulnerability within MapHelper, please send an e-mail to misterobot via [misterobot404@gmail.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

TourGate is commercial software. No license.

