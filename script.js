const fileInput = document.getElementById('file');
const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const generateMemeButton = document.getElementById('generate-meme');
const downloadMemeButton = document.getElementById('download-meme');
const memeCanvas = document.getElementById('meme-canvas');
const ctx = memeCanvas.getContext('2d');

generateMemeButton.addEventListener('click', generateMeme);
downloadMemeButton.addEventListener('click', downloadMeme);

function generateMeme() {
    const file = fileInput.files[0];
    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        const image = new Image();
        image.src = imageData;
        image.onload = function() {
            memeCanvas.width = image.width;
            memeCanvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            ctx.font = '40px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(topText, 10, 10);
            ctx.fillText(bottomText, 10, memeCanvas.height - 50);
        };
    };
    reader.readAsDataURL(file);
}

function downloadMeme() {
    const dataURL = memeCanvas.toDataURL();
    const blob = dataURLToBlob(dataURL);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meme.jpg';
    a.click();
    URL.revokeObjectURL(url);
}

function dataURLToBlob(dataURL) {
    const binaryString = window.atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/jpeg' });
}