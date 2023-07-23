const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  // Define los campos del esquema
  descripcion: String,
  monto: Number
});

const Transaccion = mongoose.model('Transacciones', transaccionSchema);

module.exports = Transaccion;
