const _ = {};

const validation = {
    imageFormat: [
        { extension: 'jpeg', type: 'image/jpeg' },
        { extension: 'jpg', type: 'image/jpeg' },
        { extension: 'png', type: 'image/png' },
        { extension: 'heic', type: 'image/heic' },
        { extension: 'heif', type: 'image/heif' },
    ],
};
_.checkValidImageType = function (sFileName, sContentType) {
    const extension = sFileName.split('.').pop().toLowerCase();
    const valid = validation.imageFormat.find(format => format.extension === extension && format.type === sContentType);
    return !!valid;
};

export default _;
