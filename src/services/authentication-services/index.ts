import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';

async function signIn(params: SignInParams): Promise<SignInResult> {
    const { email, password} = params 
    const user = await getUser(email)
    await validatePassword(password, user.password)
    const token = await createSession(user.id)
    return {
        user: exclude(user, 'password'),
        token,
    }
}

async function getUser(email: string): Promise<GetUserResult> {
    const user = await userRepository.findByEmail(email, {id: true, email: true, password: true})
    if(!user) throw invalidCredentialsError()
    return user
}

async function validatePassword(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword)
    if(!isPasswordValid) throw invalidCredentialsError()
}

async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    await sessionRepository.create({
        token,
        userId,
    })

    return token
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type GetUserResult = Pick<User, 'id' | 'email' | 'password'>;

type SignInResult = {
    user: Pick<User, 'id' | 'email'>;
    token: string;
};

const authenticationServices = { 
    signIn,
}

export default authenticationServices
export * from './errors'