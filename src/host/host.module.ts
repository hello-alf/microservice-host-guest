import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostController } from './api/host.controller';
import { HostService } from './api/host.service';
import { HostRepository } from './infrastructure/mongoose/repositories';
import {
  HostModelSchema,
  HostSchema,
} from './infrastructure/mongoose/schemas/host.schema';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HostModelSchema.name,
        schema: HostSchema,
      },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'booking-service:host-created',
          type: 'fanout',
        },
      ],
      uri: 'amqps://farhdenj:BilLhsNpcQHME1p2ItwtM5sZImZaqmDC@shrimp.rmq.cloudamqp.com/farhdenj',
    }),
    JwtModule.register({
      global: true,
      secret: 'KV7A8XrgCjkdBhhBUn8KbGUZRaWqaKAzKQH4FkzjVBabRYfEzWPC',
      signOptions: { expiresIn: '48h' },
    }),
  ],
  controllers: [HostController],
  providers: [HostService, HostRepository],
})
export class HostModule {}
