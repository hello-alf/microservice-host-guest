import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HostRepository } from '../infrastructure/mongoose/repositories';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class HostService {
  constructor(
    private readonly hostRepository: HostRepository,
    private readonly amqpConnection: AmqpConnection,
    private jwtService: JwtService,
  ) {}
  getHosts(): string {
    return 'Hello World!';
  }

  async createHost(payload: any): Promise<string> {
    const response = await this.hostRepository.save(payload);
    await this.amqpConnection.publish(
      'booking-service:host-created',
      '',
      payload,
    );
    return response;
  }

  async authenticate(payload): Promise<any> {
    const response = await this.hostRepository.findByEmail(payload.email);
    if (!response) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(payload.password, response.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    if (response.isHost === false) {
      throw new UnauthorizedException();
    }

    const payloadJWT = { sub: response._id, username: response.email };
    return {
      access_token: await this.jwtService.signAsync(payloadJWT),
    };
  }
}
