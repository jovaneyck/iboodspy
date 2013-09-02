describe('the client', function(){
	beforeEach(function() {	
		jasmine.Clock.useMock();
	});

	function proceedTick(){
		jasmine.Clock.tick(10001);
	}

	it('Starts listening for iBood updates on start', function(){
		spyOn($, 'getJSON');
	
		Spy.start();

		proceedTick();

		expect($.getJSON).toHaveBeenCalled();
	});

	it('keeps on listening for updates', function(){
		spyOn(Spy, 'start').andCallThrough();
		Spy.start();

		proceedTick();
		proceedTick();

		expect(Spy.start.callCount).toBeGreaterThan(1);
	});

	var mockOffer = {
		offer_id : 1337,
		short_name: 'an offer',
		price: {
			string: '99.95'
		}
	};

	var updatedScreen = false;

	beforeEach(function(){
		spyOn(document,'getElementById').andCallFake(function(){
			return {
				play : function(){
					updatedScreen = true;
				}
			};
		});

		spyOn($.fn,'find').andCallThrough();
	});

	it('handles an iBood update correctly', function(){

		update_offer(mockOffer);

		expect(updatedScreen).toBe(true);

	});

	it('does not handle unnecessary updates', function(){
		update_offer(mockOffer);
		updatedScreen = false;

		//update with the same offer
		update_offer(mockOffer);

		expect(updatedScreen).toBe(false);
	});

	it('logs new offers server-side', function(){
		var ajaxArguments;
		spyOn($,'ajax').andCallFake(
			function(arguments){
				ajaxArguments = arguments;
			}
		);

		mockOffer.offer_id = 888; //new offer
		update_offer(mockOffer);
		
		expect(ajaxArguments.url).toMatch(/log/);
		expect(ajaxArguments.data.offer.short_name).toEqual(mockOffer.short_name);
	});
});