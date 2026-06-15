import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/entities/admins/admins.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly adminService: AdminsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            throw new UnauthorizedException('Not authenticated');
        }
        const user = await this.adminService.get_by_id(request.user.user_id);
        if (!user)
            throw new UnauthorizedException('Admin access required');
        return true;
    }
}
