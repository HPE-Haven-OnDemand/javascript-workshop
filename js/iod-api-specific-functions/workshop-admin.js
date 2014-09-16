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
						  "<li>Query Text Index with Get Parametric Values</li>" +
						  "<li>Detect Language with Sentiment Analysis, and use Top Positive Topics for Find Similar Documents</li>"+
						"</ul>"+
						"<ul>"+
						  "<li><a id=\"toc-my-api-one\">My IDOL OnDemand API One</a></li>"+
						  "<li><a id=\"toc-my-api-two\">My IDOL OnDemand API Two</a></li>"+
						  "<li><a id=\"toc-my-api-workflow\">My IDOL OnDemand Workflow</a></li>"+
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


function log(text, level){
	if(!level || level==""){
		level = "Info";
	}
	var log = document.getElementById('log');
	if(log.innerHTML==""){
		clearLog();
	}
	log.innerHTML  += timeStamp() + ": " + level + ": " + text + "<br>";  	
}
function timeStamp() {
	var date = new Date();
	var ts = date.getFullYear() +  "-"  + (date.getMonth() +  1) +  "-"  + date.getDate() +  " "  +  date.getHours() +  ":"  + date.getMinutes() +  ":" +  date.getSeconds();
	return ts;
}
function clearLog(){
	var divLog = document.getElementById('log');
	var initLogHTML = "<input type=\"button\" value=\"Clear\" id=\"btn-clear-log\" onclick=\"javascript:clearLog()\">Log:<br>";
	divLog.innerHTML = initLogHTML;
	$('#btn-clear-log').click( function() {
	   divLog.innerHTML += initLogHTML;  
	});
	log("Log cleared");
}

function getIndexesHtml(){
	var indexHTML = "";
	
	indexHTML += "<select id=\"index-name\">";
	
	if(indexes){
		$(indexes).each(function(i) {	
			var index1 = indexes[i];
			indexHTML  += "<option value=\"" +index1.getIndex()+ "\">"+ index1.getIndex()+ "</option>"; 
		});
	}else{
		indexHTML  += "<option value=\"wiki_eng\">wiki_eng</option>"; 
		indexHTML  += "<option value=\"news_eng\">news_eng</option>"; 
		indexHTML  += "<option value=\"world_factbook\">world_factbook</option>"; 
		indexHTML  += "<option value=\"patents\">patents</option>";
		indexHTML  += "<option value=\"apiworld-index\">apiworld-index</option>"; 
	}
	
	indexHTML  += "</select>";

	return indexHTML;
}

function getReferencesHtml(){
	var referencesHTML = "";	
	if(references){
		referencesHTML += "<input type=\"radio\" name=\"inputType\" value=\"reference\"><select id=\"reference\">";
		$(references).each(function(i) {	
			var ref = references[i];
			referencesHTML  += "<option value=\"" +ref.getReference()+ "\">" +ref.getReference()+ "</option>"; 
		});
		referencesHTML  += "</select>";
	}else{
		log("No references found.");
		referencesHTML += "<input type=\"radio\" name=\"inputType\" value=\"reference\"><input type=\"text\" id=\"reference\" value=\"nejmoa0804633.pdf\">";
	}
	return referencesHTML;
}

function replaceAll(str, search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return str.replace(new RegExp('[' + search + ']', 'g'), replace);
};