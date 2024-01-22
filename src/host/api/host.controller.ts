import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateHostDto } from '../application/dtos/host.dto';
import { HostService } from './host.service';
import { LoginHostDto } from '../application/dtos/login.dto';

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
    return this.hostService.createHost(payload);
  }

  @Post('/login')
  login(@Body() payload: LoginHostDto) {
    return this.hostService.authenticate(payload);
  }
}
