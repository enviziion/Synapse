function renderNerve(context, nerve) {
	var p1 = nerve.points[0];
	var p2 = nerve.points[1];
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 1;
	context.strokeStyle = '#7a5ebc';
	context.stroke();
}
export default renderNerve;