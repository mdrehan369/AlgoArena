'use server'

import { Prisma } from "@prisma/client";
import axios from "axios";
import { v2 } from "cloudinary"

// Configuration
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const deleteImage = async (public_id: string) => {
    try {
        const response = await v2.uploader.destroy(public_id)
        return response
    } catch (err) {
        console.log(err)
        return null
    }
}

export const downloadAndUploadImage = async (imageUrl: string): Promise<Prisma.ImageCreateInput> => {
    try {
        // Download the image
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        // Convert the image to a base64 string
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const dataUri = `data:${response.headers['content-type']};base64,${base64Image}`;

        // Upload the image to Cloudinary
        const uploadResponse = await v2.uploader.upload(dataUri, {
            upload_preset: "AlgoArenaPresets"
        });

        // Return the URL of the uploaded image
        return {
            publicId: uploadResponse.public_id,
            url: uploadResponse.secure_url,
        };
    } catch (error) {
        console.error('Error downloading or uploading image:', error);
        return {
            publicId: "",
            url: "",
        };
    }
}