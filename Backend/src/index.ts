import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { checkConnection } from './config/Database.js'
import { authMiddleware } from './middlewares/AuthMiddleware.js'
import createAllTables from './utils/CreateTables.js'
import UsersRoutes from './routes/UsersRoutes.js'
import SubscriptionRoutes from './routes/SubscriptionRoutes.js'

dotenv.config();

let app = express();
let PORT = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000
});
app.use(limiter);

app.use('/api/user', UsersRoutes);

app.use(authMiddleware);
app.use('/api/subscription', SubscriptionRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({message: "Route not exist!"});
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).send({message: "Internal Server Error!"});
})

app.listen(PORT, async() => {
    console.log(`Listening to the port ${PORT}`);
    try {
        await checkConnection();
        await createAllTables();
    } catch (error) {
        console.log(error);
    }
});