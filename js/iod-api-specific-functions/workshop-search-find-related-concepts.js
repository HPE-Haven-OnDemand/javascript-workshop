function fnFindRelatedConcepts(indexName, concepts){
	log("Find Related Concepts - Begin. indexes: "+indexName+", concepts: "+concepts);
	
	var iodClient = new IODClient();
    var iodRequest =  iodClient.createIODRequest(IOD.API_FINDRELATEDCONCEPTS);
    
    var params = new Array();
	
	var param1 = {key: "text", value: concepts};
	params.push(param1);
	var param2 = {key: "indexes", value: indexName};
	params.push(param2);
	
	iodRequest.setParams(params);
    
	log("POST Find Related Concepts request");
    iodRequest.post(fnFindRelatedConcepts_Callback);
}

function fnFindRelatedConcepts_Callback(response){
	log('fnFindRelatedConcepts_Callback');
	
	var fnHTML = "";
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			
			fnHTML = "<h3>Find Related Concepts - Results</h3>";
					
			var entities = json.entities;
			if(entities) {
				fnHTML += "<table>" +
					"<tr>"+
						"<th>Text</th>"+
						"<th>Docs with Phrase</th>"+
						"<th>Occurrences</th>"+
						"<th>Docs with all Terms</th>"+
						"<th>Cluster</th>"+
					"</tr>";
				
				$(entities).each(function(i) {
					var entity = entities[i];
					var text = entity.text;
					var docsWithPhrase = entity.docs_with_phrase;
					var occurrences = entity.occurrences;
					var docsWithAllTerms = entity.docs_with_all_terms;
					var cluster = entity.cluster;
					
					fnHTML += 
						"<tr>"+
							"<td>"+text+"</td>"+
							"<td>"+docsWithPhrase+"</td>"+
							"<td>"+occurrences+"</td>"+
							"<td>"+docsWithAllTerms+"</td>"+
							"<td>"+cluster+"</td>"+
						"</tr>";
				});
				
				fnHTML += "</table>";
			};
			
			
			$('#main').html( fnHTML );
		}
	}
}