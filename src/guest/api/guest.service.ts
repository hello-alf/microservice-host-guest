import { Injectable } from '@nestjs/common';
import { GuestRepository } from '../infrastructure/mongoose/repositories';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class GuestService {
  constructor(
    private readonly guestRepository: GuestRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}
  getGuests(): string {
    return 'Hello World!';
  }

  async createGuest(payload): Promise<string> {
    const response = await this.guestRepository.save(payload);
    await this.amqpConnection.publish(
      'booking-service:guest-creado',
      '',
      payload,
    );
    return response;
  }
}
