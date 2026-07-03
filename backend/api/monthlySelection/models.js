const mongoose = require("mongoose");

const monthlySelectionSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
        unique: true,
        enum: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    },
    year: {
        type: Number,
        required: true
    },
    featured_pokemons: {
        type: [{
            type: Number,
            required: true
        }],
        validate: {
            validator: function(arr) {
                return arr.length === 3;
            },
            message: "Must have exactly 3 featured pokemons"
        }
    },
    featured_type: {
        type: String,
        required: true,
        enum: [
            "normal", "fire", "water", "electric", "grass", "ice",
            "fighting", "poison", "ground", "flying", "psychic", "bug",
            "rock", "ghost", "dragon", "dark", "steel", "fairy"
        ]
    },
    active: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true
});

monthlySelectionSchema.index({ month: 1, year: 1 }, { unique: true });

monthlySelectionSchema.pre('save', async function() {
    if (this.active) {
        await this.constructor.updateMany(
            { _id: { $ne: this._id } },
            { active: false }
        );
    }
});

monthlySelectionSchema.statics.canAddNewMonth = async function() {
    const count = await this.countDocuments();
    return count < 12;
};

monthlySelectionSchema.statics.setActive = async function(selectionId) {
    await this.updateMany({}, { active: false });
    return await this.findByIdAndUpdate(
        selectionId,
        { active: true },
        { new: true }
    );
};

module.exports = mongoose.model("MonthlySelection", monthlySelectionSchema);