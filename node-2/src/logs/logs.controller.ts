import { Controller } from '@nestjs/common';
import { LogsService } from './logs.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('/master')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @MessagePattern('node-2')
  async consumer(@Payload() message: {initial_log: number}): Promise<void> {
    if (message.initial_log) {
      await this.logsService.create(message?.initial_log);
    }
  }
}
