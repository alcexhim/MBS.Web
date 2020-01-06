function SplitContainer(id, splitterPosition)
{
	this.ID = id;
	this.SplitterPosition = splitterPosition;

	var parent = this;
	var splitPanelPrimary = document.getElementById("SplitContainer_" + this.ID + "_Primary");
	var splitter = document.getElementById("SplitContainer_" + this.ID + "_Splitter");

	this.Update = function()
	{
		splitPanelPrimary.style.width = (parent.SplitterPosition + "px");
	};

	splitter.addEventListener("mousedown", function(e)
	{
		parent._Dragging = true;

		parent.InitialSplitterPosition = splitPanelPrimary.offsetWidth;
		parent.InitialX = e.clientX;

		e.preventDefault();
		e.stopPropagation();

		document.body.style.cursor = "col-resize !important";
	});
	window.addEventListener("mousemove", function(e)
	{
		if (parent._Dragging)
		{
			parent.SplitterPosition = (parent.InitialSplitterPosition + (e.clientX - parent.InitialX));
			parent.Update();

			e.preventDefault();
			e.stopPropagation();
		}
	});
	window.addEventListener("mouseup", function(e)
	{
		parent._Dragging = false;
		document.body.style.cursor = "inherit";
	});
}
