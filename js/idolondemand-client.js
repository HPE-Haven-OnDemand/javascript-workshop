var IOD = function () {};
IOD.APIKEY = config.iod_apikey;

// supported APIs
IOD.API_LISTINDEXES =        "listindexes";
IOD.API_CREATEINDEX =        "createtextindex";
IOD.API_DELETEINDEX =        "deletetextindex";
IOD.API_ADDTOTEXTINDEX =     "addtotextindex";
IOD.API_GETCONTENT =         "getcontent";
IOD.API_OCR = 				 "ocr";
IOD.API_SENTIMENT_ANALYSIS = "analyzesentiment";
IOD.API_ENTITY_EXTRACTION =  "extractentities";
IOD.API_RECOGNIZE_IMAGES =   "recognizeimages";
IOD.API_FIND_SIMILAR = 	     "findsimilar";
IOD.API_QUERYTEXTINDEX = 	 "querytextindex";
IOD.API_FINDSIMILAR = 	     "findsimilar";
IOD.API_FINDRELATEDCONCEPTS = "findrelatedconcepts";
IOD.API_GETPARAMETRICVALUES = "getparametricvalues";


var IODClient = function () {
    this.createIODRequest = function(_apiname) {
		var iodRequest = new IODRequest();
		if ((!_apiname) || _apiname == ""){
			var errMsg = "Error: no API name.";
			var errCode = "0000";
			alert(errMsg);
		}
		iodRequest.setAPI(_apiname);
		return iodRequest;
	};
};

var IODRequest = function () {
	var api = null;

	// replace completely by Params for now
	// add API input validation separately
	var file = null;
	var text = null;
	var url = null;
	// input extra parameters
	var params = null;
	var headers = null;
	
    this.setText = function(_text){
		this.text = _text;
	};
	this.setFile = function(_file){
		this.file = _file;
	};
	this.setUrl = function(_url){
		this.url = _url;
	};
	this.setAPI = function(_api){
		this.api = _api;
	};
	this.setParams = function(_params){
		this.params = _params;
	};
	this.setHeaders = function(_headers){
		this.headers = _headers;
	};
	
	this.send = function(httpMethod, iodCallback){
		if(httpMethod=="POST"){
			this.post(iodCallback);
		}else if(httpMethod=="GET"){
			// TBD
			this.get(iodCallback);
		}else{
			// handle error 
			var errMsg = "Error: invalid HTTP Method. Use POST or GET.";
			var errCode = "0000";
			handleError(errMsg, errCode, iodCallback);
		}
	};
	
	
	this.get = function(iodCallback){	
		if(this.api==null){
			var errMsg = "Error: no API found.";
			var errCode = "0000";
			handleError(errMsg, errCode, iodCallback);
		}
		var inputParams = new Array();
		// do not do input validation in sdk, let server-client handle it for now	
		// check apikey
		if(! IOD.APIKEY){
			var errMsg = "Error: no apikey found.";
			var errCode = "0000";
			handleError(errMsg, errCode, iodCallback);
		}
		var query = "?apikey="  +IOD.APIKEY;
		$(inputParams).each(function(i) {
			var key = inputParams[i].key;
			var value = inputParams[i].value;
			query  = "&" + key + "=" + value;
		});
		if(this.params){
			var params1 = this.params;
			$(params1).each(function(i) {
				var param = params1[i];
				var key = param.key;
				var value = param.value;
				query  = "&" + key + "=" + value;
			});
		}
		//var apiurl = IOD.APIS [this.api]   query;
		var baseurl = getUrl(this.api);
		var apiurl = baseurl + query;
		
		xhr = new XMLHttpRequest();
		xhr.open('GET', apiurl, false);	
		
		xhr.onreadystatechange = function(){
			fnHandleReadyState(xhr, iodCallback);
		};
		xhr.onload = function(){ };
		
		xhr.send();
	};
	

	this.post = function(iodCallback){
		var error = null;	
		// check api 
		if(this.api==null){
			var errMsg = "Error: no API found.";
			var errCode = "0000";
			handleError(errMsg, errCode, iodCallback);
		}
		
		var fd = new FormData();
		
		
		// set apikey
		if(IOD.APIKEY){
			fd.append("apikey", IOD.APIKEY);
		}else{
			var errMsg = "Error: no apikey found.";
			var errCode = "0000";
			handleError(errMsg, errCode, iodCallback);
		}
		
		// set input parameter
		// input validation should happen in IODRequest parent type or child type
		// other parameters
		if(this.params){
			var params1 = this.params;
			$(params1).each(function(i) {
				var param = params1[i];
				var key = param.key;
				var value = param.value;
				fd.append(key,value);
			});
		}
		//var apiurl = IOD.APIS[this.api];
		var baseurl = getUrl(this.api);
		var apiurl = baseurl;
		
		xhr = new XMLHttpRequest();
		xhr.open('POST', apiurl, true);	
		
		if(this.headers){
			log("Setting HTTP headers");
			var headers = this.headers;
			$(headers).each(function(i) {
				var header = headers[i];
				var key = header.key;
				var value = header.value;
				xhr.setRequestHeader(key, value);
			});
		}
		
		xhr.onreadystatechange = function(){
			fnHandleReadyState(xhr, iodCallback);
		}
		xhr.onload = function(){ };
		xhr.send(fd);    
	};	
};


var respond = function(xhr, iodCallback){
	var iodResponse = new IODResponse();
	iodResponse.setStatusCode(xhr.status);
	iodResponse.setStatusText(xhr.statusText);
	iodResponse.setResponseText(xhr.responseText);
	iodCallback(iodResponse);
};


var handleError = function(errMsg, errCode, iodCallback){
	var iodError = new IODErrorRequest();
	iodError.setErrorCode(errCode);
	iodError.setErrorText(errMsg);
	iodCallback(iodError);
};


var fnHandleReadyState = function(xhr, iodCallback){
	// TBD currently only state 4 
	if (xhr.readyState === 4){
		respond(xhr, iodCallback);
	}else{
		// todo error handling and other states
	}
};

	
var IODOCRRequest = function() {

};
IODOCRRequest.prototype = new IODRequest();


var IODExtractEntityRequest = function() {

};
IODExtractEntityRequest.prototype = new IODRequest();


var IODErrorRequest = function() {
	var errorCode = null;
	var errorText = null;
	this.setErrorCode = function(_errorCode){
		this.errorCode = _errorCode;
	}
	this.setErrorText = function(_errorText){
		this.errorText = _errorText;
	}
	this.getErrorCode = function(){
		return this.errorCode();
	}
	this.getErrorText = function(_errorText){
		return this.errorText();
	}
}
// inherits from IODRequest
IODErrorRequest.prototype = new IODRequest();


var IODResponse = function () {
    var statusCode = null;
	var statusText = null;
	var api = null;
	var responseText = null;
	
	this.setStatusCode = function(_statusCode) {
		this.statusCode = _statusCode;
	}
	this.getStatusCode = function() {
		return this.statusCode;
	}
	this.setStatusText = function(_statusText) {
		this.statusText = _statusText;
	}	
	this.getStatusText = function() {
		return this.statusText;
	}
	this.setApi = function(_api) {
		this.api = _api;
	}	
	this.getApi = function() {
		return this.api;
	}
	this.setResponseText = function(_responseText) {
		this.responseText = _responseText;
	}	
	this.getResponseText = function() {
		return this.responseText;
	}
};


var IODErrorResponse = function() {
	var errorCode = null;
	var errorText = null;
	this.setErrorCode = function(_errorCode){
		this.errorCode = _errorCode;
	}
	this.setErrorText = function(_errorText){
		this.errorText = _errorText;
	}
	this.getErrorCode = function(){
		return this.errorCode();
	}
	this.getErrorText = function(_errorText){
		return this.errorText();
	}
}
// inherits from IODResponse
IODErrorResponse.prototype = new IODResponse();

var IODOCRResponse = function () {
    
};
IODOCRResponse.prototype = new IODResponse();


function getFileById(fileInputId) {
	var filesList1 = document.getElementById(fileInputId);
	var file1 = filesList1.files[0];
	if(!file1){
		return false;
	}
	return file1;
}


function getUrl(apiName){
	var url = "";

	url = "https://api.idolondemand.com/1/api/sync/" +apiName+ "/v1";

	return url;
}
