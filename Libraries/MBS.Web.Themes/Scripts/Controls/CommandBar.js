function CommandBarItem(parentElement)
{
	this.ParentElement = parentElement;
	parentElement.addEventListener("click", function(e)
	{
		parentElement.className = "CommandBarItem Selected";
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	parentElement.addEventListener("mousemove", function(e)
	{
		var selected = false;
		for (var i = 0; i < parentElement.parentNode.childNodes.length; i++)
		{
			if (parentElement.parentNode.childNodes[i].className == "CommandBarItem Selected")
			{
				selected = true;
				break;
			}
		}
		if (selected)
		{
			for (var i = 0; i < parentElement.parentNode.childNodes.length; i++)
			{
				parentElement.parentNode.childNodes[i].className = "CommandBarItem";
			}
			parentElement.className = "CommandBarItem Selected";
		}
	});
}
function CommandBar(parentElement)
{
	this.ParentElement = parentElement;
	var items = parentElement.childNodes;
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new CommandBarItem(items[i]);
	}
}
function CommandBarContainer(parentElement)
{
	this.ParentElement = parentElement;
	
	var items = parentElement.childNodes;
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new CommandBar(items[i]);
	}
	
	parentElement.addEventListener("contextmenu", function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("CommandBarContainer");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new CommandBarContainer(items[i]);
	}
});
window.addEventListener("click", function(e)
{
	var items = document.getElementsByClassName("CommandBarContainer");
	for (var i = 0; i < items.length; i++)
	{
		var items1 = items[i].childNodes;
		for (var j = 0; j < items1.length; j++)
		{
			var items2 = items1[j].childNodes;
			for (var k = 0; k < items2.length; k++)
			{
				items2[k].className = "CommandBarItem";
			}
		}
	}
});