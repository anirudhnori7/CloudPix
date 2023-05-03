import { createServer } from 'http';
import express, { json, urlencoded } from 'express';
import helmet, { contentSecurityPolicy as _contentSecurityPolicy } from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mainRoute from './routers/index.js';

class Server {
    initialize() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.corsOptions = {
            origin: '*',
            methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization', 'authorization', 'verification'],
            exposedHeaders: ['authorization', 'verification'],
        };
        this.setupMiddleware();
        this.setupServer();
    }

    setupMiddleware() {
        this.app.use(
            helmet({
                contentSecurityPolicy: {
                    directives: {
                        ..._contentSecurityPolicy.getDefaultDirectives(),
                        'img-src': ["'self'", 's3.amazonaws.com'],
                    },
                },
            })
        );
        this.app.use(json({ limit: '100kb' }));
        this.app.use(urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.app.use(cors(this.corsOptions));
        this.app.use(this.routeConfig);
        if (process.env.NODE_ENV !== 'prod') this.app.use(morgan('dev', { skip: req => req.path === 'api/v1/health' || req.path === '/favicon.ico' }));
        this.app.use('/api/v1', mainRoute);
        this.app.use('*', this.routeHandler);
        this.app.use(this.logErrors);
        this.app.use(this.errorHandler);
    }

    setupServer() {
        this.httpServer.timeout = 10000;
        this.httpServer.listen(process.env.PORT, () => console.log(`Spinning on ${process.env.PORT} 🌀`));
    }

    routeConfig(req, res, next) {
        if (req.path === '/ping') return res.status(200).send({});
        res.reply = ({ code, message }, data = {}, header = undefined) => {
            res.status(code).header(header).jsonp({ message, data });
        };
        return next();
    }

    routeHandler(req, res) {
        res.status(404);
        return res.send({ message: 'Route not found' });
    }

    logErrors(err, req, res, next) {
        console.error(`${req.method} ${req.url}`);
        console.error(`body ->  ${JSON.stringify(req.body)}`);
        console.error(err.stack);
        return next(err);
    }

    errorHandler(err, req, res) {
        res.status(500);
        return res.send({ message: err });
    }
}

export default new Server();
