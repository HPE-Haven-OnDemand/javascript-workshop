function fnDisplayContent(){

	var mainHTML = 
	"<div class=\"container-fluid\">" +
		"<div class=\"header\">	" +
			"<ul class=\"nav nav-pills\">" +
			  "<li id=\"logo\"><img src=\"images/HP_IDOLOnDemand_logo.png\"/></li>" +
			  "<li><a href=\"\" id=\"nav-link-indexing\"><span class=\"glyphicon glyphicon-star\"></span> Indexing</a></li>" +
			  "<li><a href=\"\" id=\"nav-link-analysis\"><span class=\"glyphicon glyphicon-star\"></span> Analysis</a></li>" +
			  "<li><a href=\"\" id=\"nav-link-search\"><span class=\"glyphicon glyphicon-star\"></span> Search</a></li>" +
			"</ul>" +
		"</div>" +
		"<div class=\"content-area\">" +
			"<div id=\"toc\">" +
				"<h4>IDOL OnDemand (Preview) - Workshop</h4>" +
				"<div id=\"steps\" >" +
					"<table id=\"steps\">" +
					"<tr>"+
						"<th>Step 1: Indexing APIs</th>"+
						"<th>Step 2: Analysis APIs</th>"+
						"<th>Step 3: Search APIs</th>"+
						"<th>Step 4: Creating Workflows</th>"+
					"</tr>" +
					"<tr><td id=\"cell1\">" +
						"<ul>" +
							"<li><a id=\"toc-list-indexes\">List Indexes</a></li>" +
							"<li><a id=\"toc-create-index\">Create Index</a></li>" +
							"<li>Add to Text Index</li>" +
								"<ul>" +
									"<li><a id=\"toc-add-to-text-index-files\">Files</a></li>" +
									"<li><a id=\"toc-add-to-text-index-url\">URL</a></li>" +
									"<li>Text</li>" +
									//"<li><a id=\"toc-twitter\">Twitter</a></li>" +
								"</ul>" +
							"<li>Connector" +
								"<ul>" +
									"<li>Create Connector</li>" +
									"<li>Connector Status</li>" +
									"<li>Start Connector</li>" +
								"</ul>" +
							"</li>" +
						"</ul>" +
					"</td><td id=\"cell2\">" +
						"<ul>" +
						  "<li>Language Identification</li>" +
						  "<li><a id=\"toc-analysis-sentiment-analysis\">Sentiment Analysis</a> (uses Get Content for &quot;reference&quot;)</li>" +
						  "<li><a id=\"toc-analysis-entity-extraction\">Entity Extraction</a></li>" +
						  "<li>View Document</li>" +
						  "<li>Highlight Text</li>" +
						  "<li>Face Detection</li>" +
						  "<li>Face Recognition</li>" +
						  "<li>OCR (Image to Text)</li>" +
						  "<li>Barcode Recognition</li>" +
						  "<li>Categorize Document</li>" +
						"</ul>" +
					"</td><td id=\"cell3\">" +
						"<ul>" +
						  "<li><a id=\"toc-search-get-content\">Get Content</a></li>" +
						  "<li><a id=\"toc-search-query-text-index\">Query Text Index</a></li>" +
						  "<li><a id=\"toc-search-find-similar-documents\">Find Similar Documents</a></li>" +
						  "<li><a id=\"toc-search-find-related-concepts\">Find Related Concepts</a></li>" +
						  "<li><a id=\"toc-search-get-parametric-values\">Get Parametric Values</a></li>" +
						"</ul>" +
					"</td>"+
					"</td><td id=\"cell4\">" +
						"<ul>" +
						  "<li>Query Text Index, Get Content by Reference and Get Parametric Values</li>" +
						  "<li>Detect Language with Sentiment Analysis, and use Top Positive Topics for Find Similar Documents</li>"+
						"</ul>"+
						"<ul>"+
						  "<li><a id=\"toc-my-api-one\">My IDOL OnDemand API One</a></li>"+
						  "<li><a id=\"toc-my-api-two\">My IDOL OnDemand API Two</a></li>"+
						  "<li><a id=\"toc-my-api-workflow\">(bonus) My IDOL OnDemand Workflow</a></li>"+
						  "<li>(bonus) <a href=\"https://www.idolondemand.com/developer/apis/createconnector#overview\" target=\"_blank\">Create Connector</a> via UI</li>"+
						  "<li>(bonus) <a href=\"https://www.idolondemand.com/developer/apis/startconnector#overview\" target=\"_blank\">Start Connector</a> via UI</li>"+
						"</ul>" +
					"</td>"+
					"</tr>" +
					"</table>" +
				"</div>" +
			"</div>" +
			"<div id=\"main-wrapper\">" +
				"<div id=\"main\"></div>" +
			"</div>	" +
			"<div id=\"log\"></div>" +
		"</div>" +
	    "<div class=\"footer\">&nbsp;</div>" +
    "</div><!-- /.container -->";
	
	$('body').html( mainHTML );
	fnInit();
}

function fnInit(){

	var initHtml = "Click an API to start the workshop.";
	$('#main').html( initHtml );
	
	// Indexing
	$('#toc-list-indexes').click( function() {
	   displayListIndexes();  
	});
	$('#toc-create-index').click( function() {
	   displayCreateIndex();  
	});
	$('#toc-add-to-text-index-files').click( function() {
	   displayAddToTextIndexFiles();  
	});
	$('#toc-add-to-text-index-url').click( function() {
	   displayAddToTextIndexUrl();  
	});
	
	// Analysis
	$('#toc-analysis-sentiment-analysis').click( function() {
	   displaySentimentAnalysis();  
	});
	$('#toc-analysis-entity-extraction').click( function() {
	   displayEntityExtraction();  
	});
	
	// Search
	
	$('#toc-search-get-content').click( function() {
	   displayGetContent();  
	});
	$('#toc-search-query-text-index').click( function() {
	   displayQueryTextIndex();  
	});
	$('#toc-search-find-similar-documents').click( function() {
	   displayFindSimilarDocuments();  
	});
	$('#toc-search-find-related-concepts').click( function() {
	   displayFindRelatedConcepts();  
	});
	$('#toc-search-get-parametric-values').click( function() {
	   displayGetParametricValues();  
	});
	
	$('#toc-my-api-one').click( function() {
	   fnMyApiOne();  
	});
	$('#toc-my-api-two').click( function() {
	   fnMyApiTwo();  
	});
	$('#toc-my-api-workflow').click( function() {
	   fnMyApiWorkflow();  
	});
	
}

function displayListIndexes(){

	// makes implicit call to list indexes
	log('List Indexes: Begin');
	var listIndexesHtml = "<h3>List Indexes</h3>";
	$('#main').html( listIndexesHtml );

	fnListIndexes();
}

function displayCreateIndex(){
	
	log("Create Index: Begin");
	var createIndexHtml = 
		"<div id=\"div-create-index\">"+
		"<h3>Create Index</h3>"+
		"<label for=\"index-name\">Index name:</label><input type=\"text\" id=\"index-name\"><br>"+
		"<label for=\"index-flavor\">Flavor</label>"+
		"<select id=\"index-flavor\">"+
			"<option value=\"standard\">Standard</option>"+
			"<option value=\"explorer\">Explorer</option>"+
		"</select><br>"+ 
		"<input type=\"button\" value=\"Create\" id=\"btn-create-index\">"+
		"</div><br><br>";
	
	if($('#div-create-index').length){
		$('#div-create-index').html(createIndexHtml);
	}else{
		$('#main').html( createIndexHtml );
	}
	
	$('#btn-create-index').click( function() {
		var indexName = $('#index-name').val();
		var indexFlavor = $('#index-flavor').val();
		fnCreateIndex(indexName, indexFlavor);
	});
}

function displayAddToTextIndexFiles(){
	
	log("Add to Text Index (Files): Begin");
	
	var indexHTML = getIndexesHtml();
	
	var addToTextIndexFilesHTML = 
		"<div id=\"div-add-to-text-index\">" +
		"<h3>Add to Text Index (Files)</h3>" +
		"<label for=\"index-name\">Index name:</label>" +
		indexHTML+ "<br>" +
		"<input type=\"file\" name=\"files[]\" id=\"file\" multiple >" +
		"<input type=\"button\" value=\"Add\" id=\"btn-add-to-text-index\">" +
		"</div><br><br>";
		
	if($('#div-add-to-text-index').length){
		$('#div-add-to-text-index').html(addToTextIndexFilesHTML);
	}else{
		$('#main').html( addToTextIndexFilesHTML );
	}
	
	$('#btn-add-to-text-index').click( function() {
		var indexName = $('#index-name').val();
		var files1 = $('#file');
		if(files1){
			var files = files1[0].files;
			fnAddToTextIndexFiles(indexName, files);
		}else{
			log('Error: no files selected.');
		}
	});
}


function displayAddToTextIndexUrl(){
	
	log("Add to Text Index URL: Begin");
	
	var indexHTML = getIndexesHtml();
	
	var addToTextIndexUrlHTML = 
		"<div id=\"div-add-to-text-index\">" +
		"<h3>Add to Text Index (URL)</h3>" +
		"<label for=\"index-name\">Index name:</label>" +
		indexHTML+ "<br>" +
		"<input type=\"text\" name=\"url\" id=\"url\" size=\"75\" value=\"http://www.plosgenetics.org/article/info:doi/10.1371/journal.pgen.1004610\"><br>" +
		"<input type=\"button\" value=\"Add to Text Index\" id=\"btn-add-to-text-index-url\">" +
		"</div><br><br>";
		
	if($('#div-add-to-text-index').length){
		$('#div-add-to-text-index').html(addToTextIndexUrlHTML);
	}else{
		$('#main').html( addToTextIndexUrlHTML );
	}
	
	$('#btn-add-to-text-index-url').click( function() {
		var indexName = $('#index-name').val();
		var url = $('#url').val();
		if(url){
			fnAddToTextIndexUrl(indexName, url);
		}else{
			log('Error: no URL found.');
		}
	});
}

function displaySentimentAnalysis(){
	
	log("Display Sentiment Analysis");
	
	var referencesHTML = getReferencesHtml();	
	var indexesHTML = getIndexesHtml();
	
	var urlHTML = "<input type=\"radio\" name=\"inputType\" value=\"url\" checked><input type=\"text\" id=\"urlToAnalyze\" value=\"http://www.plosgenetics.org/article/info:doi/10.1371/journal.pgen.1004610\" size=\"100\">";
	
	var sentimentAnalysisHTML = 
		"<div id=\"div-sentiment-analysis\">" +
		"<h3>Sentiment Analysis</h3>" +
		"<label for=\"index-name\">Index:</label>" +indexesHTML+ "<br>" +
		"<label for=\"reference\">By reference:</label>" +referencesHTML+ "<br>" +
		"<label for=\"url\">By URL:</label>" +urlHTML+ "<br>" +
		"<input type=\"button\" value=\"Analyze Sentiment\" id=\"btn-sentiment-analysis\">" +
		"</div><br>";
		
	if($('#div-sentiment-analysis').length){
		$('#div-sentiment-analysis').html(sentimentAnalysisHTML);
	}else{
		$('#main').html( sentimentAnalysisHTML );
	}
	
	$('#btn-sentiment-analysis').click( function() {
		var inputType = $('input[name=inputType]:checked').val();
		if(inputType=='reference'){
			var indexName = $('#index-name').val();
			var refToAnalyze = $('#reference').val();
			getContentForSentimentAnalysis(indexName, refToAnalyze);
		}else if(inputType=='url'){
			var urlToAnalyze = $('#urlToAnalyze').val();
			log("urlToAnalyze: " +urlToAnalyze);
			sentimentAnalysis(inputType, urlToAnalyze);
		}else{
			log('Error: unknown inputType: ' +inputType);
		}
	});
}


function displayEntityExtraction(){
	
	log("Display Entity Extraction");
	
	var referencesHTML = getReferencesHtml();
	
	var urlHTML = "<input type=\"radio\" name=\"inputType\" value=\"url\" checked><input type=\"text\" id=\"urlToAnalyze\" value=\"http://www.plosgenetics.org/article/info:doi/10.1371/journal.pgen.1004610\" size=\"100\">";
	
	var entityExtractionHTML = 
		"<div id=\"div-entity-extraction\">" +
		"<h3>Entity Extraction</h3>" +
		//"<label for=\"reference\">By reference:</label>" referencesHTML "<br>" +
		"<label for=\"url\">By URL:</label>" +urlHTML+ "<br>" +
		"<label>Entities:</label> "+
		"<input type=\"checkbox\" name=\"entities[]\" value=\"organizations\" checked> <label>Organizations</label>" +
		" <input type=\"checkbox\" name=\"entities[]\" value=\"people_eng\" checked> <label for=\"people\">People</label>" +
		" <input type=\"checkbox\" name=\"entities[]\" value=\"universities\"> <label for=\"people\">Universities</label>" +
		" <input type=\"checkbox\" name=\"entities[]\" value=\"drugs_eng\" > <label for=\"people\">Drugs_Eng</label><br>" +
		"<input type=\"button\" value=\"Extract Entities\" id=\"btn-entity-extraction\">" +
		"</div><br>";
		
	if($('#div-entity-extraction').length){
		$('#div-entity-extraction').replace(entityExtractionHTML);
	}else{
		$('#main').html( entityExtractionHTML );
	}
	
	$('#btn-entity-extraction').click( function() {
		var inputType = $('input[name=inputType]:checked').val();
		
		var entitiesChecked = new Array();
		$.each($("input[name='entities[]']:checked"), function() {
			var entityChecked = $(this).val();
			entitiesChecked.push(entityChecked);
		});
		//log("entities: "+ entitiesChecked.join());
		if(inputType=='reference'){
			var refToAnalyze = $('#reference').val();
			// todo
		}else if(inputType=='url'){
			var urlToAnalyze = $('#urlToAnalyze').val();
			log("urlToAnalyze: " +urlToAnalyze);
			entityExtraction(inputType, urlToAnalyze, entitiesChecked);
		}else{
			log('Error: unknown inputType: ' +inputType);
		}
	});
}

function displayListIndexes(){

	log('List Indexes: Begin');
	var listIndexesHtml = "<h3>List Indexes</h3>";
	$('#main').html( listIndexesHtml );

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

function displayQueryTextIndex(){

	var title = "Query Text Index";
	log(title+": Begin");
	
	var indexHTML = getIndexesHtml();

	var queryTextIndexHTML = 
		"<div id=\"div-query-text-index\">" +
			"<h3>"+title+"</h3>" +
			"<label for=\"index-name\">Index name:</label>" +
			indexHTML+ "<br>" +
			"<label for=\"queryText\">Enter search text:</label><input type=\"text\" id=\"queryText\" value=\"apis\" ><br>" +
			"<label>Summary: </label>"+
			"<input type=\"radio\" name=\"summary\" id=\"summary\" value=\"context\" checked> <label>context</label>"+
			"<input type=\"radio\" name=\"summary\" id=\"summary\"  value=\"concept\"> <label>concept</label>"+
			"<input type=\"radio\" name=\"summary\" id=\"summary\"  value=\"quick\"> <label>quick</label>"+
			"<input type=\"radio\" name=\"summary\" id=\"summary\"  value=\"off\"> <label>off</label><br>"+
			"<label>Field Text: </label><input type=\"text\" id=\"field-text\" > E.g. MATCH{APPLICATION PROGRAMMING INTERFACES}:WIKIPEDIA_CATEGORY<br>" +
			"<input type=\"button\" value=\"Search\" id=\"btn-query-text-index\">" +
		"</div><br>";
		
	if($('#div-query-text-index').length){
		$('#div-query-text-index').html(queryTextIndexHTML);
	}else{
		$('#main').html( queryTextIndexHTML );
	}
	
	$('#btn-query-text-index').click( function() {
		var indexName = $('#index-name').val();
		var queryText = $('#queryText').val();
		var summary = $('input[name=summary]:checked').val();
		var fieldText = $('#field-text').val();;
		if(queryText){
			fnQueryTextIndexFiles(indexName, queryText, summary, fieldText);
		}else{
			log('Error: no query entered.');
		}
	});
}

function displayGetContent(){

	var title = "Get Content";
	log(title+": Begin");
	
	var indexesHTML = getIndexesHtml();
	
	var inputHtml = "<label for=\"reference\">Reference:</label> <input type=\"text\" id=\"reference\" value=\"\" size=\"100\"><br>";
	inputHtml += "<label for=\"highlight\">Highlight:</label> <input type=\"text\" id=\"highlight\" value=\"\" size=\"100\"><br>";
	
	var html = 
		"<div id=\"div-get-content\">" +
		"<h3>"+title+"</h3>" +
		"<label for=\"index-name\">Index:</label>" +indexesHTML+ "<br>" +
		"" +inputHtml+ "<br>" +
		"<input type=\"button\" value=\"Get Content\" id=\"btn-get-content\">" +
		"</div><br>";
		
	if($('#div-get-content').length){
		$('#div-get-content').replace(html);
	}else{
		$('#main').html( html );
	}
	
	$('#btn-get-content').click( function() {
		var indexName = $('#index-name').val();
		var reference = $('#reference').val();
		var highlight = $('#highlight').val();
		if(reference){
			fnGetContent(indexName, reference, highlight);
		}else{
			log('Error: unknown reference');
		}
	});
}
 
function displayFindSimilarDocuments(){

	var title = "Find Similar Documents";
	log(title+": Begin");
	
	var referencesHTML = getReferencesHtml();	
	var indexesHTML = getIndexesHtml();
	
	var urlHTML = "<input type=\"radio\" name=\"inputType\" value=\"url\" checked><input type=\"text\" id=\"urlToAnalyze\" value=\"http://www.plosgenetics.org/article/info:doi/10.1371/journal.pgen.1004610\" size=\"100\">";
	
	var findSimilarDocumentsHTML = 
		"<div id=\"div-find-similar-documents\">" +
		"<h3>"+title+"</h3>" +
		"<label for=\"index-name\">Index:</label>" +indexesHTML+ "<br>" +
		//"<label for=\"reference\">By reference:</label>" +referencesHTML+ "<br>" +
		"<label for=\"url\">By URL:</label>" +urlHTML+ "<br>" +
		"<input type=\"button\" value=\"Find Similar Documents\" id=\"btn-find-similar-documents\">" +
		"</div><br>";
		
	if($('#div-find-similar-documents').length){
		$('#div-find-similar-documents').replace(findSimilarDocumentsHTML);
	}else{
		$('#main').html( findSimilarDocumentsHTML );
	}
	
	$('#btn-find-similar-documents').click( function() {
		var inputType = $('input[name=inputType]:checked').val();
		var indexName = $('#index-name').val();
		
		if(inputType=='reference'){
			var refToAnalyze = $('#reference').val();
			fnFindSimilarDocuments(indexName, "reference", refToAnalyze);
		}else if(inputType=='url'){
			var url = $('#urlToAnalyze').val();
			fnFindSimilarDocuments(indexName, "url", url);
		}else{
			log('Error: unknown inputType: ' +inputType);
		}
	});
}

function displayFindRelatedConcepts(){

	var title = "Find Related Concepts";
	log(title+": Begin");
		
	var indexesHTML = getIndexesHtml();
	
	var inputHTML = "<label for=\"concept\">Search for Concept:</label><input type=\"text\" id=\"concept\" value=\"APIs\" >";
	
	var findRelatedConceptsHTML = 
		"<div id=\"div-find-related-concepts\">" +
		"<h3>"+title+"</h3>" +
		"<label for=\"index-name\">Index:</label>" +indexesHTML+ "<br>" +
		"" +inputHTML+ "<br>" +
		"<input type=\"button\" value=\"Find Related Concepts\" id=\"btn-find-related-concepts\">" +
		"</div><br>";
		
	if($('#div-find-related-concepts').length){
		$('#div-find-related-concepts').replace(findRelatedConceptsHTML);
	}else{
		$('#main').html( findRelatedConceptsHTML );
	}
	
	$('#btn-find-related-concepts').click( function() {
		log("1");
		var indexName = $('#index-name').val();
		var concepts = $('#concept').val();
		if(concepts){
			fnFindRelatedConcepts(indexName, concepts);
		}else{
			log('Error: unknown concept: ' +concept);
		}
		
	});
}

function displayGetParametricValues(){

	var title = "Get Parametric Values";
	log(title +": Begin");
	
	var indexesHTML = getIndexesHtml();
	
	var functionHTML = 
		"<div id=\"div-get-parametric-values\">" +
		"<h3>"+title+"</h3>" +
		"<label>Index:</label>" +indexesHTML+ "<br>" +
		"<label>Field Name:</label><input type=\"text\" id=\"field-name\" value=\"*\"><br>" +
		"<label>Search:</label><input type=\"text\" id=\"search-term\" value=\"apis\"><br>" +
		"<input type=\"button\" value=\"Get Parametric Values\" id=\"btn-get-parametric-values\">" +
		"</div><br>";
		
	if($('#div-get-parametric-values').length){
		$('#div-get-parametric-values').replace(functionHTML);
	}else{
		$('#main').html( functionHTML );
	}
	
	$('#btn-get-parametric-values').click( function() {
		var indexName = $('#index-name').val();
		var fieldName = $('#field-name').val();
		var searchTerm = $('#search-term').val();
		fnGetParametricValues(indexName, fieldName, searchTerm);
	});
}


