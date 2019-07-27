const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const g = [{value:"my first todo", marked:true},{value:"my second todo", marked:false}];

app.get('/api/getter',(req,res)=>{
    res.send ({express:g});
});

app.post('/api/poster', (req,res)=>{
    g.push ({value: req.body.post,marked:false});
    //console.log (req.body);
    res.send ({express:"From express"});
});

app.post('/api/checkboxer', (req,res)=>{
    var i = req.body.index;
    var marked = req.body.marked;
    g[i]['marked']=marked;
    console.log (req.body);
});

app.post('/api/deleter', (req,res)=>{
    const e = req.body.e;
    g.splice(e,1);
});

app.post('/api/updater', (req,res)=>{
    const e = req.body.line;
    const i = req.body.index;
    g[i]['value']=e;
});

app.listen(port,()=> console.log('Listening on port '+port));