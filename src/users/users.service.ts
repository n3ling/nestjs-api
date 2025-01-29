import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Nate Ling",
            "email": "nling@email.com",
            "role": "ENGINEER"
        },
        {
            "id": 2,
            "name": "Anita Ngo",
            "email": "anita@email.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Chunky",
            "email": "chunky@email.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Ducky",
            "email": "ducky@email.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "BB",
            "email": "bb@email.com",
            "role": "ENGINEER"
        },
        {
            "id": 6,
            "name": "Quagsire",
            "email": "quagsire@email.com",
            "role": "ENGINEER"
        },
        {
            "id": 7,
            "name": "Quagsir",
            "email": "quagsir@email.com",
            "role": "INTERN"
        },
        {
            "id": 8,
            "name": "Pikachu",
            "email": "pikachu@email.com",
            "role": "ADMIN"
        },
        {
            "id": 9,
            "name": "Stubby",
            "email": "stubby@email.com",
            "role": "INTERN"
        },
        {
            "id": 10,
            "name": "Tuxedo Sam",
            "email": "sam@email.com",
            "role": "INTERN"
        },
        // comment for change again
    ]

    findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Role Does Not Exist')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException('User Not Found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removeUser
    }
}
