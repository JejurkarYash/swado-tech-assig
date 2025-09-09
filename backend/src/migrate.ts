import pool from "./db.ts";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function migrate() {
    try {
        // Read schema.sql
        const filePath = path.join(__dirname, 'schema.sql');
        const sql = fs.readFileSync(filePath, 'utf-8');

        // Run SQL
        await pool.query(sql);
        console.log('Migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
    }
}

