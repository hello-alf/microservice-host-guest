import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GuestRepository } from '../infrastructure/mongoose/repositories';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GuestService {
  constructor(
    private readonly guestRepository: GuestRepository,
    private readonly amqpConnection: AmqpConnection,
    private jwtService: JwtService,
  ) {}
  getGuests(): string {
    return 'Hello World!';
  }

  async createGuest(payload): Promise<string> {
    const response = await this.guestRepository.save(payload);
    await this.amqpConnection.publish(
      'booking-service:guest-created',
      '',
      payload,
    );
    return response;
  }

  async authenticate(payload): Promise<any> {
    const response = await this.guestRepository.findByEmail(payload.email);
    if (!response) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(payload.password, response.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    if (response.isGuest === false) {
      throw new UnauthorizedException();
    }

    const payloadJWT = { sub: response._id, username: response.email };
    return {
      access_token: await this.jwtService.signAsync(payloadJWT),
    };
  }
}
