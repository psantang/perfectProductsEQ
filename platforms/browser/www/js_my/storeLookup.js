
function getStores() {
  console.log('getStores function');
  var url='https://perfectproductseq.com/ws/ws_store_locations_by_state_ret_json.php';

  myApp.request({url:url,data:{ getBy: "state"},type:'POST',dataType: 'json',success:function(StatesObj) {
    console.log('in success for stateLookup');

    window.StatesObj=StatesObj;
    var statesList = '<div class="list inline-labels no-hairlines-md"><ul><li>';

    statesList += '<li class="item-content item-input">';
    statesList += '<div class="item-media">';
    statesList += '<i class="icon demo-list-icon"></i>';
    statesList += '</div>';

    statesList += '<div class="item-inner">';
    statesList += '<div class="item-title item-label">Select State...</div>';
    statesList += '<div class="item-input-wrap"><select name="states" id="states" placeholder="Please choose...">';


    StatesObj.data.forEach( function( index, value ) {
      statesList += '<option value="'+ index.sl_state + '">'+ index.sl_state + '</option>';
    });
    statesList += '</select></div></div></li></ul></div>';
    $$("#storeLookup_div").html(statesList).trigger('create');

    }, timout: 5000

    , beforeSend: function(){
      console.log('beforeSend getStores');

    }, complete: function(){
        console.log('complete getStores');
        getStoreLocations();

    }, error: function(StatesObj, status, err) {
        if (status == "timeout") {
          console.log("Timeout Error. " + StatesObj + status + err);
        } else {
          console.log("error: " + request + status + err);
        }
    }
  }) // END ajax function for ski brands
}

function getStoreLocations() {
		//$$('#factory_year,#factory_length').empty(); // REMOVE ALL OTHERS
		//$('#factory_current,#factory_my_name,#factory_submit').hide();// HIDE THESE
		theState = ( $$('#states').val() );
    console.log('theState = ' + theState)
    var url='https://perfectproductseq.com/ws/ws_store_lookup_ret_json.php';

		myApp.request({url:url,data:{ state:theState },type:'POST',dataType: 'json',success:function(storesObj) {

      console.log('success with object ' + storesObj);


/*
<div class="block-title">Separate Collapsibles</div>
<div class="list">
  <ul>
    <li class="accordion-item"><a href="#" class="item-content item-link">
        <div class="item-inner">
          <div class="item-title">Item 1</div>
        </div></a>
      <div class="accordion-item-content">
        <div class="block">
          <p>Item 1 content. Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    </li>
*/


  var str="<div class='block-title'>Locations</div>";

    str+="<div class='list' id='store_accordian_list'>";
    str+="<ul id='ul_store_list'>";
    console.log('in accordian list');
    if (storesObj.length>0) {
      for (i=0; i<storesObj.length; i++) {
    //var tmp_ski_year = ski_Obj[i][0].year || null;
    //if (tmp_ski_year != null) tmp_ski_year = "("+ski_Obj[i][0].year+")";
    str+="<li class='accordion-item swipeout'><a href='#' class='item-content item-link'>"; //  style='touch-action: manipulation;'
    str+="<div class='item-inner'>";
    str+="<div class='item-title'>" + storesObj[i].sl_city + ", "+storesObj[i].sl_state+"</div>";
    str+="</div></a>";

    str+="<div class='accordion-item-content'>";
    str+="<div class='block location_container'>";
    str+="<div class='bold'>"+storesObj[i].sl_store+"</div>";
    str+="<div>"+storesObj[i].sl_address+" "+storesObj[i].sl_address2+" </div>";
    if (isIos) {
      str+="<div>"+storesObj[i].sl_city+", "+storesObj[i].sl_state+" "+storesObj[i].sl_zip+" | <a href='#' onclick=\"window.open('Maps://?q="+storesObj[i].sl_latitude+","+storesObj[i].sl_longitude+"', '_system');\">View Map</a></div>";
    } // mapLink = "Maps://?q=" + lat + "," + lon

    if (isAndroid) {
      str+="<div>"+storesObj[i].sl_city+", "+storesObj[i].sl_state+" "+storesObj[i].sl_zip+" | <a href='#' onclick=\"window.open('geo:"+storesObj[i].sl_latitude+","+storesObj[i].sl_longitude+"?z=12&q="+storesObj[i].sl_latitude+","+storesObj[i].sl_longitude+"', '_system');\">View Map</a></div>";
    } // if ($.os.android) mapLink = "geo:" + lat + "," + lon + "?z=12&q=" + lat + "," + lon

    //str+="<div><a href='tel:"+storesObj[i].sl_phone+"'>"+storesObj[i].sl_phone+"</a></div>";
    str+="<div class='phoneLink'><a href='#' onclick=\"window.open('tel:"+storesObj[i].sl_phone+"', '_system')\";><i class='size-20 f7-icons valign_middle'>phone_round_fill</i> "+storesObj[i].sl_phone+"</a></div>";
    //str+="<div class='mapLink><a href='#' onclick=\"window.open('maps://?q="+storesObj[i].sl_latitude+","+storesObj[i].sl_longitude+"');\">Open Map</a></div>";
    //str+="<div><a href='"+storesObj[i].sl_url+"' target='_system'>"+storesObj[i].sl_url+"</a></div>";
    if (storesObj[i].sl_url) {
      str+="<div class='webLink'><a href='#' onclick=\"window.open('"+storesObj[i].sl_url+"', '_system')\";><i class='size-20 f7-icons valign_middle'>world</i> "+storesObj[i].sl_url+"</a></div>";
    }

    str+="</div>";
    str+="</div>";
    str+="</li>";

    //str+="<div class='stockListRow'><a href='#' class='deleteStockSki' id='stockSki_"+i+"_'><i class='icon f7-icons color-red'>delete_round_fill</i></a> "+ski_Obj[i][0].brand+" "+ski_Obj[i][0].model+" "+ski_Obj[i][0].length+" "+ski_Obj[i][0].year+"</div>";
    console.log ('store: '+  storesObj[i].sl_store);
  }
  str+="</ul>";
  str+="</div>";
  $$('#storesList_div').html(str);
}





    /*
			var storesList = '<div class="item-input"><select name="stores" id="stores">';
			storesList += '<option>Select Store...</option>';
			$$.each(storesObj, function( index, value ) {
        console.log('store is ' + value.sl_store);
				storesList += '<option value="'+ value.sl_store + '">'+ value.sl_store + '</option>';
			});
			storesList += '</select></div>';
			$$("#storesList_div").html(storesList).trigger('create');
      */
      }, timout: 5000

      , beforeSend: function(){
        console.log('beforeSend states change event');

      }, complete: function(){
          console.log('complete states change event');

      }, error: function(storesObj, status, err) {
          if (status == "timeout") {
            console.log("Timeout Error. " + storesObj + status + err);
          } else {
            console.log("error: "  + status + err);
          }
      }
    }) // END ajax function for models
	}
