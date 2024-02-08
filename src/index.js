import app from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

connectDB();
//escuchar el puerto 3000
app.listen(PORT);
console.log('Server on port', PORT);