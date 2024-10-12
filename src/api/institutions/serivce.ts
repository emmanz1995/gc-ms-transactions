import { institutionsRepository } from '../../mongo';
import { goCardless } from '../../connector';

class SyncInstitutionsToDB {
  public institutions: void;
  constructor(institutions: any) {
    this.institutions = institutions;
  }

  async syncInstitutions(): Promise<void> {
    const { BASE_URL } = process.env;
  }
}

export default SyncInstitutionsToDB;
