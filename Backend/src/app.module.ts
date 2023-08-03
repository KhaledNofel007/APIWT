import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { EmployeeIdMiddleware } from './employee/employee.middleware';

@Module({
  imports: [EmployeeModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ABCD#nofel',
    database: 'project_nofel_v2',
    autoLoadEntities: true,
    synchronize: true
  })],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmployeeIdMiddleware).forRoutes('*');
  }
}
