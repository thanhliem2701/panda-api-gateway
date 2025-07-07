import { PutObjectCommand, S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHash } from "crypto";

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucketName: string;
    private region: string;

    constructor(private configService: ConfigService) {
        const bucket = this.configService.get<string>('AWS_BUCKET_NAME');
        const aws_region = this.configService.get<string>('AWS_REGION');
        const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
        const secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');

        if (!bucket) {
            throw new Error('AWS_BUCKET_NAME is not defined in the environment variables !');
        }
        this.bucketName = bucket;
        if (!aws_region) {
            throw new Error('AWS_REGION is not defined !');
        }
        this.region = aws_region;
        if (!accessKeyId) {
            throw new Error('AWS_ACCESS_KEY is not defined !');
        }
        if (!secretAccessKey) {
            throw new Error('AWS_SECRET_KEY is not defined !');
        }

        this.s3 = new S3Client({
            region:this.region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const hash = createHash('sha256').update(file.buffer).digest('hex');
        const fileExtension = file.originalname.split('.').pop();
        //const fileKey = `${Date.now()}-${randomUUID()}-${file.originalname}`;
        const fileKey = `images/${hash}.${fileExtension}`;
        try {
            await this.s3.send(
                new HeadObjectCommand({
                    Bucket: this.bucketName,
                    Key: fileKey,
                }),
            );
            // no error means uploading file already exist, return url
            return this.getPublicUrl(fileKey);
        }
        catch (error) {
            if (error.name !== 'NotFound') {
                throw error;
            }
        }
        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );
        return this.getPublicUrl(fileKey);
    }

    private getPublicUrl(key: string): string {
        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    }
}