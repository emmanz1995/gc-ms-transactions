export default (Model: any) =>
  async (payload: { skip: number; limit: any }) => {
    const { skip, limit } = payload;
    const listOfInstitutions = await Model.find({}).skip(skip).limit(limit);

    if (listOfInstitutions === null) return [];
    return listOfInstitutions;
  };
