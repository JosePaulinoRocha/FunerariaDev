import { createPool } from 'mysql2/promise';

export async function connect() {
    return createPool(
       
         {
             host: 'localhost',
             user: 'root',
             password: '',
             database: 'funeraria_db',
             connectionLimit: 10,
             timezone: 'local',
         }
    );
}
