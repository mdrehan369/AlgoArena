import axios from "axios";
import { v2 } from "cloudinary";
import { type NextRequest, NextResponse } from "next/server";

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const POST = async (req: NextRequest) => {
    try {
        // Download the image
        const body = await req.json()
        const response = await axios({
            url: body.url,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        // Convert the image to a base64 string
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const dataUri = `data:${response.headers['content-type']};base64,${base64Image}`;

        // Upload the image to Cloudinary
        console.log("yaha tk aaya h")
        const uploadResponse = await v2.uploader.upload(dataUri, {
            upload_preset: "AlgoArenaPresets"
        });

        // Return the URL of the uploaded image
        return NextResponse.json({
            publicId: uploadResponse.public_id,
            url: uploadResponse.secure_url,
        });
    } catch (error) {
        console.error('Error downloading or uploading image:', error);
        return NextResponse.json({
            publicId: "",
            url: "",
        });
    }
}