import mongoose from 'mongoose';
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB Connected");
    }).catch((error) => console.log(`${error} did not connect`));
}
export default connectDB;
