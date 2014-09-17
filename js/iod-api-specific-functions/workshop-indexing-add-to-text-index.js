function fnAddToTextIndexFiles(indexName, files1){
	
	log("Upload "+files1.length+" file(s).");
	
	var fileslength = files1.length;
	var params = new Array();
	var param1 = {key: "index", value: indexName};
	params.push(param1);
	
	var totalsizeOfUploadFiles = 0;

	for(var i =0; i<fileslength; i++)
	{           
		var file1 = files1[i];
		var filesizeInBytes = file1.size;
		var filesizeInMB = (filesizeInBytes / (1024*1024)).toFixed(2);
		var filename = file1.name;
		
		var param2 = {key: "file", value: file1};
		params.push(param2);
		
		var additionalMetaData = "{ \"reference\" : \""+filename+"\" , \"issue\" : \"September 2014\" }";
		log("Add to Text Index with metadata: "+additionalMetaData);
		var param3 = {key: "additional_metadata", value: additionalMetaData};
		params.push(param3);
		
		log("filename: "+filename + ", filesize in MB: "+ filesizeInMB);
		totalsizeOfUploadFiles += parseFloat(filesizeInMB);
		//log(totalsizeOfUploadFiles.toFixed(2)+" MB");     
	}    
	
	var iodClient = new IODClient();
    
    var iodRequest =  iodClient.createIODRequest(IOD.API_ADDTOTEXTINDEX);
    iodRequest.setParams(params);
    
	log("POST Add to Text Index request");
    iodRequest.post(fnAddToTextIndex_Callback);
	
}

function fnAddToTextIndex_Callback(response){
	log('fnAddToTextIndex_Callback - Begin');
	
	// reset
	references = new Array();
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			if(json.index && json.references){
				var index = json.index;
				var iodReferences = json.references;
				var addedReferencesHTML = 
					"<h3>Add to Text Index - References</h3>"+
					"<table>"+
					"<tr><th>id</th><th>reference</th><th>index</th></tr>";
				$(iodReferences).each(function(i) {
					var ref = iodReferences[i];
					
					var iodReference = new IODReference();
					iodReference.setIndex(index);
					var id = ref.id;
					iodReference.setId(id);
					var reference = ref.reference;
					iodReference.setReference(reference);
					
					references.push(iodReference);
					
					addedReferencesHTML += "<tr><td>"+id+"</td><td>"+reference+"</td><td>"+index+"</td></tr>";
				});
				addedReferencesHTML += "</table>";
				$('#main').html( addedReferencesHTML );
			}
		}
	}
}



function fnAddToTextIndexUrl(indexName, urlToAdd){
	
	log("Add to Text Index, url: "+urlToAdd);
	
	var params = new Array();
	var param1 = {key: "index", value: indexName};
	params.push(param1);
	var param2 = {key: "url", value: urlToAdd};
	params.push(param2);
	
	var additionalMetaData = "{ \"reference\" : \""+urlToAdd+"\" , \"issue\" : \"September 2014\" }";
	log("Add to Text Index with metadata: "+additionalMetaData);
	var param3 = {key: "additional_metadata", value: additionalMetaData};
	params.push(param3);
		
	var iodClient = new IODClient();
    
    var iodRequest =  iodClient.createIODRequest(IOD.API_ADDTOTEXTINDEX);
    iodRequest.setParams(params);
    
	log("POST Add to Text Index (URL) request");
    iodRequest.post(fnAddToTextIndex_Callback);
	
}

function fnAddToTextIndexUrl_Callback(response){
	log('fnAddToTextIndexUrl_Callback - Begin');
	
	// reset
	references = new Array();
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			if(json.index && json.references){
				var index = json.index;
				var iodReferences = json.references;
				var addedReferencesHTML = 
					"<h3>Add to Text Index - References</h3>"+
					"<table>"+
					"<tr><th>id</th><th>reference</th><th>index</th></tr>";
				$(iodReferences).each(function(i) {
					var ref = iodReferences[i];
					
					var iodReference = new IODReference();
					iodReference.setIndex(index);
					var id = ref.id;
					iodReference.setId(id);
					var reference = ref.reference;
					iodReference.setReference(reference);
					
					references.push(iodReference);
					
					addedReferencesHTML += "<tr><td>"+id+"</td><td>"+reference+"</td><td>"+index+"</td></tr>";
				});
				addedReferencesHTML += "</table>";
				$('#main').html( addedReferencesHTML );
			}
		}
	}
}
