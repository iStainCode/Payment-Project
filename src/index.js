import app from "./app.js";
import { connectDB } from "./db.js";

//iniciar el conector de la bd
connectDB();
//escuchar el puerto 3000
app.listen(3000);


console.log('Server on port', 3000);