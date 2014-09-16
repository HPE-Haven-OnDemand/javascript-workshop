
function fnListIndexes(){

	var iodClient = new IODClient();
    log('creating iodRequest/listindexes');
    var iodRequest =  iodClient.createIODRequest(IOD.API_LISTINDEXES);
    //flavor=standard&flavor=explorer
    var params = new Array();
	var param1 = {key: "flavor", value: "standard"};
	params.push(param1);
    var param2 = {key: "flavor", value: "explorer"};
	params.push(param2);
	iodRequest.setParams(params);
    log('send iodRequest/listindexes');
    iodRequest.post(fnListIndexes_Callback);
	
}
	
function fnListIndexes_Callback(response) {
    
	log('listindexes callback');
	
	indexes = new Array();
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else if(response.index){
		log("Response.index: " + response);
	}else{
		var r = response.getResponseText();
		log("Response: " + r);
		
		if(r){
			var json = JSON.parse(r);
			var index = json.index;
			var publicIndex = json.public_index;
			
			var indexesHTML = "" +
				"<input type=\"checkbox\" id=\"check-toggle-delete-buttons\" >Delete Indexes<br>" +
				"<table>" +
					"<tr>" +
						"<th>&nbsp;</th><th>Index</th><th>Flavor</th><th>Type</th><th>Date Created</th><th>Num Components</th>" +
					"</tr>";
					
			if(index){
				$(index).each(function(i) {
					var iodIndex = new IODIndex();
					
					var index1 = index[i].index;
					iodIndex.setIndex(index1);
					var flavor = index[i].flavor;
					iodIndex.setFlavor(flavor);
					var type = index[i].type;
					iodIndex.setType(type);
					var dateCreated = index[i].date_created;
					iodIndex.setDateCreated(dateCreated);
					var numComponents = index[i].num_components;
					iodIndex.setNumComponents(numComponents);
					
					indexes.push(iodIndex);
					
					indexesHTML  += "<tr>" +
						"<td><input type=\"button\" value=\"delete\" onclick=\"javascript:fnDeleteIndex('" +index1+ "');\" class=\"delete-buttons\" hidden></td>" +
						"<td>" +index1+ "</td>" +
						"<td>" +flavor+ "</td>" +
						"<td>" +type+ "</td>" +
						"<td>" +dateCreated+ "</td>" +
						"<td>" +numComponents+ "</td>" +
						"</tr>";
				});
				
			}else{
				log("No index found in response: " + r);
			}
			
			if(publicIndex){
				$(publicIndex).each(function(i) {
					var iodIndex = new IODIndex();
					
					var index1 = publicIndex[i].index;
					iodIndex.setIndex(index1);
					var type = publicIndex[i].type;
					iodIndex.setType(type);
					
					indexes.push(iodIndex);
					
					indexesHTML  += "<tr>" +
						"<td>&nbsp;</td>" +
						"<td>" +index1+ "</td>" +
						"<td>&nbsp;</td>" +
						"<td>" +type+ "</td>" +
						"<td>&nbsp;</td>" +
						"<td>&nbsp;</td>" +
						"</tr>";
				});
				
			}else{
				log("No public_index found in response: " + r);
			}
			
			indexesHTML  += "</table>";
				$('#main').append( indexesHTML );
				
				$('#check-toggle-delete-buttons').click( function(event) {        
					$('.delete-buttons').toggle('show');
				});
		}
	}
	log("List Indexes: End");
}

