function StackContainer(parentElement)
{
	this.ParentElement = parentElement;
	this.SwitchToIndex = function(index)
	{
		for (var i = 0; i < this.ParentElement.children.length; i++)
		{
			if (i == index)
			{
				System.ClassList.Add(this.ParentElement.children[i], "uwt-visible");
			}
			else
			{
				System.ClassList.Remove(this.ParentElement.children[i], "uwt-visible");
			}
		}
	};
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("uwt-stack-container");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new StackContainer(items[i]);
	}
});