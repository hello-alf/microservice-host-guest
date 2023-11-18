import { Module } from '@nestjs/common';
import { HostController } from './api/guest.controller';
import { HostService } from './api/guest.service';

@Module({
  imports: [],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
