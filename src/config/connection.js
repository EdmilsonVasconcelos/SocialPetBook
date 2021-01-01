import mongoose from 'mongoose';

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        mongoose.connect('mongodb://localhost/socialpetbook', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão com MongoDb realizado com sucesso!");
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDb não foi realizado com sucesso: " + erro);
        });
    }
}

export default new DataBase();