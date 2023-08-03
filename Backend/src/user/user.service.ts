import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEmployee, CreateUser } from "src/employee/employeeForm.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        ) {}

    insertUser(mydto: CreateUser): any {
        return this.userRepo.save(mydto);
    }

    findByUserID(id): any {
        return this.userRepo.find({
            where: {id:id},
            relations: {
                employee: true
            },
        });
    }

    showAllUsr(): any {
        return this.userRepo.find()
    }

    async findUsrByID(id) {
        const user = await this.userRepo.findOneById(id);
        console.log('User:', user);
        return user;
    }

    updateUserByID(mydto: CreateUser, id): any {
        return this.userRepo.update(id, mydto)
    }

    deleteUsrByID(id): any {
        return this.userRepo.delete(id)
    }
}