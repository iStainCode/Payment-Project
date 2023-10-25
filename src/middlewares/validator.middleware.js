export const validateSchema = (schema) => (req, res, next) => {
  try {
    //recupera los parametros enviados y los campara con el squema
    schema.parse(req.body);
    //si no sale ningun error ejecuta la funciona next()
    next();
  } catch (error) {
    //obtieje los errores y los devuelve en formato json
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};
