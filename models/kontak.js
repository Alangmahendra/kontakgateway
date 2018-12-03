
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bukuTamuSchema = new Schema({
    nama:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pesan:{
        type:String,
        required:true
    },
    apps:{
        type:String,
        required:true
    }
},{timestamps:{}})
const bukuTamuModel = mongoose.model('bukutamu',bukuTamuSchema)

module.exports = bukuTamuModel