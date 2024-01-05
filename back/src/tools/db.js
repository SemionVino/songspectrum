import mongoose from 'mongoose';
const connectionString = 'mongodb+srv://semionvinogradov:9pRzcVHPdpBslbrY@cluster0.00pqkdh.mongodb.net/';

mongoose.connect(connectionString)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

/* * semionvinogradov
 * 9pRzcVHPdpBslbrY */