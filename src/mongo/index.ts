import { InstitutionsBulkOps as BulkOps, GetList } from './repository';
import { institutions } from './institutions.model';

const institutionsBulkOps = BulkOps(institutions);
const getList = GetList(institutions);

export const institutionsRepository = {
  institutionsBulkOps,
  getList
};
