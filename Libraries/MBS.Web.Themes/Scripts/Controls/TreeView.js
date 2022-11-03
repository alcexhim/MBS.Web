function TreeView(parentElement)
{
	this.ParentElement = parentElement;
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("uwt-treeview");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new TreeView(items[i]);
	}
	
	var togglers = document.getElementsByClassName("uwt-treeview-toggler");
	for (var i = 0; i < togglers.length; i++)
	{
		togglers[i].addEventListener("click", function(e)
		{
			System.ClassList.Toggle(this.parentElement.parentElement, "uwt-expanded");
		});
	}
});
