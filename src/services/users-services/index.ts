import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import userRepository from '@/repositories/user-repository'

export async function createUser({name, email, password}: CreateUserParams): Promise<User> {
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
export default userService