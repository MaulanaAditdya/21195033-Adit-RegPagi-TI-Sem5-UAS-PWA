
'use strict'

var CACHE_VERSION = 1;
const CACHE_NAME = 'cache-v'+CACHE_VERSION;
// The files we want to cache
var PATH = '';
var resourceList = [
   PATH + './',
   PATH + './index.html',
   PATH + './js/main.js',
   PATH + './contactform/contactform.js',
   PATH + './lib/bootstrap/css/bootstrap.min.css',
   PATH + './lib/ionicons/css/ionicons.min.css',
   PATH + './lib/owlcarousel/assets/owl.carousel.min.css',
   PATH + './lib/magnific-popup/magnific-popup.css',
   PATH + './lib/hover/hover.min.css',
   PATH + './lib/jquery/jquery.min.js',
   PATH + './lib/jquery/jquery-migrate.min.js',
   PATH + './lib/bootstrap/js/bootstrap.bundle.min.js',
   PATH + './lib/typed/typed.js',
   PATH + './lib/owlcarousel/owl.carousel.min.js',
   PATH + './lib/magnific-popup/magnific-popup.min.js',
   PATH + './lib/isotope/isotope.pkgd.min.js',
   PATH + './lib/ionicons/fonts/ionicons.ttf?v=2.0.0',
   PATH + './images/home-bg.jpg',
   PATH + './images/logo.png',
   PATH + './images/me.jpg',
   PATH + './css/style.css',
   PATH + './css/responsive.css',
   PATH + './images/favicon.png',
   PATH + './manifest.json'
   // PATH + '../images/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(resourceList);
  }));
});

function addToCache(cacheName, resourceList) {
  caches.open(cacheName).then(cache => {
    return cache.addAll(resourceList);
  });
}

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }));
});