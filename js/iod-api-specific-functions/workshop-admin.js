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