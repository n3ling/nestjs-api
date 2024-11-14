import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    ]

    findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

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
