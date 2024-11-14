import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id

    order of routes matters
    */

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users/?role=value&age=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post() // POST /users
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ADMIN' | 'ENGINEER'}) {
        return this.usersService.create(user)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: { name?: string, email?: string, role?: 'INTERN' | 'ADMIN' | 'ENGINEER'}) {
        return this.usersService.update(id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
