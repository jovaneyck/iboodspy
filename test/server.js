describe('the ibood hunt log service', function(){
	it('logs new hunts reported by the client to a log file', function(){
		spyOn(fs, 'appendFile');

		var request = {
			body : {
				offer : {
					short_name : "offer name",
					price : {
						string: "offer price string"
					}
				}
			}
		};
		var response = {
			end : function(){}
		};

		Logger.log(request, response);
		expect(fs.appendFile).toHaveBeenCalled();
	})
});