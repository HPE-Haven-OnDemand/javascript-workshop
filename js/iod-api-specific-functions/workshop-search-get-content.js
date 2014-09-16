function fnGetContent(indexName, reference, highlight){
	log("Get Content - Begin. indexes: "+indexName+", reference: "+reference);
	
	var iodClient = new IODClient();
    var iodRequest =  iodClient.createIODRequest(IOD.API_GETCONTENT);
    
    var params = new Array();
	
	var param1 = {key: "index_reference", value: reference};
	params.push(param1);
	var param2 = {key: "indexes", value: indexName};
	params.push(param2);
	var param3 = {key: "print", value: "all"};
	params.push(param3);
	var param4 = {key: "highlight_expression", value: highlight};
	params.push(param4);
	
	iodRequest.setParams(params);
    
	log("POST Get Content request");
    iodRequest.post(fnGetContent_Callback);
}

function fnGetContent_Callback(response){
	log('fnGetContent_Callback');
	
	var fnHTML = "";
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			
			fnHTML = "<h3>Get Content - Results</h3>";
					
			var documents = json.documents;
			if(documents) {
				$(documents).each(function(i) {
				
					var document = documents[i];
					var reference = document.reference;
					var section = document.section;
					var index = document.index;
					var title = document.title;
					var categories = document.categories;
					var content = document.content;
					
					fnHTML += 
						"<h4>"+title+"</h4>"+
						"<p>"+categories+"</p>"+
						"<p>"+content+"</p>";
				});
			};
			
			$('#main').html( fnHTML );
		}
	}
}