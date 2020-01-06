function Sidebar(parentElement)
{
	this.ParentElement = parentElement;
	this.MenuElement = this.ParentElement.children[0];
	
	for (var i = 0; i < this.MenuElement.children.length; i++)
	{
		if (System.ClassList.Contains(this.MenuElement.children[i], "Command"))
		{
			var a = this.MenuElement.children[i].children[0];
			if (a.href == window.location.href)
			{
				System.ClassList.Add(this.MenuElement.children[i], "Selected");
			}
		}
	}
}

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("Sidebar");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Sidebar(items[i]);
	}
});