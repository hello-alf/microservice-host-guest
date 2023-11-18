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
          name: 'booking-service:host-creado',
          type: 'fanout',
        },
      ],
      uri: 'amqps://farhdenj:BilLhsNpcQHME1p2ItwtM5sZImZaqmDC@shrimp.rmq.cloudamqp.com/farhdenj',
    }),
  ],
  controllers: [HostController],
  providers: [HostService, HostRepository],
})
export class HostModule {}
