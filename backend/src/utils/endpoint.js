const logger = require('../logger');

const createJsonRoute = handler => async (req, res) => {
  try {
    const result = await handler(req, res);
    return res.json(result);
  } catch (err) {
    logger.error(err);
    return res
      .status(500)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: { message: err.message } });
  }
};

exports.createJsonRoute = createJsonRoute;
