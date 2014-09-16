function fnQueryTextIndexFiles(indexName, queryText, summary, fieldText) {
	
	log("Query Text Index - Begin. indexName: "+indexName+", queryText: "+queryText);
	
	var iodClient = new IODClient();
    var iodRequest =  iodClient.createIODRequest(IOD.API_QUERYTEXTINDEX);
    
    var params = new Array();
	
	var param1 = {key: "text", value: queryText};
	params.push(param1);
	var param2 = {key: "indexes", value: indexName};
	params.push(param2);
	
	var param3 = {key: "highlight", value: "terms"};
	params.push(param3);
	
	var param4 = {key: "print", value: "all"};
	params.push(param4);
	
	var param5 = {key: "summary", value: summary};
	params.push(param5);
	
	var param6 = {key: "total_results", value: true};
	params.push(param6);
	
	if(fieldText){
		var param7 = {key: "field_text", value: fieldText};
		params.push(param7);
	}
	
	iodRequest.setParams(params);
    
	log("POST Query Text Index request");
    iodRequest.post(fnQueryTextIndexFiles_Callback);
	
}

function fnQueryTextIndexFiles_Callback(response){
	log('fnQueryTextIndexFiles_Callback');
	
	var entities = new Array();
	var entitiesHTML = "";
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			if(json.documents){
				
				documentsHTML = "<h3>Query Text Files - Results</h3>";
					
				var totalHits = json.totalhits;
				documentsHTML += "Total hits: "+totalHits;
				
				var iodDocuments = json.documents;
				$(iodDocuments).each(function(i) {
				
					var iodDocument = iodDocuments[i];
					var index = iodDocument.index; 
					var reference = iodDocument.reference; 
					var weight = iodDocument.weight; 
					var links = iodDocument.links; 
					var index = iodDocument.index; 
					
					// wiki fields
					var title = iodDocument.title; 
					var wikipediaCategory = iodDocument.wikipedia_category; 
					
					// custom fields
					var appName = iodDocument.app_name; 
					var contentType = iodDocument['content-type']; 
					var createdDate = iodDocument.created_date; 
					var creator = iodDocument.creator; 
					var originalSize = iodDocument.original_size; 
					var pageCount = iodDocument.page_count; 
					var iodreference = iodDocument.iodreference; 
					var content = iodDocument.content; 
					
					if(i==0){
						documentsHTML += "<table>"+
						"<tr>"+
							"<th>reference</th>"+
							"<th>weight</th>"+
							"<th>Links</th>"+
							"<th>Index</th>";
							
						if(index=="wiki_eng"){
							documentsHTML += 
								"<th>title</th>"+
								"<th>wiki_category</th>";
						}else{
							documentsHTML += 
							"<th>contentType</th>"+
							"<th>createdDate</th>"+
							"<th>creator</th>"+
							"<th>originalSize</th>"+
							"<th>pageCount</th>"+
							"<th>iodreference</th>";
						}
						documentsHTML += "</tr>";
					}
					
					documentsHTML += 
						"<tr>"+
							"<td>"+reference+"</td>"+
							"<td>"+weight+"</td>"+
							"<td>"+links+"</td>"+
							"<td>"+index+"</td>";
						if(index=="wiki_eng"){
							documentsHTML += 
							"<td>"+title+"</td>"+
							"<td>"+wikipediaCategory+"</td>";
						}else{
							documentsHTML += 
							"<td>"+contentType+"</td>"+
							"<td>"+createdDate+"</td>"+
							"<td>"+creator+"</td>"+
							"<td>"+originalSize+"</td>"+
							"<td>"+pageCount+"</td>"+
							"<td>"+iodreference+"</td>";
						}
						documentsHTML += "</tr>";	
				});
				
				documentsHTML += "</table>";
				$('#main').html( documentsHTML );
			}
		}
	}
}