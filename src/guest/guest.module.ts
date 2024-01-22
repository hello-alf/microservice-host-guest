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
import { JwtModule } from '@nestjs/jwt';

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
          name: 'user-service:host-created',
          type: 'fanout',
        },
        {
          name: 'user-service:guest-created',
          type: 'fanout',
        },
      ],
      uri: 'amqp://3.131.89.227:5672',
    }),
    JwtModule.register({
      global: true,
      secret: 'KV7A8XrgCjkdBhhBUn8KbGUZRaWqaKAzKQH4FkzjVBabRYfEzWPC',
      signOptions: { expiresIn: '48h' },
    }),
  ],
  controllers: [GuestController],
  providers: [GuestService, GuestRepository],
})
export class GuestModule {}
