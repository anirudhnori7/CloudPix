import { PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

var client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID,
        secretAccessKey: process.env.AWS_SECRETKEY,
    },
});

async function deleteObject(sPath) {
    try {
        console.log('sPath :: ', sPath);
        return client.send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET_NAME, Key: sPath }));
    } catch (error) {
        console.error(`Error in deleteObject ${error}`);
    }
}

async function putObj(sFileName, sContentType, path, fileStream) {
    try {
        sFileName = sFileName.replace('/', '-');
        sFileName = sFileName.replace(/\s/gi, '-');
        await client.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: path + sFileName,
                ContentType: sContentType,
                Body: fileStream,
            })
        );
        return sFileName;
    } catch (error) {
        console.error(`Error in putObj ${error.message}`);
        throw new Error(error);
    }
}

export { putObj, deleteObject };
