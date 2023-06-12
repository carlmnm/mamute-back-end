import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import userRepository from '@/repositories/user-repository'
import { duplicatedEmailError } from './errors';

async function validateUniqueEmail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw duplicatedEmailError();
    }
  }

export async function createUser({name, email, password}: CreateUserParams): Promise<User> {
    await validateUniqueEmail(email)
    const hashedPassword = await bcrypt.hash(password, 12)
    return userRepository.createUser({
        name, 
        email,
        password: hashedPassword,
    })
}

export type CreateUserParams = Pick<User, 'name' | 'email' | 'password'>;

const userService = {
    createUser,
}

export * from './errors'
export default userService