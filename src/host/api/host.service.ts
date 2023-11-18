import { Injectable } from '@nestjs/common';
import { HostRepository } from '../infrastructure/mongoose/repositories';

@Injectable()
export class HostService {
  constructor(private readonly hostRepository: HostRepository) {}
  getHosts(): string {
    return 'Hello World!';
  }

  async createHost(payload: any): Promise<string> {
    const response = await this.hostRepository.save(payload);
    return response;
  }
}
