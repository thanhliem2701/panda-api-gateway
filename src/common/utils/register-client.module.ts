import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export function createClientModule(clientName: string, msvName: string, queueName: string) {
    return ClientsModule.registerAsync([
        {
            name: clientName,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const amqp_url = configService.get<string>(msvName) || '';
                const admin_queue = configService.get<string>(queueName) || '';
                return {
                    transport: Transport.RMQ,
                    options: {
                        urls: [amqp_url],
                        queue: admin_queue,
                        queueOptions: { durable: true },
                    }
                }
            }
        },
    ]);
}