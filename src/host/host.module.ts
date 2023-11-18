import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostController } from './api/host.controller';
import { HostService } from './api/host.service';
import { HostRepository } from './infrastructure/mongoose/repositories';
import {
  HostModelSchema,
  HostSchema,
} from './infrastructure/mongoose/schemas/host.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HostModelSchema.name,
        schema: HostSchema,
      },
    ]),
  ],
  controllers: [HostController],
  providers: [HostService, HostRepository],
})
export class HostModule {}
