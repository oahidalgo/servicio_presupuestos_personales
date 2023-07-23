const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // URL de aplicación React
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // Middleware para analizar el cuerpo de solicitudes con formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de solicitudes con formato URL-encoded

mongoose.connect("mongodb://localhost:27017/presupuestos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado a la base de datos MongoDB");
});

const transaccionController = require("./controllers/transaccionController.js");

// Ruta para obtener todas las transacciones
app.get("/transacciones", transaccionController.obtenerTransacciones);

// Ruta para crear una nueva transacción
app.post("/transacciones", transaccionController.crearTransaccion);

// Ruta para actualizar una transacción existente
app.put("/transacciones/:id", transaccionController.actualizarTransaccion);

// Ruta para eliminar una transacción existente
app.delete("/transacciones/:id", transaccionController.eliminarTransaccion);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
