const input = document.getElementById('imgInput');
const resizeBtn = document.getElementById('resizeBtn');
const greyBtn = document.getElementById('greyBtn');
const saturateBtn = document.getElementById('saturateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const img = document.getElementById('img');

resizeBtn.disabled = true;
greyBtn.disabled = true;
saturateBtn.disabled = true;
deleteBtn.disabled = true;

let fileName = '';
input.addEventListener('change', stateHandle);

function resizeImage(imageBuffer) {
    const formData = new FormData();
    formData.append('imageBuffer', imageBuffer);
    axios
        .post(
            'http://54.162.151.9:3000/api/v1/resize',
            { imageBuffer: formData.get('imageBuffer') },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(res => {
            img.src = res.data.data.image;
            window.open(res.data.data.image);
            fileName = res.data.data.fileName;
            deleteBtn.disabled = false;
        })
        .catch(e => {
            console.log(formData.get('imageBuffer'));
        });
}

function saturateImage(imageBuffer) {
    const formData = new FormData();
    formData.append('imageBuffer', imageBuffer);
    axios
        .post(
            'http://54.162.151.9:3000/api/v1/saturate',
            { imageBuffer: formData.get('imageBuffer') },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(res => {
            img.src = res.data.data.image;
            window.open(res.data.data.image);
            fileName = res.data.data.fileName;
            deleteBtn.disabled = false;
        })
        .catch(e => {
            console.log(formData.get('imageBuffer'));
        });
}
function greyImage(imageBuffer) {
    const formData = new FormData();
    formData.append('imageBuffer', imageBuffer);
    axios
        .post(
            'http://54.162.151.9:3000/api/v1/grey',
            { imageBuffer: formData.get('imageBuffer') },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(res => {
            img.src = res.data.data.image;
            window.open(res.data.data.image);
            fileName = res.data.data.fileName;
            deleteBtn.disabled = false;
        })
        .catch(e => {
            console.log(formData.get('imageBuffer'));
        });
}

function deleteImage(fileName) {
    axios
        .post(
            'https://mepc6bb8tb.execute-api.us-east-1.amazonaws.com/default/deleteObject',
            { sFileName: fileName },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(res => {
            alert('Image Deleted!!');
        });
}

function stateHandle() {
    if (!input.value) {
        console.log('his');
        resizeBtn.disabled = true;
        greyBtn.disabled = true;
        saturateBtn.disabled = true;
    } else {
        resizeBtn.disabled = false;
        greyBtn.disabled = false;
        saturateBtn.disabled = false;
    }
}

resizeBtn.addEventListener('click', e => {
    resizeImage(input.files[0]);
    input.value = '';
});

greyBtn.addEventListener('click', e => {
    greyImage(input.files[0]);
    input.value = '';
});

saturateBtn.addEventListener('click', e => {
    saturateImage(input.files[0]);
    input.value = '';
});

deleteBtn.addEventListener('click', e => {
    deleteImage(fileName);
    img.src = null;
    input.value = '';
});
