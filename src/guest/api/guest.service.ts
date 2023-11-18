import { Injectable } from '@nestjs/common';
import { GuestRepository } from '../infrastructure/mongoose/repositories';

@Injectable()
export class GuestService {
  constructor(private readonly guestRepository: GuestRepository) {}
  getGuests(): string {
    return 'Hello World!';
  }

  async createGuest(payload): Promise<string> {
    const response = await this.guestRepository.save(payload);
    return response;
  }
}
