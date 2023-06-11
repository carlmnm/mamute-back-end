import { Request, Response } from 'express'
import httpStatus from 'http-status'
import userService from '@/services/users-services'

export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    try{ 
        await userService.createUser({name, email, password})
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        res.send(error)
    }
}