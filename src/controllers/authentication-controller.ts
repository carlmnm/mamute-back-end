import { Request, Response } from 'express'
import httpStatus from 'http-status'
import authenticationServices, { SignInParams } from '@/services/authentication-services'

export async function singInPost(req: Request, res: Response) {
    const { email, password } = req.body as SignInParams

    try{
        const result = await authenticationServices.signIn({email, password})
        return res.status(httpStatus.OK).send(result)
    } catch ( errors ) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}

