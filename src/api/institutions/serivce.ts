import { goCardless } from '../../connector';

class InstitutionsDBStore {
  public institutions: any;
  constructor(institutionsRepo: any) {
    this.institutions = institutionsRepo;
  }

  async syncInstitutions(country: string): Promise<void> {
    let response;
    let { access: access_token } = await goCardless.retrieveAccessToken();

    try {
      response = await goCardless.institutionsLookup(country, access_token);

      await this.institutions.institutionsBulkOps(response);
      console.log('Syncing data into DB...');
    } catch (err) {
      console.log('Failed to get institutions', err);
      throw err;
    }
  }

  async institutionsMappings(): Promise<object> {
    let response: object
    try {
      response = await this.institutions.getList();
    } catch(err) {
      throw err;
    }

    return response;
  }
  async getInstitutionById() {}
}

export default InstitutionsDBStore;
