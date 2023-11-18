import { Module } from '@nestjs/common';
import { GuestController } from './api/guest.controller';
import { GuestService } from './api/guest.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GuestModelSchema,
  GuestSchema,
} from './infrastructure/mongoose/schemas/guest.schema';
import { GuestRepository } from './infrastructure/mongoose/repositories';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GuestModelSchema.name,
        schema: GuestSchema,
      },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'booking-service:guest-creado',
          type: 'fanout',
        },
      ],
      uri: 'amqps://farhdenj:BilLhsNpcQHME1p2ItwtM5sZImZaqmDC@shrimp.rmq.cloudamqp.com/farhdenj',
    }),
  ],
  controllers: [GuestController],
  providers: [GuestService, GuestRepository],
})
export class GuestModule {}
