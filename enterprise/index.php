<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>IDOL OnDemand for Enterprise</title>
	
	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="../bootstrap-3.1.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="../bootstrap-3.1.1/css/bootstrap-theme.min.css">
	
	<link rel="stylesheet" href="../css/idolondemand-enterprise-core-v100.css">
	
  </head>

  <body>

    <div class="container-fluid">

		<div class="header">	
			<?php include "$_SERVER[DOCUMENT_ROOT]/businesscardreader/header.php"; ?>	
		</div>
	  
		<div class="content-area">
			
			<div id="instructions">
				<h2>IDOL OnDemand Enterprise v1</h2>
				<div id="steps" >
					<p>1. Extract the Text from your Business Card using OCR Document API</p>
					<p>2. Identify key information using Entity Extraction API</p>
					<p>3. Retrieve Company details using LinkedIN Company Lookup API</p>
				</div>
			
			</div>
		
			<div id="originalImage"></div>
		
			<div id="step"></div>
		
			<div id="loginstatus"></div>
			
			<div id="out"></div>
			
			
		</div>
	  
		<div class="footer">&nbsp;</div>
	  
    </div><!-- /.container -->

    
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../js/jquery-2.1.1.min.js"></script>
    <script src="../bootstrap-3.1.1/js/bootstrap.min.js"></script>
	<!-- IDOL OnDemand -->
	<script src="../js/idolondemand-config-v100.js"></script>
	<script src="../js/idolondemand-types-v100.js"></script>
	<script src="../js/idolondemand-restmanager-v100.js"></script>

	<script type="text/javascript">
	var iodRestManager = null;
	var out1 = document.getElementById('out');
	var step = document.getElementById('step');
	var member = null;
	var file1 = null;
	
	$(document).ready(function() {	
		iodRestManager = new IODRestManager();
		// for now just load the LinkedIN script
		// come up with a better scenario
		// explicitly check for login status and require user interaction
		// after user is indicating to want to do an IN lookup 
		//fnLoadLinkedIn();
		fnDisplayStep1();
	});
	
	function fnDisplayStep1(){
		// reset
		out1.innerHTML = "";
		file1 = null;
		$('#originalImage').empty();
		
		var step1 = 
		"<div id=\"step\">"+
		  "<h2>Read Business Cards using IDOL OnDemand</h2>"+
		  "<p>using OCR Document and Entity Extraction</p>"+
		  "<p>Select an image of a business card</p>"+
		  "<div class=\"form-fileupload\">"+
		    "<div class=\"form-group\">"+
			  "<label for=\"exampleInputFile\">File input</label>"+
			  "<input type=\"file\" id=\"input1\"><br>"+
			  "Choose OCR 'mode': <select style=\"color: black;\" id=\"mode1\"><option value=\"document_photo\" SELECTED>document_photo</option><option value=\"document_scan\">document_scan</option><option value=\"scene_photo\">scene_photo</option><option value=\"subtitle\">subtitle</option></select>"+
			"</div>"+
		    "<button type=\"submit\" class=\"btn btn-default\" id=\"buttonFileUpload\">Upload</button>"+
		  "</div>"+
		"</div>";
		
		$('#step').replaceWith(step1);
		$('#buttonFileUpload').click(fnButtonFileUploadOnClick);
		out1.innerHTML = "click to upload";
	}
	
	function fnButtonFileUploadOnClick(){
		out1.innerHTML = "Uploading file";
		var ocrRequest =  iodRestManager.createIODRequest('ocr');
		var mode1 = document.getElementById('mode1');
		var modeSelected = mode1.options[mode1.selectedIndex].value;
		file1 = getFileById('input1');
		if(! file1){
			out1.innerHTML = "select a file";
			return;
		}
		ocrRequest.setFile(file1);
		out1.innerHTML = "waiting for response";

		displayImage(file1);
		
		var params = new Array();
		var param1 = {key: "mode", value: modeSelected};
		params.push(param1);
		ocrRequest.setParams(params);
		
		ocrRequest.post(ocrRequestCallBack);
	};

	function displayImage(f){

		var reader = new FileReader();
	    reader.onload = (function(theFile) {
	        return function(e) {
	          var span = document.createElement('uploadedImage');
	          span.innerHTML = ['<img src="', e.target.result, '" title="', escape(theFile.name), '" height=\"200\"/>'].join('');
	          $('#originalImage').empty();
	          $('#originalImage').append(span);
	        };
	    })(f);
	    
        reader.readAsDataURL(f);
	      
	}

	function ocrRequestCallBack(ocrResponse){
	
		out1.innerHTML = "";
		
		//parse text_blocks
		var textBlocks = new Array();
		var extractedText = "";
		var r = ocrResponse.getResponseText();
		if(r){
			var json = JSON.parse(r);
			var text_block = json.text_block;
			if(text_block){
				$(text_block).each(function(i) {
					var textBlock = new TextBlock();
					var text = text_block[i].text;
					textBlock.setText(text);
					// toString()
					extractedText += textBlock.text;
					textBlocks.push(textBlock);
				});
			}else{
				out1.innerHTML = "No text_block in response from OCR:<br>"+r;
			}
		}else{
			out1.innerHTML = "No response from OCR.";
		}
		fnDisplayStep2(extractedText);
	}
	
	function fnDisplayStep2(extractedText){

		out1.innerHTML += "";
		
		var step2 = "<div id=\"step\">"+
		  "<h2>Identify key information using IDOL OnDemand APIs</h2>";

		step2 += "<div id=\"objectDetection\">"+
				"<h4>Object Recognition</h4>"+
				"<p>Click the 'Find Logo' button to detect company logos.</p>"+
				"<div id=\"divObjectRecognition\">"+
					"<button type=\"submit\" class=\"btn btn-default\" id=\"objectRecognitionButton\">Find Logo</button>"+
				"</div>"+
				"<div id=\"divObjectRecognitionOut\"></div>"+
			"</div>";
			
		if(extractedText){
			
			step2 +=
				"<h4>Extract Entities</h4>"+
				"<p>Edit to make corrections, or reset and retry with a different OCR 'mode'.</p>"+
				"<div id=\"ocrResponseText\" contenteditable=\"true\" style=\"background: white; max-width: 300px; color: black; text-align: center; margin: 0 auto;\">"+
				extractedText+
				"</div>";
			step2 += "<br>"+
				"<div id=\"extractedEntities\">"+
					"<div id=\"divContentTable\">"+
					"<table>"+
					"<tr>"+
						"<td><input type=\"text\" id=\"inputId_companies_eng\" class=\"inputExtract\"></td>"+
						"<td><label class=\"extractLabel\">Companies (Eng)</label></td>"+
						"<td><button type=\"submit\" class=\"btn btn-default\" id=\"button_companies_eng\">Extract</button></td>"+
						"<td>&nbsp;Find Similar in <button type=\"submit\" class=\"btn btn-default\" id=\"findSimilarButton_news_eng\">news_eng</button></td>"+
					"</tr><tr>"+
						"<td><input type=\"text\" id=\"inputId_address_us\" class=\"inputExtract\"></td>"+
						"<td><label class=\"extractLabel\">Address (US)</label></td>"+
						"<td><button type=\"submit\" class=\"btn btn-default\" id=\"button_address_us\">Extract</button></td>"+
						"<td>&nbsp;</td>"+
					"</tr><tr>"+
						"<td><input type=\"text\" id=\"inputId_people_eng\" class=\"inputExtract\"></td>"+
						"<td><label class=\"extractLabel\">People (Eng)</label></td>"+
						"<td><button type=\"submit\" class=\"btn btn-default\" id=\"button_people_eng\">Extract</button></td>"+
						"<td>&nbsp;</td>"+
					"</tr><tr>"+
						"<td><input type=\"text\" id=\"inputId_number_phone_us\" class=\"inputExtract\"></td>"+
						"<td><label class=\"extractLabel\">Phone Number (US)</label></td>"+
						"<td><button type=\"submit\" class=\"btn btn-default\" id=\"button_number_phone_us\">Extract</button></td>"+
						"<td>&nbsp;</td>"+
					"</tr><tr>"+
						"<td><input type=\"text\" id=\"inputId_internet_email\" class=\"inputExtract\"></td>"+
						"<td><label class=\"extractLabel\">Email</label></td>"+
						"<td><button type=\"submit\" class=\"btn btn-default\" id=\"button_internet_email\">Extract</button></td>"+
						"<td>&nbsp;</td>"+
					"</tr><tr>"+
						"<td><input type=\"text\" id=\"inputId_internet\" class=\"inputExtract\"></td>"+
						"<td><label class=\"extractLabel\">Internet</label></td>"+
						"<td><button type=\"submit\" class=\"btn btn-default\" id=\"button_internet\">Extract</button></td>"+	
						"<td>&nbsp;</td>"+			
					"</tr>"+
					"</table>"+
					"</div>"+
				"</div>";
		}
		
		step2 += 
		  "<div id=\"buttons\"><br>"+
		  	"<button type=\"submit\" class=\"btn btn-default\" id=\"resetbutton\">Reset</button>"+
		  "</div>"+
		"</div><br>";
		
		$('#step').replaceWith(step2);	
		
		$('#objectRecognitionButton').click(fnImageRecognition);
		$('#button_companies_eng').click(fnOnClickEntityExtraction_companies_eng);
		$('#findSimilarButton_news_eng').click(fnFindSimilar_news_eng);
		$('#button_address_us').click(fnOnClickEntityExtraction_address_us);
		$('#button_people_eng').click(fnOnClickEntityExtraction_people_eng);
		$('#button_number_phone_us').click(fnOnClickEntityExtraction_number_phone_us);
		$('#button_internet_email').click(fnOnClickEntityExtraction_internet_email);
		$('#button_internet').click(fnOnClickEntityExtraction_internet);
		$('#resetbutton').click(fnDisplayStep1);

		// disable non LinkedIN fields fields
		$('#inputId_address_us').css('background-color', '#a84141')
			.attr('disabled', 'disabled'); /** disabled */
		$('#inputId_people_eng').css('background-color', '#a84141')
			.attr('disabled', 'disabled'); /** disabled */
		$('#inputId_number_phone_us').css('background-color', '#a84141')
			.attr('disabled', 'disabled'); /** disabled */
		$('#inputId_internet_email').css('background-color', '#a84141')
			.attr('disabled', 'disabled'); /** disabled */			
	}
	
	function fnOnClickEntityExtraction_companies_eng(){fnEntityExtraction('companies_eng');}
	function fnFindSimilar_news_eng(){fnFindSimilar('news_eng');}
	function fnOnClickEntityExtraction_address_us(){fnEntityExtraction('address_us');}
	function fnOnClickEntityExtraction_people_eng(){fnEntityExtraction('people_eng');}
	function fnOnClickEntityExtraction_number_phone_us(){fnEntityExtraction('number_phone_us');}
	function fnOnClickEntityExtraction_internet_email(){fnEntityExtraction('internet_email');}
	function fnOnClickEntityExtraction_internet(){fnEntityExtraction('internet');}


	function fnEntityExtraction(entityType) {
		// get text from edited response
		var ocrResponseText = document.getElementById('ocrResponseText');
		var text = ocrResponseText.innerHTML;
		var iodRequest =  iodRestManager.createIODRequest('extractentities');
		iodRequest.setText(text);
		
		var params = new Array();
		var param1 = {key: "entity_type", value: entityType};
		params.push(param1);
		iodRequest.setParams(params);
		
		out1.innerHTML = "<br>Waiting for response...<br>";
		iodRequest.post(extractEntityRequestCallBack, out1.innerHTML);
	}
	
	function extractEntityRequestCallBack(response){
		
		out1.innerHTML = "";
		
		// parse entities
		var entities = new Array();
		var entitiesToString = "";
		var r = response.getResponseText();
		//out1.innerHTML += r;
		if(r){
			var json = JSON.parse(r);
			var jsonEntities = json.entities;
			if(jsonEntities){
				$(jsonEntities).each(function(i) {
					var entity = new Entity();
					var normalizedText = jsonEntities[i].normalized_text;
					entity.setNormalizedText(normalizedText);
					var score = jsonEntities[i].score;
					entity.setScore(score);
					var score = jsonEntities[i].score;
					entity.setScore(score);
					var type = jsonEntities[i].type;
					if(type == "internet/host"){
						type = "internet";
					}
					entity.setType(type);

					var inputId = "#inputId_"+type;
					$(inputId).val(normalizedText);

					// replace Extract button (with LinkedIN button)
					var buttonId = "#button_"+type;
					changeButton(inputId, buttonId, 'fnOnClickEntityExtraction_'+type);
					
					entities.push(entity);
					entitiesToString += normalizedText+" ["+score+"],<br>";
					
				});
			}else{
				out1.innerHTML = "No entities found.<br>"+r;
			}
			
			if(entitiesToString){
				out1.innerHTML += "entities[score]:<br>"+ entitiesToString+"<br>";
			}else{
				out1.innerHTML += "Error: no entities found.";
			}		
		}else{
			out1.innerHTML = "No response from Entity Extraction.";
		}	
	}

	function fnImageRecognition(){
		
		out1.innerHTML = "fnObjectRecognition";

		var iodRequest =  iodRestManager.createIODRequest('recognizeimages');
		if(! file1){
			out1.innerHTML = "select a file";
			return;
		}
		iodRequest.setFile(file1);	

		$('#divObjectRecognitionOut').empty();
		$('#divObjectRecognitionOut').append("Waiting for response..."+"<br>");
		
		iodRequest.post(fnImageRecognitionCallback, out1.innerHTML);
	}
	
	function fnImageRecognitionCallback(response){

		out1.innerHTML = "";
		
		// parse entities
		var entities = new Array();
		var objectsToString = "";
		var r = response.getResponseText();
		//out1.innerHTML += r;
		if(r){
			var json = JSON.parse(r);
			var jsonObjects = json.object;
			if(jsonObjects){
				$(jsonObjects).each(function(i) {
					
					var obj = new ImageObject();

					var name = jsonObjects[i].name;
					obj.setName(name);					
					var uniqueName = jsonObjects[i].unique_name;
					obj.setUniqueName(uniqueName);
					var db = jsonObjects[i].db;
					obj.setDb(db);
					var corners = jsonObjects[i].corners;
					
					if(corners){
						var points = new Array();
						$(corners).each(function(i) {
							var p = new Point();
							var x = corners[i].x;
							p.setX(x);
							var y = corners[i].y;
							p.setY(y);
							points.push(p);
						});
						obj.setCorners(points);
					}
				
					obj.setName(name);
					objectsToString += obj.toString()+"<br>";
				});
			}
		}

		$('#divObjectRecognitionOut').empty();
		$('#divObjectRecognitionOut').append(objectsToString);
		
	}

	
	function changeButton(inputFieldId, buttonId, clickHandler){
	
		if(! member){
			fnLoadLinkedIn();
		}
		var vals = $(inputFieldId).val();
		if(vals && vals != '' && (buttonId=='#button_companies_eng' || buttonId == '#button_internet')){
			$(buttonId).text('IN Lookup');	
			//alert('remove '+clickHandler+' from '+buttonId);
			$(buttonId).unbind().click(fnLinkedINLookup);
			$(buttonId).off().on('click', fnLinkedINLookup);
		}else{
			$(buttonId).remove();
		}	
	}


	
	function fnFindSimilar(index){
		out1.innerHTML += " fnFindSimilar "+index;

		var params = new Array();
		var param1 = {key: "indexes", value: index};
		params.push(param1);

		var iodRequest =  iodRestManager.createIODRequest(IOD.API_FIND_SIMILAR);
		
		// get text from edited response
		var findSimilarText = document.getElementById('inputId_companies_eng');
		if(findSimilarText && findSimilarText.value){
			var text = findSimilarText.value;
			iodRequest.setText(text);
		}
		
		out1.innerHTML += "<br>Request.get()...<br>";
		
		iodRequest.get(fnFindSimilarCallback, out1);
		
	}

	
	function fnFindSimilarCallback(response){

		out1.innerHTML = "";
		var documentsToString = "";
		
		if(response){
			// parse documents
			var documents = new Array();
			
			var r = response.getResponseText();
			//out1.innerHTML += r;
			if(r){
				var json = JSON.parse(r);
				
				var jsonDocuments = json.documents;
				if(jsonDocuments){
					$(jsonDocuments).each(function(i) {
						var document = new Document();
						
						var reference = jsonDocuments[i].reference;
						document.setReference(reference);
						var weight = jsonDocuments[i].weight;
						document.setWeight(weight);
						
						var jsonLinks = jsonDocuments[i].links;
						var links = new Array();
						$(jsonLinks).each(function(i){
							var jsonLink = jsonLinks[i];
							var link = new Link();
							link.setValue(jsonLink);
							links.push(link);
						});
						document.setLinks(links);

						var index = jsonDocuments[i].index;
						document.setIndex(index);
						var title = jsonDocuments[i].title;
						document.setTitle(title);

						var jsonWikipediaTypes = jsonDocuments[i].wikipedia_type;
						var wikipediaTypes = new Array();
						$(jsonWikipediaTypes).each(function(i){
							var jsonWikipediaType = jsonWikipediaTypes[i];
							var wikipediaType = new WikipediaType();
							wikipediaType.setValue(jsonWikipediaType);
							wikipediaTypes.push(wikipediaType);
						});
						document.setWikipediaType(wikipediaTypes);

						documents.push(document);
						documentsToString += "<li>"+document.toString()+"</li>";
					});
				}else{
					out1.innerHTML = "No entities found.<br>"+r;
				}
			}
		}

		var title  = "<br><h2>Find Similar in news_eng</h2>";
		var step1 = 
		"<div id=\"findSimilarResults\">"+
		  "<div>"+title+"</div>"+
		  "<div id=\"\documents-list\">"+
		  "<p>Documents:</p>"+
		  "<ul>"+
		  documentsToString+
		  "</ul>"+
		  "</div>"+
		"</div>";	
		$('#findSimilarResults').empty();
		$('#step').append(step1);
		
	}
	/**
	LinkedIN	
	*/
	 
	function fnLoadLinkedIn(){
		$.getScript("http://platform.linkedin.com/in.js?async=true", function success() {
	        IN.init({
	        	onLoad: 'onLinkedInLoad',
		        api_key: config.linkedin_apikey,
		    	authorize: true
	        });
	    });
	}	
	function onLinkedInLoad() {
		IN.Event.on(IN, "auth", onLinkedInAuth);
	}	
	function onLinkedInAuth(){
		IN.API.Profile("me").result(displayProfiles);
	}	
	function displayProfiles(profiles){
		member = profiles.values[0];
		var loginstatus = document.getElementById('loginstatus');
		loginstatus.innerHTML = 
          "<p id=\"" + member.id + "\">Logged in LinkedIN as: " +  member.firstName + " " + member.lastName + " ["+member.id+"]</p>";	   	
	}
	
	
	function fnLinkedINLookup() {
		out1.innerHTML = "";
			
	    var keyword = "";
		var numberOfResults = 25;
		
		var companiesUrl = "";
		var companyName = document.getElementById('inputId_companies_eng');
		var companyId = document.getElementById('inputId_company_id');
		
		if(companyName && companyName.value){
			var tmpName = companyName.value;
			tmpName = tmpName.toLowerCase();
			tmpName = replaceAll(tmpName, " ", "-");
			var universalName = tmpName;
			companiesUrl = "/universal-name="+universalName;
		}
		if(companyId && companyId.value){
			companiesUrl = "/"+companyId.value;
		}
		
		var filters = "";
		var internet = document.getElementById('inputId_internet');
		if(internet && internet.value){
			if(filters==""){
				filters += "?";
			}else{
				filters += "&";
			}
			filters += "email-domain="+internet.value;
		}

		var errMsg = "";
		if(!(companyName && companyName.value) && !(companyId && companyId.value) && !(filters) && !(companiesUrl) ){			
			errMsg = "Error: select either company name, company id, or company url.";
			out1.innerHTML += errMsg;
			return false;			
		}

		var params = "locations:(address:(city))";
		
		var outputFields = ":(id,name,universal-name,ticker,twitter-id,employee-count-range,locations)";
		var inUrl = "companies"+companiesUrl+outputFields+filters;
		
		IN.API.Raw(inUrl)
			.result(displayResultCompanieSearch)
			.error(displayError);
			
	}
	
	function displayResultCompanieSearch(result){
		
		var companies = result;
		//out1.innerHTML += "<br><br>"+JSON.stringify(companies);
		out1.innerHTML = "";
		var companiesList = "";
		if(companies){
			if(companies._total){
				if(companies._total>0){
					out1.innerHTML += "<br><br>_total companies found: "+ companies._total+"<br>";
					for (var index in companies.values) {
						var company = companies.values[index];
						if(company){
							var universalName = "";
							if(company.universalName){
								universalName = " ("+company.universalName+")<br>";
							}
							var ticker = "";
							if(company.ticker){
								ticker = " ("+company.ticker+")";
							}
							var twitterId = "";
							if(company.twitterId){
								twitterId = " Twitter: "+company.twitterId;
							}
							//employee-count-range,locations
							var employeeCountRange = "";
							if(company.employeeCountRange){
								employeeCountRange = "employeeCount: "+company.employeeCountRange;
							}
							var locations = getLocations(company);
							companiesList += "["+company.id+"] "+company.name+universalName+""+ticker+""+twitterId+", "+locations+" <br>";
						}
					}
				}
			}
			if(companies.id){
				var company = companies;
				var ticker = "";
				if(company.ticker){
					ticker += " ("+company.ticker+")";
				}
				var twitterId = "";
				if(company.twitterId){
					twitterId += " ("+company.twitterId+")";
				}
				var locations = getLocations(company);
				var emplCountRange = "";
				if(company.employeeCountRange){
					var range = company.employeeCountRange;
					emplCountRange += " Employee count: (" + range.code + ") " + range.name +"<br>";
				}
				companiesList += "["+company.id+"] "+company.name+ticker+twitterId+"<br>"+emplCountRange+" "+locations+" <br>";
			}
		}
		
		var title  = "<br><h2>LinkedIN Company Lookup result:</h2>";
		var step1 = 
		"<div id=\"lookupResults\">"+
		  "<div>"+title+"</div>"+
		  "<div id=\"\companies-list\">"+
			 companiesList+
		  "</div>"+
		"</div>";	
		$('#lookupResults').empty();
		$('#step').append(step1);
		
	}
	
	function getLocations(company){
		var locations = "";
		var companyLocations = company.locations;
		if(companyLocations){
			var totalNumberOfLocations = companyLocations._total;
			if(totalNumberOfLocations){
				if(totalNumberOfLocations>0){
					locations = "locations: " + totalNumberOfLocations +"<br>";
					var companyLocationsValues = companyLocations.values;
					for(var index in companyLocationsValues){
						var location = companyLocationsValues[index];
						var loc1 = "";
						if(location){
							if(location.address){
								var address = location.address;
								if(address.street1 && address.street1!=""){
									loc1 += address.street1 + "<br>";
								} 
								if(address.city && address.city!=""){
									 loc1 += address.city;
								}
								if(address.postalCode && address.postalCode!=""){
									 loc1 += " " + address.postalCode;
								}
								if(address.city && address.city!="" && address.postalCode && address.postalCode!=""){
									loc1 += "<br>";
								}
							}
							if(location.contactInfo){
								var contactInfo = location.contactInfo;
								if(contactInfo.fax && contactInfo.fax!=""){
									loc1 += "F: " + contactInfo.fax + "<br>";
								} 
								if(contactInfo.phone1 && contactInfo.phone1!=""){
									loc1 += "T: " + contactInfo.phone1 + "<br>";
								} 
							}
						}
						locations += "location["+index+"]<br>"+loc1;
					}
				}
			}
		}
		return locations;	
	}
	
	function displayResultPeopleSearch(result){
	
		profHTML = "<h4>People Search result:</h4>";
		out1.innerHTML += profHTML;
		for (var index in result.people.values) {
			profile = result.people.values[index]
			if (profile) {
				profHTML += "<p>" + profile.firstName + " " + profile.lastName + "</p>";  
			}
		}   
		$("out1").html(profHTML);
			
	}
	
	function displayError(error){
		out1.innerHTML = "<br>Error:<br>"+
			"Error.status: " + error.status + "<br>" +
			"Error.message: " + error.message + "<br>"; 
	}
	
	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	function replaceAll(string, find, replace) {
	  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	</script>
	

  </body>
</html>
