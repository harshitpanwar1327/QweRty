import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { ipKeyGenerator, rateLimit } from 'express-rate-limit'
import { checkConnection } from './config/Database.js'
import { authMiddleware } from './middlewares/AuthMiddleware.js'
import createAllTables from './utils/CreateTables.js'
import UsersRoutes from './routes/UsersRoutes.js'
import SubscriptionRoutes from './routes/SubscriptionRoutes.js'
import QrCodesRoutes from './routes/QrCodesRoutes.js'
import QrAnalyticsRoutes from './routes/QrAnalyticsRoutes.js'

dotenv.config();

let app = express();
let PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req, res) => ipKeyGenerator(req.ip ?? '', 64),
});
app.use(limiter);

app.use('/api/user', UsersRoutes);
app.use('/api', QrAnalyticsRoutes);

app.use(authMiddleware);
app.use('/api', SubscriptionRoutes);
app.use('/api', QrCodesRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({message: "Route not exist!"});
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).send({message: "Internal Server Error!"});
})

app.listen(PORT, '0.0.0.0', async() => {
    console.log(`Listening to the port ${PORT}`);
    try {
        await checkConnection();
        await createAllTables();
    } catch (error) {
        console.log(error);
    }
});