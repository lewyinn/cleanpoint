import mongoose from "mongoose";

mongoose

const ReportSchema = new mongoose.Schema(
    {
        reporter: {
            name: String,
            email: String,
            phone: String,
        },
        category: String,
        title: String,
        description: String,
        imageUrl: String,
        location: {
            address: String,
            lat: Number,
            lng: Number,
        },
        status: {
            type: String,
            default: "Menunggu Ditinjau",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Report ||
    mongoose.model("Report", ReportSchema);
