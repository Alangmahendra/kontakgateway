const Model = require('../models/kontak')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class Kemo {
    static kontak(req,res){
        let obj={
            email:req.body.email,
            nama:req.body.nama,
            pesan:req.body.pesan,
            apps:req.query.to || 'KEMO'
        }
        Model.create(obj,(err,rows)=>{
            if(!err){
                sgMail.setApiKey(process.env.SENDGRID_KEY)
                const msg = [{
                    to: ['info@kemodijakarta.com'],
                    from: 'kontakform@kemodijakarta.com',
                    subject: `[KONTAK] - ${rows.nama}`,
                    text: 'SESEORANG MENGIRIM PESAN LEWAT FORM KONTAK KEMODIJAKARTA',
                    html:`<div>
                    <table border>
                        <thead>
                            <tr>
                                <th colspan="2">PESAN</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td>Nama</td>
                            <td>${rows.nama}</td>
                        </tr>
                    <tbody>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>${rows.email}</td>
                        </tr>
                    <tbody>
                    <tbody>
                        <tr>
                            <td>pesan</td>
                            <td>${rows.pesan}</td>
                        </tr>
                    <tbody>
                    </table>
                    </div>`
                },
                {
                    to: rows.email,
                    from: 'kontakform@kemodijakarta.com',
                    subject: `[KONTAK] - Anda Megirim Pesan Ke KEMODIJAKARTA`,
                    text: 'ANDA MENGIRIM PESAN KE FORM KONTAK KEMODIJAKARTA',
                    html:`<div>
                    <table border>
                        <thead>
                            <tr>
                                <th colspan="2">DETAIL PESAN ANDA</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td>Nama</td>
                            <td>${rows.nama}</td>
                        </tr>
                    <tbody>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>${rows.email}</td>
                        </tr>
                    <tbody>
                    <tbody>
                        <tr>
                            <td>pesan</td>
                            <td>${rows.pesan}</td>
                        </tr>
                    <tbody>
                    </table>
                    </div>`
                }
            ]
            sgMail.send(msg).then((rows) => {
                // console.log(rows)
                res.status(200).json({ message: "email terkirim",rows})
            }).catch((error) => {
                console.log(error)
                res.status(500).json({ message: error })
            })
            }else{
                conslole.log(err)
                res.status(500).json({message:err})
            }
        })
    }
}

module.exports = Kemo