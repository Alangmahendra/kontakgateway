const Model = require('../models/kontak')
const pena = require('./pena')
const kemo = require('./kemo')
const kta = require('./kta')
const datamedis = require('./datamedis')
const ardy = require('./ardy')

class Gateway{
    static sendmail(req,res){
        console.log('=========>',req.query.to)
        const to = req.query.to
        switch (to) {
            case 'PENA':
                    pena.kontak(req,res)
                break;
            case 'KEMO':
                kemo.kontak(req,res)
            break;
            case 'KTA':
                kta.kontak(req,res)
            break;
            case 'VMS':
                datamedis.kontak(req,res)
            break;
            case 'ARDY':
                ardy.kontak(req,res)
            break;
            default:
                res.send(to)
                break;
        }
    }

    static findAll(req,res){
        Model.find({},(err,rows)=>{
            if(!err){
                res.status(200).json({message:"all of buku tamu data",data:rows})
            }else{
                res.status(500).json({message:err})
            }
        })
    }

    static findByApps(req,res){
        Model.find({apps:req.query.to},(err,rows)=>{
            if(!err){
                res.status(200).json({message:`${req.query.to} buku tamu`,data:rows})
            }else{
                res.status(500).json({message:err})
            }
        })
    }
}

module.exports = Gateway