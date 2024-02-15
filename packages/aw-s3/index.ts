import * as Minio from 'minio';
import { env } from '@aw/env';
import { updatedObjectInfo } from './types/updatedObject';

export default class S3Client {
  private minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      accessKey: env('accessKey') as string,
      secretKey: env('secretAccessKey') as string,
      endPoint: env('bucketEndpoint') as string,
    });
  }

  async uploadFile(bucketName: string, objectName: string, filePath: string, contentType): Promise<updatedObjectInfo | void> {
    try {
      return await this.minioClient.fPutObject(bucketName, objectName, filePath, contentType);
    } catch (e) {
      throw new Error(e);
    }
  }

  async downloadFile(bucketName: string, objectName: string, filePath: string): Promise<string> {
    try {
      await this.minioClient.fGetObject(bucketName, objectName, filePath);
      return filePath;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteFile(bucketName: string, objectName: string): Promise<void> {
    try {
      await this.minioClient.removeObject(bucketName, objectName);
    } catch (e) {
      throw new Error(e);
    }
  }
}
