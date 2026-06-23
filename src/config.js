import { config } from "dotenv";

/* 
USER=kapilthapa1230@gmail.com
PASS=kfke ciof ybpm lmti
PORT=8000
DB_URL=mongodb://localhost:27017/dw27
SECRET_KEY=dw27
 */
config();

export const port = process.env.PORT || 3000;
export const dbURL = process.env.DB_URL;
export const user = process.env.USER;
export const pass = process.env.PASS;
export const secretKey = process.env.SECRETKEY;
export const url = process.env.URL;

/* port=8000
DB_URL=mongodb://0.0.0.0:27017/dw27 */
