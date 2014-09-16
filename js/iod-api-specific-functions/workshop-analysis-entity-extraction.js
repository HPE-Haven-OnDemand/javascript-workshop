var content = null;

function entityExtraction(inputType, inputValue, entities){
	log("Entity Extraction, "+inputType+": "+inputValue.substr(1,100)+", entities: "+entities.join());
		
	var iodClient = new IODClient();
    
    var iodRequest =  iodClient.createIODRequest(IOD.API_ENTITY_EXTRACTION);
    
    var params = new Array();
	//inputValue = encodeURIComponent(inputValue);
	var param1 = {key: inputType, value: inputValue};
	params.push(param1);
	$(entities).each(function(i) {
		var param2 = {key: "entity_type", value: entities[i]};
		params.push(param2);
	});
	
	iodRequest.setParams(params);
    
	log("POST Entity Extraction request");
    iodRequest.post(entityExtraction_Callback);
}

function entityExtraction_Callback(response){
	log('entityExtraction_Callback');
	
	var entities = new Array();
	var entitiesHTML = "";
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			if(json.entities){
				entitiesHTML = "<table>"+
					"<tr><th>normalized_text</th><th>type</th></tr>";
				var iodEntities = json.entities;
				$(iodEntities).each(function(i) {
					var iodEntity = iodEntities[i];
					var originalText = iodEntity.original_text;
					var normalizedText = iodEntity.normalized_text;
					var type = iodEntity.type;
					var normalizedLength = iodEntity.normalized_length;
					var originalLength = iodEntity.original_length;
					var score = iodEntity.score;
					var additionalInformation = iodEntity.additional_information;
					var components = iodEntity.components;
					
					var entity = new IODEntity();
					entity.setOriginalText(originalText);
					entity.setNormalizedText(normalizedText);
					entity.setType(type);
					entity.setNormalizedLength(normalizedLength);
					entity.setOriginalLength(originalLength);
					entity.setScore(score);
					
					entities.push(entity);
					
					entitiesHTML +=
						"<tr><td>"+normalizedText+"</td><td>"+type+"</td></tr>";
				});
				entitiesHTML += "</table>";
				$('#main').html( entitiesHTML );
			}
		}
	}
}

function getContentForEntityExtraction(indexName, reference){
	log('getContentForEntityExtraction - Begin');
		
	var iodClient = new IODClient();
    
    var iodRequest =  iodClient.createIODRequest(IOD.API_GETCONTENT);
    
    var params = new Array();
	var param1 = {key: "indexes", value: indexName};
	params.push(param1);
    var param2 = {key: "index_reference", value: reference};
	params.push(param2);
	var param3 = {key: "print", value: "all"};
	params.push(param3);
	
	iodRequest.setParams(params);
    
	log("POST Get Content request");
    iodRequest.post(getContentForSentimentAnalysis_Callback);
}

function getContentForEntityExtraction_Callback(response){
	log('getContentForEntityExtraction_Callback');
	
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			if(json.documents){
				var documents = json.documents;
				log("documents.length: "+documents.length);
				$(documents).each(function(i) {
					var doc = documents[i];
					var reference = doc.reference;
					var index = doc.index;
					var title = doc.title;
					var appName = doc.app_name;
					if(appName){
						appName = appName.join();
					}
					var author = doc.author;
					if(author){
						author = author.join();
					}
					//var contentType = doc.content-type;
					var createdDate = doc.created_date;
					if(createdDate){
						createdDate = createdDate.join();
					}
					var modifiedDate = doc.modified_date;
					if(modifiedDate){
						modifiedDate = modifiedDate.join();
					}
					var pageCount = doc.page_count;
					if(pageCount){
						pageCount = pageCount.join();
					}
					var subject = doc.subject;
					if(subject){
						subject = subject.join();
					}
					var iodreference = doc.iodreference;
					if(iodreference){
						iodreference = iodreference.join();
					}
					log("GetContent, found reference["+reference+
						"],index["+index+
						"],title["+title+
						"],appName["+appName+
						"],author["+author+
						"],contentType["+
						"], createdDate["+createdDate+
						"], modifiedDate["+modifiedDate+
						"], pageCount["+pageCount+
						"], subject["+subject+
						"], iodreference["+iodreference+"]");
					var content = doc.content;
					var inputType = "text";
					sentimentAnalysis(inputType, content);
				});
			}
		}
	}
	
	
			
			
}

