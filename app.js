const express = require('express')

const app = express()
const cors=require('cors')
app.use(cors())
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:admin@cluster0.s2tew36.mongodb.net/?retryWrites=true&w=majority")
const db = mongoose.connection;
db.on('open', () => {
    console.log("database connected for grooton")
})
const ro = require('./ro')


app.get('/new', async (req, res) => {
    try {
        const newro = new ro({})
        const savedro = await newro.save()
        res.status(200).json({
            status: 'success',
            id: savedro._id
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            err: err.message
        });
    }
})


app.get('/:id', async (req, res) => {
    try {
        const currro = await ro.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            data: currro.verified
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            err: err.message
        });
    }
})

app.post('/update/:id', async (req, res) => {
    try {
        const currRo = await ro.findById(req.params.id);
        currRo.verified=true;
        currro.username=req.body.username;
        currro.phonenumber=req.body.phonenumber;
        currro.reason=req.body.reason;
        currro.trust=req.body.trust;
        currro.feedback=req.body.feedback;
        await currRo.save();
        res.status(200) .json({
            status: "success",
            data: true
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            err: err.message
        });
    }
});

app.listen(4000, () => {
    console.log('app.started at http://127.0.0.1:4000');
});
