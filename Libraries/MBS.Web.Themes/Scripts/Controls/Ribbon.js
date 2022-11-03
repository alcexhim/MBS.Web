function Ribbon(parentElement)
{
	this.ParentElement = parentElement;
	
	this._applicationButton = this.ParentElement.children[0];
	this._ulButtons = this.ParentElement.children[1];
	this._divContents = this.ParentElement.children[2];
	
	this.ToggleCollapsed = function()
	{
		System.ClassList.Toggle(this.ParentElement, "uwt-ribbon-collapsed");
	};
	
	this.SwitchTo = function(index)
	{
		for (var i = 0; i < this._ulButtons.children.length; i++)
		{
			if (index == i)
			{
				System.ClassList.Add(this._ulButtons.children[i], "uwt-selected");
				System.ClassList.Add(this._divContents.children[i], "uwt-visible");
			}
			else
			{
				System.ClassList.Remove(this._ulButtons.children[i], "uwt-selected");
				System.ClassList.Remove(this._divContents.children[i], "uwt-visible");
			}
		}
	};
	
	for (var i = 0; i < this._ulButtons.children.length; i++)
	{
		this._ulButtons.children[i].NativeObject = this;
		this._ulButtons.children[i]._index = i;
		this._ulButtons.children[i].addEventListener("click", function(e)
		{
			this.NativeObject.SwitchTo(this._index);
		});
		this._ulButtons.children[i].addEventListener("dblclick", function(e)
		{
			this.NativeObject.ToggleCollapsed();
		});
	}
}

window.addEventListener("load", function()
{

	var items = document.getElementsByClassName("uwt-ribbon");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Ribbon(items[i]);
	}

});