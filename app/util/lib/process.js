import sharp from 'sharp';

async function saturateImage(bufferImage) {
    try {
        return sharp(bufferImage).tint({ r: 185, g: 88, b: 72 }).toBuffer();
    } catch (error) {
        console.log(error);
    }
}

async function resizeImage(bufferImage) {
    try {
        return sharp(bufferImage)
            .resize({
                width: 150,
                height: 97,
            })
            .toBuffer();
    } catch (error) {
        console.error(error);
    }
}

async function greyImage(bufferImage) {
    try {
        return sharp(bufferImage).grayscale().toBuffer();
    } catch (error) {
        console.error(error);
    }
}

export { saturateImage, resizeImage, greyImage };
