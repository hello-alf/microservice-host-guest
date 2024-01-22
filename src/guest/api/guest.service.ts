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
    let exchange = 'user-service:guest-created';

    if (payload.isHost === true) {
      exchange = 'user-service:host-created';
    }

    console.log('exchange', exchange);

    await this.amqpConnection.publish(exchange, '', {
      _id: response._id.toString(),
      name: response.name,
      lastname: response.lastname,
      city: response.city,
      country: response.country,
      email: response.email,
    });
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

    const payloadJWT = {
      sub: response._id,
      username: response.email,
      isHost: response.isHost,
      isGuest: response.isGuest,
    };

    return {
      access_token: await this.jwtService.signAsync(payloadJWT),
    };
  }
}
