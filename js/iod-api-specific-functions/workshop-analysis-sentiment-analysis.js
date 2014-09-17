var content = null;

function sentimentAnalysis(inputType, inputValue){
	log("Sentiment Analysis, "+inputType+": "+inputValue.substr(1,100));
		
	var iodClient = new IODClient();
    
    var iodRequest =  iodClient.createIODRequest(IOD.API_SENTIMENT_ANALYSIS);
    
    var params = new Array();
	//inputValue = encodeURIComponent(inputValue);
	var param1 = {key: inputType, value: inputValue};
	params.push(param1);
	
	iodRequest.setParams(params);
    
	log("POST Sentiment Analysis request");
    iodRequest.post(sentimentAnalysis_Callback);
}

function sentimentAnalysis_Callback(response){
	log('sentimentAnalysis_Callback');
	
	//var indexes = new Array();
	if(response.errorText){
		log(response.errorText, "Error");
	}else {
		var r = response.getResponseText();
		//log("Response: "+r);
		if(r){
			var json = JSON.parse(r);
			var sentimentsHtml = "";
			
			if(json.aggregate){				
				sentimentsHtml += "<table>";
				sentimentsHtml += "<tr id=\"aggregate\"><th colspan=\"2\">Aggregate</th></tr>";
				sentimentsHtml += "<tr><th>score</th><th>sentiment</th></tr>";
				var aggregate = json.aggregate;
				var sentiment = aggregate.sentiment;
				var score = aggregate.score;
				var score = aggregate.score;
				sentimentsHtml += "<tr><td>"+score+"</td><td>"+sentiment+"</td></tr>";
				sentimentsHtml += "</table>";
				log("Aggregated sentiment: "+sentiment+", score: "+score); 
			}
			
			if(json.positive){
				var sentiments = json.positive;
				log("Positive.length: "+sentiments.length);
				
				var iodSentiments = new Array();
				$(sentiments).each(function(i) {
					var positive = sentiments[i];
					var sentiment = positive.sentiment;
					var topic = positive.topic;
					var score = positive.score;
					var originalText = positive.original_text;
					var originalLength = positive.original_length;
					var normalizedText = positive.normalized_text;
					var normalizedLength = positive.normalized_length;
					
					var iodSentiment = new IODSentiment();
					iodSentiment.setSentiment(sentiment);
					iodSentiment.setTopic(topic);
					iodSentiment.setScore(score);
					iodSentiments.push(iodSentiment);
				});
				
				iodSentiments.sort(function(a, b){
					return b.score-a.score;
				})
				
				sentimentsHtml += "<table>";
				sentimentsHtml += "<tr id=\"positive\"><th colspan=\"4\">Positive</th></tr>";
				sentimentsHtml += "<tr><th>score</th><th>sentiment</th><th>topic</th><th>normalized text</th></tr>";
				var topTenPositiveTopics = "";
				$(iodSentiments).each(function(i) {
					var iodSentiment = iodSentiments[i];
					
					var sentiment = iodSentiment.sentiment;
					var topic = iodSentiment.topic;
					var score = iodSentiment.score;
					var originalText = iodSentiment.original_text;
					var originalLength = iodSentiment.original_length;
					var normalizedText = iodSentiment.normalized_text;
					var normalizedLength = iodSentiment.normalized_length;
					
					topTenPositiveTopics += ", " + topic;
					
					sentimentsHtml += "<tr><td>"+score+"</td><td>"+sentiment+"</td><td>"+topic+"</td><td>"+normalizedText+"</td></tr>";
				});
				sentimentsHtml += "</table>";
				
				var indexHTML = getIndexesHtml();
				sentimentsHtml += "<label for=\"index-name\">Index name:</label>" +
				indexHTML+ "<br>";
		
				//var encodedTopics = encodeURIComponent(topTenPositiveTopics);
				sentimentsHtml += "<a href=\"javascript:fnFindSimilarForTopTenTopics(\'"+topTenPositiveTopics+"\');\">Find Similar for Top 10 Positive Topics</a><br><br>";
				
			}
			if(json.negative){
				var sentiments = json.negative;
				log("Negative.length: "+sentiments.length);
				sentimentsHtml += "<table>";
				sentimentsHtml += "<tr id=\"negative\"><th colspan=\"4\">Negative</th></tr>";
				sentimentsHtml += "<tr><th>score</th><th>sentiment</th><th>topic</th><th>normalized text</th></tr>";
				$(sentiments).each(function(i) {
					
					var negative = sentiments[i];
					var sentiment = negative.sentiment;
					var topic = negative.topic;
					var score = negative.score;
					var originalText = negative.original_text;
					var originalLength = negative.original_length;
					var normalizedText = negative.normalized_text;
					var normalizedLength = negative.normalized_length;
					
					sentimentsHtml += "<tr><td>"+score+"</td><td>"+sentiment+"</td><td>"+topic+"</td><td>"+normalizedText+"</td></tr>";
				});
				sentimentsHtml += "</table>";
			}
			$('#main').html( sentimentsHtml );
		}
	}
}

function getContentForSentimentAnalysis(indexName, reference){
	log('getContentForSentimentAnalysis - Begin');
		
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

function getContentForSentimentAnalysis_Callback(response){
	log('getContentForSentimentAnalysis_Callback');
	
	//var indexes = new Array();
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

