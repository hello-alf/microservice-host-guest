import { Module } from '@nestjs/common';
import { GuestController } from './api/guest.controller';
import { GuestService } from './api/guest.service';

@Module({
  imports: [],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
