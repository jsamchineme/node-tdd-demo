const { Pool } = require('pg');
const dotenv = require('dotenv');
const debug = require('debug')('database');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
});

debug('CONNECTING TO DATABASE');
pool.on('connect', () => {
  debug('CONNECTED TO DATABASE');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
                      reflections(
                        id            UUID PRIMARY KEY,
                        success       VARCHAR(128) NOT NULL,
                        low_point     VARCHAR(128) NOT NULL,
                        take_away     VARCHAR(128) NOT NULL,
                        created_date  TIMESTAMP,
                        modified_date TIMESTAMP
                      )`;

  pool.query(queryText)
    .then((res) => {
      debug('QUERY COMPLETED', res);
      pool.end();
    })
    .catch((err) => {
      debug('QUERY ERROR', err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections';
  pool.query(queryText)
    .then((res) => {
      debug('QUERY COMPLETED', res);
      pool.end();
    })
    .catch((err) => {
      debug('QUERY ERROR', err);
      pool.end();
    });
};

pool.on('remove', () => {
  debug('CLIENT REMOVED');
  process.exit(0);
});

createTables();

module.exports = {
  createTables,
  dropTables,
};

// require('make-runnable');
