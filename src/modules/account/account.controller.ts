import {
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.accountService.findById(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number) {
    return this.accountService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findBalance(@Query('account_id') accountId: string) {
    return this.accountService.findBalance(accountId);
  }
}
