//make a element where you can upload a image and display it in a canvas
const input1 = document.createElement('input');
input1.type = 'file';
input1.accept = 'image/*';
input1.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            //make the canvas style 100px by 100px
            canvas.style.width = '200px';
            canvas.style.height = '200px';
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            document.body.appendChild(canvas);
            //read the image data from the canvas and create a new image
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            //create a new image data object
            const newImageData = ctx.createImageData(canvas.width, canvas.height);
            const newData = newImageData.data;
            //loop through the image data and set the new data to the old data
            
            let seededRandomNumberGenerator = new Math.seedrandom('abc');
            for (let i = 0; i < data.length; i += 4) {
                let temp = Math.round(seededRandomNumberGenerator()*100000);
                newData[i] = (data[i] + temp) % 255; // red
                newData[i + 1] = (data[i + 1] + temp) % 255; // green
                newData[i + 2] = (data[i + 2] + temp) % 255; // blue
                newData[i + 3] = data[i + 3]; // alpha
            }
            //set the new image data to the canvas
            ctx.putImageData(newImageData, 0, 0);
            //create a new image from the canvas and show the new image on the page
            const newImg = new Image();
            newImg.src = canvas.toDataURL();
            newImg.style.width = '200px';
            newImg.style.height = '200px';
            newImg.onload = () => {
                document.body.appendChild(newImg);
            };

        };
    };
    reader.readAsDataURL(file);
});
document.body.appendChild(input1);
