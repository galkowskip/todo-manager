// connect to postgresql

import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'postgres',
    port: 5432,
});

export {
    pool,
}