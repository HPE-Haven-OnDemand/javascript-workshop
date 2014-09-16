function fnCreateIndex(indexName, indexFlavor){	

	log("Create index: "+indexName); 
	
	// Create IODClient
	var iodClient = new IODClient();
	// Create IODRequest
    var iodRequest =  iodClient.createIODRequest(IOD.API_CREATEINDEX);
    // Set parameters for Multipart/form-data post request
	// Specific for this API
    var params = new Array();
	var param1 = {key: "index", value: indexName};
	params.push(param1);
    var param2 = {key: "flavor", value: indexFlavor};
	params.push(param2);
	iodRequest.setParams(params);
    
	log("POST Create Index request");
    // set callback method
	iodRequest.post(fnCreateIndex_Callback);
}

function fnCreateIndex_Callback(response){	

	log("Create Index Callback");
	// error handling
	var indexes = new Array();
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		// parse response body
		var r = response.getResponseText();
		log("Response: "+r);
		if(r){
			// create JSON from response body string
			var json = JSON.parse(r);
			// parse Create Index response object
			if(json.message && (json.message=="index created")){
				var message = json.message;
				var index = json.index;
				log("Index created, index: "+index+", message: "+message);
				displayListIndexes();
			}
		}
	}
}

