const mongoose = require('mongoose');
const NoteDb = require('./Schemas/node');


class Database {
    constructor() {
        // this.Url = 'mongodb://localhost:27017/notesDB';
        this.Url =process.env.MONGODB_URL|| 'mongodb+srv://neamagamal27%40admin:Neama@cluster0.iuunyzr.mongodb.net/notaty?retryWrites=true&w=majority&appName=Cluster0';

    }
    connect() {
        mongoose.connect(this.Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('Connected to MongoDB successfully!');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });
    }


    add(notes) {
        return new Promise((resolve, reject )=> {

            notes['CreatedDate'] = new Date();
            notes['updatedDate'] = new Date();

            let Addnote = new NoteDb(notes);
            Addnote.save()
                .then(doc => { resolve(doc) })
                .catch(err => {
                    reject(err);
                })
        });
    }

    get(){
        return new Promise((resolve,reject) =>{
            NoteDb.find({})
            .then(data=>resolve(data))
            .catch(err => reject(err));

        });
    }



    getById(id)
    {
         return new Promise((resolve,reject) =>{
            NoteDb.findById(id)
             .then(data=>resolve(data))
            .catch(err => reject(err));

    });}

  Update(notaty) {
    return new Promise((resolve, reject) => {
        const { _id, ...updateFields } = notaty;

        updateFields.updatedDate = new Date(); 

        NoteDb.findByIdAndUpdate(_id, updateFields, { new: true }) 
            .then(updatedDoc => {
                if (!updatedDoc) {
                    return reject(new Error("Note not found"));
                }
                resolve(updatedDoc);
            })
            .catch(err => {
                reject(err);
            });
    });
}

Delete(id) {
    return new Promise((resolve, reject) => {
        NoteDb.findByIdAndDelete(id)
            .then(dataDeleted => {
                if (!dataDeleted) {
                    return reject(new Error("Note not found"));
                }
                resolve(dataDeleted);
            })
            .catch(err => {
                reject(err);
            });
    });
}

getByTitle(title){
       return new Promise((resolve, reject) => {
const query = { title: { $regex: new RegExp(title, 'i') } };
        NoteDb.find(query)
            .then(data=> {
                resolve(data)
            
            })
            .catch(err => {
                reject(err);
            });
    });

}

}

module.exports = Database;