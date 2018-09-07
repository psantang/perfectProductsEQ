// only needed for ios/android interface differences
// Determine theme depending on device
//'use strict'; //NOTE: GOOD FOR TROUBLESHOOTING
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;


// Set Template7 global devices flags
Template7.global = {
    android: isAndroid,
    ios: isIos
};

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
//console.log("$$ is " + $$);

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// only needed for ios/android interface differences to apply material design
if (isAndroid) {
    // Change class
    $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
    // And move Navbar into Page
    $$('.view .navbar').prependTo('.view .page');

    console.log('**** in isAndroid to alter css properties ****');
}


// Init App

var myApp = new Framework7({
    id: 'com.paulsantangelo.ppEQ',
    root: '#app',
    material: isAndroid ? true : false,//,
    dynamicNavbar: true,
    // Enable Template7 pages
    template7Pages: true,
    animatePages:true,
    routes: routes,
    on: {
      pageInit(page) {
       console.log('myApp - on pageInit for page ' +page)
     }
   }

});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
/*
    getStores();

    $$(document).on('change', '#states', function () {
      console.log('states input id changed here');
      getStoreLocations();
    });
*/
});

// Now we need to run the code that will be executed only for About page.


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
