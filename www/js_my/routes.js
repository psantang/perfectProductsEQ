var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
    on: {
        pageInit: function () {
          // do something on page init
          console.log(" ------ > page init in route.js for home page");
          getStores();

          $$(document).on('change', '#states', function () {
            console.log('states input id changed here');
            getStoreLocations();
          });

      },  // END PAGEINIT
        pageAfterIn: function () {
          console.log(" ------ > page After In in route.js for home page");
        }
    }
  }, // END INDEX / HOME

  {
    path: '/product/',
    url: './pages/product.html',
    name: 'product',
    on: {
        pageInit: function () {
          // do something on page init
          console.log(" ------ > page init in route.js for product page");



        },
        pageAfterIn: function (e, page) {
          console.log('-------> on.pageAfterIn EVENT called from router for product');


        },
    }
  }, // END product

  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
    on: {
        pageInit: function () {
          // do something on page init
          console.log(" ------ > page init in route.js for about page");



        },
        pageAfterIn: function (e, page) {
          console.log('-------> on.pageAfterIn EVENT called from router for about');


        },
    }
  } // END ABOUT

];
