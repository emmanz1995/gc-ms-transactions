import { goCardless } from '../../connector';
import BadRequest from '../../errors/BadRequest';

class InstitutionsDBStore {
  public institutions: any;
  constructor(institutionsRepo: any) {
    this.institutions = institutionsRepo;
  }

  async syncInstitutions(country: string): Promise<void> {
    let response;
    let { access: access_token } = await goCardless.retrieveAccessToken();

    if (!country) throw new BadRequest('Country is required');

    try {
      response = await goCardless.institutionsLookup(country, access_token);

      await this.institutions.institutionsBulkOps(response);
      console.log('Syncing data into DB...');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err &&
        'message' in err &&
        typeof err.message === 'string'
      ) {
        console.log('Failed to get institutions', err.message);
      }
      // @ts-ignore
      throw new Error(err.message);
    }
  }

  async institutionsMappings(payload: {
    skip: number;
    limit: any;
  }): Promise<object> {
    let response: object;

    try {
      response = await this.institutions.getList(payload);
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err &&
        'message' in err &&
        typeof err.message === 'string'
      ) {
        console.log('Failed to get institutions', err.message);
      }
      // @ts-ignore
      throw new Error(err.message);
    }

    return response;
  }
  async searchInstitutionByName(text: any): Promise<object[] | any> {
    let response: object;

    if (!text) throw new BadRequest('Text is required');

    try {
      response = await this.institutions.searchByName(text);
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err &&
        'message' in err &&
        typeof err.message === 'string'
      ) {
        console.log('Failed to search for institutions:', err);
      }
      // @ts-ignore
      throw new Error(err.message);
    }
    return response;
  }
}

export default InstitutionsDBStore;
