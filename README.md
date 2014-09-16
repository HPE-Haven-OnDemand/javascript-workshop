To run the workshop code, just open ~/js/idolondemand-config.js and replace 'your-apikey-goes-here' with your IDOL OnDemand API Key.

To sign up and get a free API key for IDOL OnDemand, go to http://www.idolondemand.com and click Sign Up.

This workshop code uses a IDOL OnDemand Client SDK for JavaScript, view the code in ~/js/idolondemand-client.js

To call an IDOL OnDemand API use the following code:

/**
 * skeleton method to demo calling an IDOL OnDemnand API
 */
function sendIodRequest(inputParam1Key, inputParam1Value){

	// log is a utiliy function, see lines 134-143 of ~/js/iod-api-specific-functions/workshop-admin.js
	log("IOD Request<br>"+inputParam1Key+": "+inputParam1Value);
		
	// create a new IODClient, the IODClient reads the API Key from the config file
	var iodClient = new IODClient();
    // create an IOD Request object, the static API variables are found in ~/js/idolondemand-client.js (lines 5-19)
    var iodRequest =  iodClient.createIODRequest(IOD.API_ENTITY_EXTRACTION);
    
	// create FormData parameters
    var params = new Array();
	//inputValue = encodeURIComponent(inputValue);
	var param1 = {key: inputParam1Key, value: inputParam1Value};
	params.push(param1);
	// add more parameters as needed
	// set the params array for the FormData
	iodRequest.setParams(params);
    
	// Send POST multipart/form-data request, and add the callback function
    iodRequest.post(entityExtraction_Callback);
}
/**
 * callback function for above function
 */
function sendIodRequest_Callback(response){
	
	log('sendIodRequest_Callback');
	
	var responseObjects = new Array();
	var responseHtml = "";
	
	// response is a custom IDOL OnDemand Response Object with errorText property if an error is returned
	// the response object is defined in ~/js/idolondemand-types.js
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		// if no error occurred, a responseBody in json format is returned
		var r = response.getResponseText();
		// to log the whole flat string to screen
		//log("Response: "+r);
		if(r){
			// default JSON parser
			var json = JSON.parse(r);
			// now parse the json to specific IDOL OnDemand response object
			if(json.entities){ 
            ... 
			etc.