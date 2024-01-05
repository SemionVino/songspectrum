import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    name: String,
    lyrics: String,
    gid: String,
});

export default songSchema;
