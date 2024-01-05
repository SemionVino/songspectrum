import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: String,
    gid: String,
});

export default artistSchema;
