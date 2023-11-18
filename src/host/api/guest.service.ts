import { Injectable } from '@nestjs/common';

@Injectable()
export class HostService {
  getHosts(): string {
    return 'Hello World!';
  }

  createHost(): string {
    return 'Hello World!';
  }
}
