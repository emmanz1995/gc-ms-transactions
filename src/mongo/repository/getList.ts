export default (Model: any) => async () => {
  const listOfInstitutions = await Model.find({})

  if (listOfInstitutions === null) 
    return [];
  return listOfInstitutions;
}