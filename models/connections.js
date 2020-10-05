var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://CoTrt:6s6cWd4MY3Fs@cluster0.aafhl.mongodb.net/myMovizApp?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );

module.exports = mongoose;