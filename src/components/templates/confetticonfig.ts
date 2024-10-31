const drawHeart = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, 5, -15, 10, -3);
    ctx.bezierCurveTo(15, -15, 20, -3, 20, 0);
    ctx.bezierCurveTo(20, 5, 15, 15, 10, 25);
    ctx.bezierCurveTo(5, 15, 0, 5, 0, 0);
    ctx.fill();
};

const drawSmiley = (ctx: CanvasRenderingContext2D) =>  {
    ctx.beginPath();
    ctx.arc(10, 10, 10, 0, Math.PI * 2, true); // face
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(7, 8, 2, 0, Math.PI * 2, true); // left eye
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(13, 8, 2, 0, Math.PI * 2, true); // right eye
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(10, 12, 5, 0, Math.PI, false); // smile
    ctx.strokeStyle = '#000';
    ctx.stroke();
};

const drawBalloon = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.ellipse(10, 10, 8, 12, Math.PI / 2, 0, Math.PI * 2); // balloon shape
    ctx.fillStyle = '#FF4500';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(10, 22); // string
    ctx.lineTo(10, 30);
    ctx.strokeStyle = '#000';
    ctx.stroke();
};

const drawDefaultShape =(ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.rect(0, 0, 20, 20); // default square shape
    ctx.fillStyle = '#00F'; // color for default shape
    ctx.fill();
};

// Corrected export statement
export default { drawSmiley, drawBalloon, drawDefaultShape, drawHeart };
