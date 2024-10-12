export default (Model: any) => async (institutions: any[]) => {
  const bulkOps = institutions.map(institution => ({
    updateOne: {
      filter: { _id: institution.id },
      update: { $set: institution },
      upsert: true,
    },
  }));

  let bulkingInstitution;
  try {
    bulkingInstitution = await Model.bulkWrite(bulkOps);

    console.log(`Matched: ${bulkingInstitution.matchedCount}`);
    console.log(`Modified: ${bulkingInstitution.modifiedCount}`);
    console.log(`Inserted: ${bulkingInstitution.upsertedCount}`);
  } catch (err) {
    console.error('Error during bulkWrite operation:', err);
  }

  return bulkingInstitution;
};
