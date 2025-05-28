const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const Database = require("./DataBase");
const db = new Database();
db.connect();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/notes', (req, res) => {
    const note = req.body;
    db.add(note)

        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))

});


app.get('/notes', (req, res) => {
    const { title } = req.query;
    if (title) {
        db.getByTitle(title)
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err));
    } else {
        db.get()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
    }

});

app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id)
        .then(data => {
            if (!data) {
                res.status(404).send("id doesn't exist " + id);

            }
            else {
                res.send(data);
            }
        })

        .catch(err => res.status(500).send(err));
})



app.put('/notes', (req, res) => {
    db.Update(req.body)
        .then(data => {
            if (!data) {
                res.status(404).send("id doesn't exist " + id);

            }
            else {
                res.send(data);
            }
        })

        .catch(err => res.status(500).send(err));
}
);


app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.Delete(id)
        .then(data => {
            if (!data) {
                res.status(404).send("id doesn't exist " + id);

            }
            else {
                res.send(data);
            }
        })

        .catch(err => res.status(500).send(err));
})

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`server has started on ${port} `)
});
