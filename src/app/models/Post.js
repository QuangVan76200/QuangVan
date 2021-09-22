const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    idImage:{
        type:String,
    },
    status: {
        type: String,
        enum: ['Normal Post', 'Sales Post']
    },
    IDUser: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    }
    

},{
    timestamps: true
})



module.exports = mongoose.model('post', postSchema)