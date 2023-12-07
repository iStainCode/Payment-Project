import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import debtsRoutes from "./routes/debts.routes.js";
import productsRouter from "./routes/products.routes.js";
import categorysRouter from "./routes/category.routes.js";
import paymentRoutes from './routes/payment.routes.js'


const app = express();

//para que se pueda comunicar el front con el back
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//morgan para que los datos salgan el la consola
app.use(morgan("dev"));
//para que express entiendo json
app.use(express.json());
//para convertir las cookies a un json
app.use(cookieParser());
//las rutas de autenticacion
app.use("/api", authRoutes);
//las rutas de deudas
app.use("/api", debtsRoutes);
//las rutas de los productos
app.use("/api", productsRouter);
//las rutas de categorias
app.use("/api", categorysRouter);
//ruta de payment
app.use('/api',paymentRoutes)


export default app;
