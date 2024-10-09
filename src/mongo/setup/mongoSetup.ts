import mongoose from 'mongoose';

const setup = async () => {
  const { DB_PASSWORD, DB_USERNAME, DB_NAME } = process.env;

  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.im4ha.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('Connected to MongoDB');
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

export default setup;
// password: trPPFkmWDCkkPoBz
// username: emmanza2
