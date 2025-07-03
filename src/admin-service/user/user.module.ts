import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
                }
            },
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }