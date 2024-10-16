import express, { Request, Response, NextFunction } from 'express';
import InstitutionsDBStore from './serivce';
import { institutionsRepository } from '../../mongo';

const router = express.Router();

const service = new InstitutionsDBStore(institutionsRepository);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { country } = req.body;
  try {    
    await service.syncInstitutions(country);
    res.status(202).send({ message: 'Institutions successfully Synced' });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {});

export default router;
