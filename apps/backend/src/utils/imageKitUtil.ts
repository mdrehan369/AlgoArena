import fs from "fs";
import axios from "axios";

export class ImageKitUtil {
  private publicKey: string;
  private privateKey: string;

  uploadImageEndpoint = "https://upload.imagekit.io/api/v2/files/upload";
  deleteImageEndpoint = "https://api.imagekit.io/v1/files";

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  async deleteImage(fileId: string) {
    try {
      const options = {
        method: "DELETE",
        url: this.deleteImageEndpoint + `/${fileId}`,
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(this.privateKey + ":").toString("base64")}`,
        },
      };

      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async uploadImage(filePath: string, fileName: string) {
    try {
      const fileContent = fs.readFileSync(filePath);

      const formData = new FormData();
      formData.append("file", fileContent.toString("base64"));
      formData.append("fileName", fileName);

      const options = {
        method: "POST",
        url: this.uploadImageEndpoint,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(this.privateKey + ":").toString("base64")}`,
        },
        data: formData,
      };

      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
