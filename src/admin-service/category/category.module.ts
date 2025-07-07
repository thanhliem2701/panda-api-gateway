import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || '',
            signOptions: { expiresIn: '1d' },
        }),
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
                            queueOptions: { durable: true }
                        }
                    }
                }
            },
        ])
    ],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule { }