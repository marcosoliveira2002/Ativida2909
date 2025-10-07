import dotenv from 'dotenv';
import app from './app.js';
import { initDb } from './db.js';


dotenv.config();
const PORT = process.env.PORT || 3000;


(async () => {
await initDb();
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
})();