import { Request, Response } from 'express';
import createUSer from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUSer({ 
        email: 'amaranhao@sjcc.com.br', 
        password: '123456',
        techs: [
            'NodeJS', 
            'ReactJS', 
            'React Native',
            { title: 'Ruby', experience: 1000 }
        ]
    });

    return response.json({ message: 'Hello World'});
}