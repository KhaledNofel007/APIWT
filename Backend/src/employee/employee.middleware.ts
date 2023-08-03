import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class EmployeeIdMiddleware implements NestMiddleware {
    use(req, _res, next) {
        req.employeeId = req.session.employeeId;
        next();
    }
}
