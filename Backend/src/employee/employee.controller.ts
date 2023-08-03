import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Session, UseGuards, UnauthorizedException, Res, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UserService } from 'src/user/user.service';
import { CreateEmployee } from './employeeForm.dto';
import { CreateUser} from './employeeForm.dto'
import { SessionGuard } from './session.guard';
import { Response } from 'express';


@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService, private userService: UserService) {}

    @Post('/signin')
    @UsePipes(new ValidationPipe())
    async signin(@Session() session, @Body() mydto: CreateEmployee) {
        const res = await (this.employeeService.signin(mydto));
        if(res == true) {
            session.email = mydto.email;
            return (session.email);
        } else {
            throw new UnauthorizedException({ message: "Invalid Credentials" });
        }
    }
    
    @Get()
    getIndexEmployee(): any {
        return this.employeeService.showIndex();
    }
    
    @Get('profile')
    @UsePipes(new ValidationPipe())
    getEmployeeProfile(@Session() session, @Param('name') mydto: CreateEmployee): any {
        if (session.name == mydto.name) {
            return (session.name);
        } else {
            return "TT-TT"
        }
    }

    @Post('createEmployee')
    @UsePipes(new ValidationPipe())
    createEmployee(@Body() mydto: CreateEmployee): any {
        return this.employeeService.insertUserEmployee(mydto);
    }

    @Put('updateEmployee')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateUserEmployee(@Session() session, @Body('email') email: string): any {
        console.log(session.name);
        return this.employeeService.updateUserEmployee(email, session.name);
    }

    /*
    @Delete('/deleteAdmin/:id')
    deleteAdminById(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.deleteUserByAdminId(id);
    }
    */
    
    @Get('/signout')
    signout(@Session() session, @Res() res: Response) {
        if(session.destroy()) {
            res.redirect('/employee');
        } else {
            throw new UnauthorizedException("Invalid action");
        }
    }

    /* User Routes */
    
    @Post('user/insert')
    @UsePipes(new ValidationPipe())
    async insertUser(@Body() empdto: CreateUser, @Req() request) {
       
        return this.userService.insertUser(empdto);

    }

    @Get('user')
    getAllUsr(): any {
        return this.userService.showAllUsr()
    }

    @Get('user/find/:id')
    async findUsrByID(@Param('id') id: number) {
        return this.userService.findUsrByID(id);
    }


    @Put('user/update/:id')
    @UsePipes(new ValidationPipe())
    updateUsrByID(@Body() empdto: CreateUser, @Param('id', ParseIntPipe) id: number): any {
        return this.userService.updateUserByID(empdto, id);
    }

    @Delete('user/delete/:id')
    @UsePipes(new ValidationPipe())
    deleteUsrById(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.deleteUsrByID(id);
    }
    
}
