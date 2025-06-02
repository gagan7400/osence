const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        maxLength: [30, 'First name cannot exceed 30 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        maxLength: [30, 'Last name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    mobile: {
        type: String,
        required: [true, 'Please enter your mobile number'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Please enter valid mobile number'
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Password should be greater than 8 characters'],
        select: false
    },
    panCard: {
        type: String,
        required: [true, 'Please enter your PAN card number'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
            },
            message: 'Please enter valid PAN card number'
        }
    },
    dob: {
        type: Date,
        required: [true, 'Please enter your date of birth']
    },
    address: {
        street: {
            type: String,
            required: [true, 'Please enter your street address']
        },
        city: {
            type: String,
            required: [true, 'Please enter your city']
        },
        state: {
            type: String,
            required: [true, 'Please enter your state']
        },
        pincode: {
            type: String,
            required: [true, 'Please enter your pincode'],
            validate: {
                validator: function(v) {
                    return /^[0-9]{6}$/.test(v);
                },
                message: 'Please enter valid pincode'
            }
        }
    },
    documents: {
        panCardImage: {
            type: String,
            required: [true, 'Please upload PAN card image']
        },
        addressProof: {
            type: String,
            required: [true, 'Please upload address proof']
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

module.exports = mongoose.model('User', userSchema); 