import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('metrics')
    getGlobalMetrics() {
        return this.dashboardService.getGlobalMetrics();
    }

    @Get('weekly-sales')
    getWeeklySales() {
        return this.dashboardService.getWeeklySales();
    }
}