const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    idImage: {
        type: String,
        required: true
    },
    nameImage: {
        type: String,
    },
    title: {
        type:Schema.Types.ObjectId
    },
    

})



module.exports = mongoose.model('image', imageSchema)