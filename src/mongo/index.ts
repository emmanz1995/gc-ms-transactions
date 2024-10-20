import { InstitutionsBulkOps as BulkOps, GetList, Search } from './repository';
import { institutions } from './institutions.model';

const institutionsBulkOps = BulkOps(institutions);
const getList = GetList(institutions);
const searchByName = Search(institutions);

export const institutionsRepository = {
  institutionsBulkOps,
  getList,
  searchByName,
};
