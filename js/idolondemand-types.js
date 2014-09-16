var TextBlock = function () {
    var text = null;
	var top = null;
	var left = null;
	var bottom = null;
	var right = null;
	this.getText = function() {
		return this.text;
	};
	this.setText = function(_text) {
		this.text = _text;
	};
};

var Entity = function () {
    var normalizedText = null;
	var originalText = null;
	var type = null;
	var normalizedLength = null;
	var originalLength = null;
	var score = null;
	var additionalInformation = null;
	var components = null;
	
	this.getNormalizedText = function() {
		return this.normalizedText;
	};
	this.setNormalizedText = function(_normalizedText) {
		this.normalizedText = _normalizedText;
	};
	this.getOriginalText = function() {
		return this.originalText;
	};
	this.setOriginalText = function(_originalText) {
		this.originalText = _originalText;
	};
	this.getScore = function() {
		return this.score;
	};
	this.setScore = function(_score) {
		this.score = _score;
	};
	this.getType = function() {
		return this.type;
	};
	this.setType = function(_type) {
		this.type = _type;
	};
};

var ImageObject = function() {
	var name = null;
    var uniqueName = null;
    var db = null;
    var corners = null;
    
	this.getName = function() {
		return this.name;
	};
	this.setName = function(_name) {
		this.name = _name;
	};
	this.getUniqueName = function() {
		return this.uniqueName;
	};
	this.setUniqueName = function(_uniqueName) {
		this.uniqueName = _uniqueName;
	};
	this.getDb = function() {
		return this.db;
	};
	this.setDb = function(_db) {
		this.db = _db;
	};
	this.getCorners = function() {
		return this.corners;
	};
	this.setCorners = function(_corners) {
		this.corners = _corners;
	};
	
	this.toString = function(){
		var s = "";
		s+= "name: "+this.name+", ";
		s+= "unique_name: "+this.uniqueName+", ";
		s+= "db: "+this.db+", ";
		//s+= "corners: "+this.corners.toString+", ";
		return s;
	};
};


var Document = function() {
	var reference = null;
	var weight = null;
	var links = null;
	var index = null;
	var title = null;
	var wikipediaType = null;
  
	this.getReference = function() {
		return this.reference;
	};
	this.setReference = function(_reference) {
		this.reference = _reference;
	};
	this.getWeight = function() {
		return this.weight;
	};
	this.setWeight = function(_weight) {
		this.weight = _weight;
	};
	this.getLinks = function() {
		return this.links;
	};
	this.setLinks = function(_links) {
		this.links = _links;
	};
	this.getIndex = function() {
		return this.index;
	};
	this.setIndex = function(_index) {
		this.index = _index;
	};
	this.getTitle = function() {
		return this.title;
	};
	this.setTitle = function(_title) {
		this.title = _title;
	};
	this.getWikipediaType = function() {
		return this.wikipediaType;
	};
	this.setWikipediaType = function(_wikipediaType) {
		this.wikipediaType = _wikipediaType;
	};
	
	this.toString = function(){
		var s = "";
		s+= "reference: "+this.reference+", ";
		s+= "weight: "+this.weight+", ";
		
		/**
		$(this.links).each(function(i){
			var link = this.links[i];
			//s+= link.getValue()+", ";
		});
		*/
		
		s+= "index: "+this.index+", ";
		s+= "title: "+this.title+", ";
		s+= "wikipedia_type: "+this.wikipediaType+"";
		/**
		$(this.wikipediaType).each(function(i){
			var wikipediaType = this.wikipediaType[i];
			s+= wikipediaType.toString()+", ";
		});
		*/
		return s;
	};
};




var Point = function() {
	var x = null;
    var y = null;

    this.getX = function() {
		return this.x;
	};
	this.setX = function(_x) {
		this.x = _x;
	};
	this.getY = function() {
		return this.y;
	};
	this.setY = function(_y) {
		this.y = _y;
	};
};



var Link = function() {
	var value = null;
	this.getValue = function() {
		return this.value;
	};
	this.setValue = function(_value) {
		this.value = _value;
	};
	this.toString = function(){
		var s = "";
		s+= "link: "+this.value+"";
		return s;
	};
};

var WikipediaType = function() {
	var value = null;
	this.getValue = function() {
		return this.value;
	};
	this.setValue = function(_value) {
		this.value = _value;
	};
	this.toString = function(){
		var s = "";
		s+= "wikipedia_type: "+this.value+"";
		return s;
	};
};

var IODIndex = function () {
    var index = null;
	var flavor = null;
	var type = null;
	var date_created = null;
	var num_components = null;
	
	this.getIndex = function() {
		return this.index;
	};
	this.setIndex = function(_index) {
		this.index = _index;
	};
	
	this.getFlavor = function() {
		return this.flavor;
	};
	this.setFlavor = function(_flavor) {
		this.flavor = _flavor;
	};
	
	this.getType = function() {
		return this.type;
	};
	this.setType = function(_type) {
		this.type = _type;
	};
	
	this.getDateCreated = function() {
		return this.date_created;
	};
	this.setDateCreated = function(_date_created) {
		this.date_created = _date_created;
	};
	
	this.getNumComponents = function() {
		return this.num_components;
	};
	this.setNumComponents = function(_num_components) {
		this.num_components = _num_components;
	};
};


var IODReference = function () {
    var index = null;
	var id = null;
	var reference = null;
	
	this.getIndex = function() {
		return this.index;
	};
	this.setIndex = function(_index) {
		this.index = _index;
	};
	this.getId = function() {
		return this.id;
	};
	this.setId = function(_id) {
		this.id = _id;
	};
	this.getReference = function() {
		return this.reference;
	};
	this.setReference = function(_reference) {
		this.reference = _reference;
	};
};

var IODAdditionalInformation = function () {
    var wikidataId = null;
	var wikipediaEng = null;
	
	this.getWikidataId = function() {
		return this.wikidataId;
	};
	this.setWikidataId = function(_wikidataId) {
		this.wikidataId = _wikidataId;
	};
	this.getWikipediaEng = function() {
		return this.wikipediaEng;
	};
	this.setWikipediaEng = function(_wikipediaEng) {
		this.wikipediaEng = _wikipediaEng;
	};
}
	
var IODComponent = function () {

}
	
var IODEntity = function () {
    var originalText = null;
	var normalizedText = null;
	var type = null;
    var normalizedLength = null;
	var originalLength = null;
	var score = null;
    var additionalInformation = null;
	var components = null;
	
	this.getOriginalText = function() {
		return this.originalText;
	};
	this.setOriginalText = function(_originalText) {
		this.originalText = _originalText;
	};
	this.getNormalizedText = function() {
		return this.normalizedText;
	};
	this.setNormalizedText = function(_normalizedText) {
		this.normalizedText = _normalizedText;
	};
	this.getType = function() {
		return this.type;
	};
	this.setType = function(_type) {
		this.type = _type;
	};
	
	this.getNormalizedLength = function() {
		return this.originalText;
	};
	this.setNormalizedLength = function(_normalizedLength) {
		this.normalizedLength = _normalizedLength;
	};
	this.getOriginalLength = function() {
		return this.originalLength;
	};
	this.setOriginalLength = function(_originalLength) {
		this.originalLength = _originalLength;
	};
	this.getScore = function() {
		return this.score;
	};
	this.setScore = function(_score) {
		this.score = _score;
	};
	
	this.getAdditionalInformation = function() {
		return this.additionalInformation;
	};
	this.setAdditionalInformation = function(_additionalInformation) {
		this.additionalInformation = _additionalInformation;
	};
	this.getComponents = function() {
		return this.components;
	};
	this.setComponents = function(_components) {
		this.components = _components;
	};
	
};	


var IODSentiment = function () {
    var sentiment = null;
	var score = null;
	var topic = null;
	
	this.getSentiment = function() {
		return this.sentiment;
	};
	this.setSentiment = function(_sentiment) {
		this.sentiment = _sentiment;
	};
	
	this.getScore = function() {
		return this.score;
	};
	this.setScore = function(_score) {
		this.score = _score;
	};
	
	this.getTopic = function() {
		return this.topic;
	};
	this.setTopic = function(_topic) {
		this.topic = _topic;
	};
	
}