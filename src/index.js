const config = require('./config');
const createLogger = require('./utils/logger');
const connectToDB = require('./utils/db');
const app = require('./app');
const logger = createLogger(__filename);

connectToDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server listening on port ${config.PORT}`);
  });
});
