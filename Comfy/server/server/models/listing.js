import mongoose from 'mongoose';

// Fields defined using enum 
const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
});
const listingTypes = Object.freeze({
    shortTerm: 'Short term',
    longTerm: 'Long term',
});
const roomTypes = Object.freeze({
    entire: 'Entire',
    shared: 'Shared',
    private: 'Private'
});

/**
 * Mongoose schema for listing object.
 */
const ListingSchema = mongoose.Schema({
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: false
        },
        city: {

            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    Cost: {
        type: Number
    },
    Leasingterm: {
        type: String,
        required: true,
        enum: Object.values(listingTypes)
    },
    roomType: {
        type: String,
        required: true,
        enum: Object.values(roomTypes)
    },
    totalNoOfBedrooms: {
        type: Number,
        default: 1
    },
    totalNoOfBathrooms: {
        type: Number,
        default: 1
    },
    AboutNeighborhood: {
        type: String
    },
    Amenities: {
        inUnitWasher: {
            type: Boolean,
            default: false
        },
        AC: {
            type: Boolean,
            default: false
        },
        TV: {
            type: Boolean,
            default: false
        },
        wifiIncluded: {
            type: Boolean,
            default: false
        },
        privateBathroom: {
            type: Boolean,
            default: false
        }
    },
    preferredAge: {
        type: String
    },
    preferredGender: {
        type: String,
        enum: Object.values(Genders)
    },
    roommateDescription: {
        type: String
    },
    roommateRules: {
        noDrinking: {
            type: Boolean,
            default: false
        },
        noSmoking: {
            type: Boolean,
            default: false
        },
        noDrugs: {
            type: Boolean,
            default: false
        },
        noPets: {
            type: Boolean,
            default: false
        }
    },
    hostInformation: {
        name: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
        university: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: Object.values(Genders)
        }
    },
    selectedFile: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String
    },
    Favorite: {
        isFavorite: {
            type: Boolean
        },
        byUser: {
            type: String
        }

    }
}, {
    versionKey: false
});
Object.assign(ListingSchema.statics, {
    Genders,
    listingTypes,
    roomTypes
});
/**
 * Duplicating the id field as mongoose returns _id field instead of id.
 */
ListingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
/** 
 * Ensure virtual fields are serialised.
 */
ListingSchema.set('toJSON', {
    virtuals: true
});

// Creating the mongoose model from the schema
const listingModel = mongoose.model('listings', ListingSchema);
export default listingModel;