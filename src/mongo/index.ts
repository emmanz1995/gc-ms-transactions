import { InstitutionsBulkOps as BulkOps } from './repository';
import { institutions } from './institutions.model';

const institutionsBulkOps = BulkOps(institutions);

export const institutionsRepository = {
  institutionsBulkOps,
};
