const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    rollNo: {
        type: String
    },
    lastMealDate: {
        type: String
    },
    lastMeal: {
        type: String
    }
});

mongoose.model('Student', studentSchema);