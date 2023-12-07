import app from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

//iniciar el conector de la bd
connectDB();
//escuchar el puerto 3000
app.listen(PORT);


console.log('Server on port', PORT);