import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Employee, User])],
    controllers: [EmployeeController],
    providers: [EmployeeService, UserService]
})
export class EmployeeModule {}
