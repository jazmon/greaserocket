const logger = require('../logger');

const createJsonRoute = handler => async (req, res) => {
  try {
    const result = await handler(req, res);
    return res.json({
      data: result,
      error: false,
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(500)
      .set('Content-Type', 'application/json')
      .json({ error: true, data: { message: err.message } });
  }
};

exports.createJsonRoute = createJsonRoute;
