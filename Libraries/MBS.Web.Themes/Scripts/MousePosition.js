function MousePosition()
{
}
MousePosition.X = 0;
MousePosition.Y = 0;

document.addEventListener("mousemove", function(e)
{
	MousePosition.X = e.clientX;
	MousePosition.Y = e.clientY;
});