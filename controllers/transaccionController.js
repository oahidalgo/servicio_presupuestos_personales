const Transaccion = require("../models/transaccion");

// Controlador para obtener todas las transacciones
exports.obtenerTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.find().exec();
    res.json(transacciones);
  } catch (error) {
    console.log("Error al obtener las transacciones:", error);
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};

// Controlador para crear una nueva transacción
exports.crearTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = new Transaccion(req.body);
    console.log(nuevaTransaccion);
    const transaccionGuardada = await nuevaTransaccion.save();
    res.json(transaccionGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Controlador para actualizar una transacción existente
exports.actualizarTransaccion = async (req, res) => {
  try {
    const transaccionActualizada = await Transaccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(transaccionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Controlador para eliminar una transacción existente
exports.eliminarTransaccion = async (req, res) => {
  try {
    const transaccionId = req.params.id;
    if (!transaccionId) {
      return res
        .status(400)
        .json({ error: "El parámetro de identificación es inválido" });
    }
    const transaccionEliminada = await Transaccion.findByIdAndRemove(
      transaccionId
    );
    if (!transaccionEliminada) {
      return res.status(404).json({ error: "La transacción no existe" });
    }

    res.json(transaccionEliminada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
