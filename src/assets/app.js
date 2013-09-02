$(document).ready(function(){
	Spy.start();
})

var Spy = (function(){

	var previousOfferId;
	var timeOutMilliSeconds = 10000;

	function onOfferChange(offer){
		previousOfferId = offer.offer_id;

		updatePage(offer);
		beep();
		log(offer);
	}

	function updatePage(offer){
		$('#ibood-title').html(offer.short_name);
		$('#ibood-price').text(offer.price.string+" euro");
		$('#ibood-description').html(offer.description);
		$('#ibood-image').html('<img src="'+ offer.img_xlarge +'" width=100 height=100 alt="ibood image" />');

		updateTitle(offer.short_name);
	}

	function updateTitle(title){
		$(document).attr("title", title);
	}

	function beep(){
		var beepUrl = 'resources/notification.mp3';
	 	document.getElementById("sound").play();
	}

	function log(offer){
		$.ajax({
		    type: 'POST',
		    url: '/log',
		    data: { offer : offer, timestamp:now()},
		    dataType: 'json'
		});
	}

	function now(){
		var currentdate = new Date(); 
		var datetime = 	currentdate.getDate() + "/"
		                + (currentdate.getMonth()+1)  + "/" 
		                + currentdate.getFullYear() + " "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds();
		return datetime;
	}

	return {
		start : function() {
			setTimeout(function(){
				var iboodURL = 'http://www.ibood.com/js/offer/be_nl.js';
				$.getJSON(iboodURL+"?callback=?", null, function() {});

				Spy.start();
			}, timeOutMilliSeconds);
		},

		handleUpdate: function(offer){
			var offerId = offer.offer_id;
			if(offerId != previousOfferId){
				onOfferChange(offer);
			}
		}
	};
})();

/*Global function, only way to interact with ibood :(*/
function update_offer(offer){
	Spy.handleUpdate(offer);
}