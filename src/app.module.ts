import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestModule } from './guest/guest.module';
import { environments } from './environments';
import config from './guest/infrastructure/config';
import { MongooseConfigModule } from './guest/infrastructure/mongoose/mongoose.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    GuestModule,
    MongooseConfigModule,
  ],
})
export class AppModule {}
