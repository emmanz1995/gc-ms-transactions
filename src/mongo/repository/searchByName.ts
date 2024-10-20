export default (Model: any) => async (text: string) => {
  let searchInstitution;
  if (typeof text === 'string') {
    searchInstitution = await Model.find({
      name: { $regex: `${text}`, $options: 'i' },
    });
  }

  if (searchInstitution === null) {
    return [];
  }
  return searchInstitution;
};
