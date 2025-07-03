import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminController } from "./admin.controller";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || '',
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.registerAsync([
      {
        name: 'ADMIN_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const amqp_url = configService.get<string>('AMQP_URL') || '';
          const admin_queue = configService.get<string>('ADMIN_QUEUE') || '';
          return {
            transport: Transport.RMQ,
            options: {
              urls: [amqp_url],
              queue: admin_queue,
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }