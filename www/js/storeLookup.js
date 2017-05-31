
function getStores() {
  console.log('getStores function');
  var url='http://www.perfectproductseq.com/ws/ws_store_locations_by_state_ret_json.php';

  $$.ajax({url:url,data:{ getBy: "state"},type:'POST',dataType: 'json',success:function(StatesObj) {
    console.log('in success for stateLookup');


    var statesList = '<div class="list-block"><ul><li><div class="item-content">';

    statesList += '<div class="item-inner">';
    statesList += '<div class="item-title label">Select State...</div>';
    statesList += '<div class="item-input"><select name="states" id="states">';
    //statesList += '<option>Select State...</option>';

    $$.each(StatesObj, function( index, value ) {
      statesList += '<option value="'+ value.sl_state + '">'+ value.sl_state + '</option>';
    });
    statesList += '</select></div></div></div></li></ul></div>';
    $$("#storeLookup_div").html(statesList).trigger('create');


    }, timout: 5000

    , beforeSend: function(){
      console.log('beforeSend getStores');

    }, complete: function(){
        console.log('complete getStores');

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
    var url='http://www.perfectproductseq.com/ws/ws_store_lookup_ret_json.php';

		$$.ajax({url:url,data:{ state:theState },type:'POST',dataType: 'json',success:function(storesObj) {

      console.log('success with object ' + storesObj);

      var str="<div class='content-block-title'>Locations</div>";
    str+="<div class='list-block accordion-list' id='store_accordian_list'>";
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
    str+="<div class='content-block location_container'>";
    str+="<div class='bold'>"+storesObj[i].sl_store+"</div>";
    str+="<div>"+storesObj[i].sl_address+" "+storesObj[i].sl_address2+" </div>";
    str+="<div>"+storesObj[i].sl_city+", "+storesObj[i].sl_state+" "+storesObj[i].sl_zip+"</div>";
    str+="<div><a href='tel:"+storesObj[i].sl_phone+"'>"+storesObj[i].sl_phone+"</a></div>";
    str+="<div><a href='geo:"+storesObj[i].sl_latitude+","+storesObj[i].sl_longitude+"'>Open Map</a></div>";
    //str+="<div><a href='"+storesObj[i].sl_url+"' target='_system'>"+storesObj[i].sl_url+"</a></div>";
    str+="<div><a href='#' onclick=\"window.open('"+storesObj[i].sl_url+"', '_system', 'location=no')\";>"+storesObj[i].sl_url+"</a></div>";

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
