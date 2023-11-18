import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateHostDto } from '../application/dtos/host.dto';
import { HostService } from './guest.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('host')
@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}
  @Get('/')
  findAll() {
    return this.hostService.getHosts();
  }

  @Post()
  create(@Body() payload: CreateHostDto) {
    return this.hostService.createHost();
  }
}
