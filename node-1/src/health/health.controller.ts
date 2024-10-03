import {Controller, Get, HttpStatus} from '@nestjs/common';

@Controller('/health')
export class HealthController {
    @Get()
    async health(): Promise<object> {
        return {
            status: HttpStatus.OK,
            message: 'OK',
        }
    }
}
