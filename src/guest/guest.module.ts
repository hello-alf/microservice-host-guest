import { Module } from '@nestjs/common';
import { GuestController } from './api/guest.controller';
import { GuestService } from './api/guest.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GuestModelSchema,
  GuestSchema,
} from './infrastructure/mongoose/schemas/guest.schema';
import { GuestRepository } from './infrastructure/mongoose/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GuestModelSchema.name,
        schema: GuestSchema,
      },
    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService, GuestRepository],
})
export class GuestModule {}
