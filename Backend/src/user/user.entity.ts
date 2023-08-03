import { Employee} from 'src/employee/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    department: string;

    @Column()
    salary: number;

    @ManyToOne(() => Employee, (employee) => employee.users)
    employee: Employee

    @Column()
    employeeId: number;
    
}
