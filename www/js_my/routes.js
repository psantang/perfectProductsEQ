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

          anc=$$("a[href^='https://']");
          for(i=0;i<anc.length;i++) {
            $$(anc[i]).addClass("external");
            console.log(" added external class to href anc="+anc[i].href);
          }

          console.log(" added external class to href ");


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

          anc=$$("a[href^='https://']");
          for(j=0;j<anc.length;j++) {
            $$(anc[j]).addClass("external");
            console.log(" added external class to href anc="+anc[j].href);
          }

/*
          $$('.fc-action--payment--checkout a').click(function() {
            console.log('----------click on checkout detected in router!');
            $$(".fc-action--payment--checkout a").addClass("external");
          });
*/


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
