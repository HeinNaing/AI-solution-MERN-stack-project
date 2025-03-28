const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    readTime: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    content: {
        introduction: {
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        },
        sections: [{
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            quote: {
                type: String,
                required: false
            }
        }],
        conclusion: {
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    },
    author: {
        type: String,
        required: true,
        default: 'AI Solutions Team'
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
blogPostSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
