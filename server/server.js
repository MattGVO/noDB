const express = require('express');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


var libz = [];
var id = 0


app.get('/api/libz', (req, res) => {
    console.log("hit the server");
    res.status(200).send(libz)
})

app.post('/api/libz', (req, res) => {
    libz.push({ id: id, lib: req.body.lib, title: req.body.title });
    id++;
    console.log(libz)
    res.status(200).send(libz);
})

app.put('/api/libz/:id', (req, res) => {
    const { id } = req.params;
    console.log('id', id);
    const { title } = req.body;
    console.log('body', title);
    libz.splice(id, 1, req.body)
    res.status(200).send(libz)
})

app.delete('/api/libz/:id', (req, res) => {
    const { id } = req.params;
    const removedLib = libz.splice(id, 1)[0];
    console.log(`removing lib${id} from saved libs`);
    res.status(202).send(libz)
})


const port = 4000;
app.listen(port, () => console.log(`Port ${port} is a listenin'`));
console.log(libz);



// reset server !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!