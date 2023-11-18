import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateGuestDto } from '../application/dtos/guest.dto';
import { GuestService } from './guest.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('guest')
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}
  @Get('/')
  findAll() {
    return this.guestService.getGuests();
  }

  @Post()
  create(@Body() payload: CreateGuestDto) {
    return this.guestService.createGuest(payload);
  }
}
