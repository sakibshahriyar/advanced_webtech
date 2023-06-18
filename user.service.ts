import { Injectable } from '@nestjs/common';
import { CreateUserDto} from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    return this.users.find(user => user.id === id);
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: Date.now(), // Assign a unique ID
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findById(id);
    if (user) {
      // Update user properties
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.email = updateUserDto.email;
    }
    return user;
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
