import { PrismaClient } from '@prisma/client';
import express, { ErrorRequestHandler, request} from 'express';
import { prisma, Prisma } from './prisma';
import { createSense, getAllSenses, updateSense } from './sense';

const app = express();

app.use(express.json());

app.get('/sense', async (req, res, next) => {
    try {

        const senses = await getAllSenses();
        res.send(senses);
    } catch(err) {
        next(err);
    }
})

app.post('/sense', async (req, res, next) => {
    try {
        const senseCreate = req.body.sense;
        const result = await createSense(senseCreate)
        res.status(201).send({sense: result});
    } catch (err) {
       next(err)
    }
})

app.put('/sense', async (req, res, next) => {
    try {
        const senseUpdate = req.body.sense;
        const result = await updateSense(senseUpdate)
        res.status(201).send({sense: result});
    } catch (err) {
       next(err)
    }
})


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {error: err});    
}

app.use(errorHandler)

app.listen(3000, () => {
    console.log('listening on port 3000');
})