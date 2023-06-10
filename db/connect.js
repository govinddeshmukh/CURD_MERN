const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DB = process.env.DATABASE;
// const DB = "mongodb+srv://curdapp:Curd123@cluster0.utmmkad.mongodb.net/CURD?retryWrites=true&w=majority"
mongoose.connect(DB, {
     
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("Database is connected")).catch((error)=>{
    console.log(error);
})


    