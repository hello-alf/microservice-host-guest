import { Injectable } from '@nestjs/common';
import { HostRepository } from '../infrastructure/mongoose/repositories';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class HostService {
  constructor(
    private readonly hostRepository: HostRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}
  getHosts(): string {
    return 'Hello World!';
  }

  async createHost(payload: any): Promise<string> {
    const response = await this.hostRepository.save(payload);
    await this.amqpConnection.publish(
      'booking-service:host-creado',
      '',
      payload,
    );
    return response;
  }
}
