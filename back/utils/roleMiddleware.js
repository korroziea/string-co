import jwt from 'jsonwebtoken';

export default (role) => {
    return function (req, res, next) {
        try {
            const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

            const decoded = jwt.verify(token, 'secret123');
            if (decoded.role !== role) {
                return res.status(403).json({
                    message: 'Нет доступа',
                });
            }
            req.user = decoded;
            next();
        } catch(e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    }
} 