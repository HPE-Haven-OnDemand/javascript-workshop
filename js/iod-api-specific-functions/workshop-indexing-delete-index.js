var indexNameToDelete = "";

function fnDeleteIndex(indexName, confirmKey){	
	log("Delete index: "+indexName); 
	indexNameToDelete = indexName;
	
	if(confirmKey){
		var confirmMessage = "Are you sure you want to delete the index '"+indexName+"'";
		var confirmDelete = confirm(confirmMessage);
		if(! confirmDelete){
			log("Stop");
			return false;
		}else{
			log("Okay, continue");
		}
	}else{
		log("Do not confirm delete.");
	}
	var iodClient = new IODClient();
    
    var iodRequest =  iodClient.createIODRequest(IOD.API_DELETEINDEX);
    
    var params = new Array();
	var param1 = {key: "index", value: indexName};
	params.push(param1);
	if(confirmKey!=null && confirmKey!=""){
		log("Add Param: "+confirmKey);
		var param2 = {key: "confirm", value: confirmKey};
		params.push(param2);
	}else{
		log("No confirmKey found.");
	}
	iodRequest.setParams(params);
    
	log("POST Delete Index request");
    iodRequest.post(fnDeleteIndex_Callback);
}

function fnDeleteIndex_Callback(response){	
	log("Delete Index Callback");
	var indexes = new Array();
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		if(r){
			log("Response: "+r);
			var json = JSON.parse(r);
			if(json.error){
				log("Error: "+r);
			}else if( (json.deleted!=null)) {
				if((json.deleted==false)){
					if((json.confirm!=null) && (json.confirm!="") ){
						var confirmKey = json.confirm;
						log("Confirm delete index: "+indexNameToDelete+", key: "+confirmKey);
						fnDeleteIndex(indexNameToDelete, confirmKey);
					}else{
						log("Error: not deleted, but no confirm key found.");
					}
				}else{
					log("Index deleted.");
					displayListIndexes();
				}
			}else{
				log("Error: missing response parameter.");
			}
		}
	}
}

