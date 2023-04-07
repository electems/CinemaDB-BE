import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { EventListnerService } from './eventlistner.service';

@Controller('event')
@ApiTags('forms-json')
@ApiBearerAuth()
export class EventListnerController {
  constructor(private readonly eventListnerService: EventListnerService) {}

  @Post()
  async handleLoginEmail(@Body() user: User): Promise<void> {
    return this.eventListnerService.emitEvent(user);
  }
}
