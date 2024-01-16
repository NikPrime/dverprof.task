import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterInputDto } from './dto/user-register-input.dto';
import { UserRegisterOutputDto } from './dto/user-register-output.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        operationId: 'getUserById',
        summary: 'get user by id',
    })
    @ApiResponse({
        status: 200,
        description: 'get user by id',
        type: UserDto,
    })
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @ApiOperation({
        operationId: 'registerUser',
        summary: 'user register',
    })
    @ApiResponse({
        status: 200,
        description: '',
        type: UserRegisterOutputDto,
    })
    @Post()
    async registerUser(@Body() user: UserRegisterInputDto) {
        return this.userService.register(user);
    }
}
