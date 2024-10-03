import {LogsService} from './logs.service';
import {Controller, Post} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {LogsEntity} from "./logs.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Controller('/master')
export class LogsController {
    constructor(
        @InjectRepository(LogsEntity)
        private logsRepository: Repository<LogsEntity>,
        private readonly logsService: LogsService
    ) {
    }

    @Post()
    async produceMessage(): Promise<object> {
        const log = await this.logsService.create();
        return {
            data: log,
            status: 200,
        };
    }

    @MessagePattern('master')
    async consumer(@Payload() message: {initial_log: number}): Promise<void> {
        if (message.initial_log) {
            await this.logsRepository.update(message.initial_log, {the_flow_has_ended: true});
        }
    }
}