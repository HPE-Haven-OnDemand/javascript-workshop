function fnFindSimilarDocuments(indexName, inputType, inputValue) {
	log("Find Similar - Begin. indexName: "+indexName+", "+inputType+": "+inputValue);
	
	var iodClient = new IODClient();
    var iodRequest =  iodClient.createIODRequest(IOD.API_FINDSIMILAR);
    
    var params = new Array();
	
	var param1 = {key: inputType, value: inputValue};
	params.push(param1);
	var param2 = {key: "indexes", value: indexName};
	params.push(param2);
	
	iodRequest.setParams(params);
    
	log("POST Find Similar request");
    iodRequest.post(fnFindSimilarFiles_Callback);
}

function fnFindSimilarFiles_Callback(response){
	log('fnFindSimilarFiles_Callback');
	
	//var documents = new Array();
	var documentsHTML = "";
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			if(json.documents){
				
				documentsHTML = "<h3>Find Similar - Results</h3>";
				documentsHTML += "<table>"+
					"<tr>"+
						"<th>Title</th>"+
						"<th>Reference</th>"+
						"<th>Weight</th>"+
						"<th>Links</th>"+
						"<th>Index</th>"+
						
					"</tr>";
					
				var iodDocuments = json.documents;
				$(iodDocuments).each(function(i) {
				
					var iodDocument = iodDocuments[i];
					var reference = iodDocument.reference; 
					var weight = iodDocument.weight; 
					var links = ""+iodDocument.links; 
					links = replaceAll(links, ",", ", ");
					var index = iodDocument.index; 
					var title = iodDocument.title; 
					
					documentsHTML += 
						"<tr>"+
							"<td>"+title+"</td>"+
							"<td>"+reference+"</td>"+
							"<td>"+weight+"</td>"+
							"<td>"+links+"</td>"+
							"<td>"+index+"</td>"+
						"</tr>";	
				});
				
				documentsHTML += "</table>";
				$('#main').html( documentsHTML );
			}
		}
	}
}

function fnFindSimilarForTopTenTopics(topics){

	var indexName = $('#index-name').val();
	if(indexName==null){
		log("indexName is null"+indexName);
		indexName = "apiworld-index";
	}else{
		log("indexName: "+indexName);
	}
	fnFindSimilarDocuments(indexName, "text", topics);

}