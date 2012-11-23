function models(params) {
	var mongoose = params.mongoose;	
	
    var	Schema = mongoose.Schema,
    	ObjectId = mongoose.Schema.ObjectId;
 
    	
	/* Schema Definition */	
    var Task = new Schema({
    name        :  { type: String, required: true }
  , description : String
  , status      : String
  , startDate   : { type: Date, default: Date.now }
  , dueDate     : Date
  , completion  : {type: Number, default: 0}
});
mongoose.model('Tasks', Task);
};
module.exports = models;