import { verify } from 'jsonwebtoken'
import { Response, NextFunction } from 'express';

class Auth {
    constructor() {}

    authenticate = (role: Array<number>) => {
        return (req: any, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                verify(authHeader, process.env.JWT_SECRET, async (err: any, user: any) => {
                    if (err) {
                        return res.status(401).send({
                            message: 'Unauthorized'
                        });
                    }

                    if (!role.includes(user.role)) {
                        return res.status(401).send({
                            message: 'Unauthorized'
                        });
                    }

                    req.user = user;
                    next();
                });
            } else {
                return res.status(401).send({
                    message: 'Unauthorized'
                });
            }
        }
    }
}

export default Auth;