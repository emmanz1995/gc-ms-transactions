import express, { Request, Response, NextFunction } from 'express';
import InstitutionsDBStore from './serivce';
import { institutionsRepository } from '../../mongo';
import { institutions } from '../../mongo/institutions.model';

const router = express.Router();

const service = new InstitutionsDBStore(institutionsRepository);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { country } = req.body;
  try {
    await service.syncInstitutions(country);
    res.status(202).send({ message: 'Institutions successfully Synced' });
  } catch (err: any) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page: any = req.query.page || 1;
    const limit: any = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const totalInstitutions: any = (await institutions.find()).length;
    const totalPages = Math.ceil(totalInstitutions / +limit);

    const response = await service.institutionsMappings({
      skip,
      limit,
    });
    res.status(200).send({
      currentPage: page,
      limit,
      totalPages,
      response,
      message: 'Institutions successfully fetched',
    });
  } catch (err: unknown) {
    next(err);
  }
});

router.get(
  '/search',
  async (req: Request, res: Response, next: NextFunction) => {
    const text = req.query.text;

    try {
      const response = await service.searchInstitutionByName(text);
      res.status(200).send(response);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
