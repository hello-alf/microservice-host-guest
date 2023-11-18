import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HostModule } from './host/host.module';
import { GuestModule } from './guest/guest.module';
import { environments } from './environments';
import config from './host/infrastructure/config';
import { MongooseConfigModule } from './host/infrastructure/mongoose/mongoose.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    HostModule,
    GuestModule,
    MongooseConfigModule,
  ],
})
export class AppModule {}
