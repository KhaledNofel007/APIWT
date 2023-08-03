import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployee } from './employeeForm.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
    ) {}

    showIndex(): any {
        return this.employeeRepo.find()
    }

    getProfile(): any {
        return this.employeeRepo.find()
    }

    async insertUserEmployee(mydto: CreateEmployee) {
        const salt = await bcrypt.genSalt()
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.employeeRepo.save(mydto);
    }

    updateUserEmployee(email, name): any {
        return this.employeeRepo.update({email:email}, {name:name});
    }

    findByEmployeeId(id): any {
        return this.employeeRepo.find({ 
            where: {id:id},
            relations: {
                users: true,
            },
        });
    }

    deleteUserByEmployeeId(id): any {
        return this.employeeRepo.delete(id);
    }

    async signin(mydto: CreateEmployee){
    
        if (mydto.email != null && mydto.password != null) {
            const mydata = await this.employeeRepo.findOneBy({ email: mydto.email });
            const isMatch = await bcrypt.compare(mydto.password, mydata.password);
            if (isMatch) {
                return true;
            }
            else {
                return false;
            }
        } else {
            return false;
        }
    
    }
}
