const canvas = document.getElementById("canvas-container");
const ctx = canvas.getContext('2d');
const color = document.getElementById('colour-picker');
const Fontoptions = document.getElementById("font-options");
const clearButton = document.getElementById('clear');
const footer = document.getElementById('footer');
const date = new Date();
const year = date.getFullYear();
footer.innerHTML = '&copy; ' + year + " Ayush Khemani, All rights reserved"
const downloadButton = document.getElementById('download-button')

let isDrawing = false;


const startDrawing = (e) => {
    e.preventDefault();
    isDrawing = true;
    draw(e);
}

const draw = (e) => {
    
    if (!isDrawing) return;
    else {
        const x = e.type.startsWith('touch') ? e.touches[0].clientX - canvas.getBoundingClientRect().left : e.offsetX;
        const y = e.type.startsWith('touch') ?  e.touches[0].clientY - canvas.getBoundingClientRect().top : e.offsetY;
        ctx.lineCap = 'round'
        ctx.lineTo(x, y);
        ctx.strokeStyle = color.value;
        ctx.lineWidth = Fontoptions.value; 
        ctx.stroke();
    }

}

const stopeDrawing = () => {
    isDrawing = false;
    ctx.beginPath();
}
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);


canvas.addEventListener('mousemove', draw)
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('mouseup', stopeDrawing);
canvas.addEventListener('touchend', stopeDrawing)



clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

downloadButton.addEventListener('click', () => {
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = 'sign.png';
    link.click();

})
