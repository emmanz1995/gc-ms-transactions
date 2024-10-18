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
    // next(err);
    res.status(500).json({ msg: err.message });
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await service.institutionsMappings()
    res.status(200).send({ response, message: 'Institutions successfully fetched' });
  } catch(err: any) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {});

export default router;
