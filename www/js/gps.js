
var quoteArray = [
    { latlng: (new L.LatLng(40.769106, -73.963144)), title: "Joe Bell's Bar"},
    { latlng: (new L.LatLng(40.762711,-73.9739)), title:"Tiffany's" }
] //quoteArray

//var map = L.map('map').setView([40.7534388, -73.9901187], 13);
var map = L.map('map').setView([40.752825,-73.981384], 18);

//L.marker([40.752825,-73.981384]).addTo(map).bindPopup("Breakfast at Tiffany's").openPopup();
var popup = L.marker([40.752825,-73.981384]).addTo(map).on('click', function() {
    this.bounce(); });
popup.openPopup(); 

//L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {

//L.tileLayer('http://maps.nypl.org/warper/layers/tile/909/{z}/{x}/{y}.png', { //NYPL
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18}).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
	.bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
} 

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError); //

map.locate({setView: true, maxZoom: 16});
map.on('click', onMapClick); 

var popup2 = L.popup(); 
var d = new L.LatLng(40.752825,-73.981384); <!-- set current marker point as the main distance var -->

	  <!-- figure out distance from item  -->
	  function onMapClick(e) {
	    popup2.setLatLng(e.latlng)
	      .setContent("you are: " + d.distanceTo(e.latlng).toFixed(1) + "m from here").openOn(map);
	    document.getElementById("distance").innerHTML = 
	      ("you are: " + d.distanceTo(e.latlng).toFixed(1) + "m from here");
	  }; <!-- onMapClick -->

	  <!-- test functions for buttons -->
	  function quoteOne() {
	    map.panTo( new L.LatLng(40.7534388, -73.9901187));
	  };

	  function quoteTwo() {
	    map.panTo( quoteArray[0].latlng );
	  }; //quoteTwo

	  <!-- figure out the bounds of the view screen we're in -->
	  function findBounds() {
	    document.getElementById("bounds").innerHTML =
	  (" map boundaries: <br /> top left: " + map.getBounds()._northEast.lat.toFixed(2) + "," + 
	                                          map.getBounds()._northEast.lng.toFixed(2) + 
 	                "<br /> bottom right: " + map.getBounds()._southWest.lat.toFixed(2) + "," + 
	                                          map.getBounds()._southWest.lng.toFixed(2));
	  }; //findBounds

	  var viewBounds = new L.Bounds();
	  var quoteMarker;
	  var offScreenDistance, viewCenter;

	  <!-- find quotes within the current view and have them show up -->
	  function findQuotes() {
	    //Construct a bound object from current view
	    viewBounds = map.getBounds();

	    //clear the 
	    document.getElementById("inView").innerHTML = " ";
	    document.getElementById("outView").innerHTML = " ";

	    //go through all quotes & test if the current view has it
	    for (var i=0; i<quoteArray.length; i++) {
	      if (viewBounds.contains(quoteArray[i].latlng ) ) {
	        //document.getElementById("inView").innerHTML = quoteArray[i].title;
		$(inView).append(quoteArray[i].title + "<br />");
	        quoteMarker = L.marker(quoteArray[i].latlng).addTo(map).openPopup();
	      }
	      else {
		
		viewCenter = map.getCenter();
		offScreenDistance = viewCenter.distanceTo(quoteArray[i].latlng); 

		$(outView).append(quoteArray[i].title + " distance to: \t" + offScreenDistance.toFixed(2) + "meters <br />");

	        if (quoteMarker != undefined) {
	          map.removeLayer(quoteMarker);
	        } //if quoteMarker
	      } //else
            }//for all quotes
	  }; //findQuotes

	  map.on('dragend', findQuotes );	 

	</script>
