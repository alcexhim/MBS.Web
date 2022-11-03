function DragManager()
{
}

DragManager._cx = 0;
DragManager._cy = 0;
DragManager.CurrentElement = null;
DragManager.BeginDrag = function(e, element)
{
	DragManager.CurrentElement = element;
	
	DragManager._ix = DragManager.CurrentElement.offsetLeft;
	DragManager._iy = DragManager.CurrentElement.offsetTop;
	
	System.ClassList.Add(element, "uwt-dragging");
	DragManager._cx = e.clientX;
	DragManager._cy = e.clientY;
};
DragManager.ContinueDrag = function(e)
{
	if (DragManager.CurrentElement != null)
	{
		DragManager.CurrentElement.style.left = (DragManager._ix + (e.clientX - DragManager._cx)) + "px";
		DragManager.CurrentElement.style.top = (DragManager._iy + (e.clientY - DragManager._cy)) + "px";
	}
};
DragManager.EndDrag = function()
{
	if (DragManager.CurrentElement != null)
	{
		System.ClassList.Remove(DragManager.CurrentElement, "uwt-dragging");
		DragManager.CurrentElement = null;
	}
};

window.addEventListener("load", function()
{
	document.addEventListener("mousemove", function (e)
	{
		DragManager.ContinueDrag(e);
	});
	document.addEventListener("mouseup", function (e)
	{
		DragManager.EndDrag();
	});
});