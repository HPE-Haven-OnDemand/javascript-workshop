function fnGetParametricValues(indexName, fieldName, searchTerm) {
	log("Get Parametric Values- Begin. indexes: "+indexName+", text: "+searchTerm+", field_name: "+fieldName);
	
	var iodClient = new IODClient();
    var iodRequest =  iodClient.createIODRequest(IOD.API_GETPARAMETRICVALUES);
    
    var params = new Array();
	
	var param1 = {key: "text", value: searchTerm};
	params.push(param1);
	var param2 = {key: "indexes", value: indexName};
	params.push(param2);
	var param3 = {key: "field_name", value: fieldName};
	params.push(param3);
	var param4 = {key: "sort", value: "document_count"};
	params.push(param4);
	
	iodRequest.setParams(params);
    
	log("POST Get Parametric Values request");
    iodRequest.post(fnGetParametricValues_Callback);
}

function fnGetParametricValues_Callback(response){
	log('fnGetParametricValues_Callback');
	
	var fnHTML = "";
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			
			fnHTML = "<h3>Get Parametric Values - Results</h3>";
					
			var rssUrls = json.RSS_URL;
			var rssSource = json.RSS_SOURCE;
			var rssCategory = json.RSS_CATEGORY;
			var wikiCategories = json.WIKIPEDIA_CATEGORY;
			
			fnHTML += 
			"<table>"+
				"<tr>"+
					"<th>Key</th>"+
					"<th>Value</th>"+
				"</tr>";
			
			if(wikiCategories) {
				for (var key in wikiCategories) {
					var value = wikiCategories[key];
					fnHTML += "<tr>"+
						"<td>"+key+"</td>"+
						"<td>"+value+"</td>"+
						"</tr>";
				}
			};
			
			fnHTML += "</table>";
			$('#main').html( fnHTML );
		}
	}
}