function RibbonListView(parentElement)
{
	this.ParentElement = parentElement;
	this.ContentElement = this.ParentElement.children[0];
	this.ScrollBarElement = this.ParentElement.children[1];
	
	this.ScrollBarUpButton = this.ScrollBarElement.children[0];
	this.ScrollBarDownButton = this.ScrollBarElement.children[1];
	this.ScrollBarDropdownButton = this.ScrollBarElement.children[2];

	this.ScrollPosition = 0;
	this.ScrollHeight = 74;

	this.ScrollBarUpButton.NativeObject = this;
	this.ScrollBarDownButton.NativeObject = this;
	this.ScrollBarUpButton.addEventListener("click", function(e)
	{
		if (this.NativeObject.ShouldScrollUp())
		{
			this.NativeObject.ScrollPosition--;
			this.NativeObject.UpdateScrollPosition();
		}
		
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	this.ScrollBarDownButton.addEventListener("click", function(e)
	{
		if (this.NativeObject.ShouldScrollDown())
		{
			this.NativeObject.ScrollPosition++;
			this.NativeObject.UpdateScrollPosition();
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	this.ShouldScrollDown = function()
	{
		return (this.ContentElement.scrollTop + this.ScrollHeight < this.ContentElement.scrollTopMax);
	};
	this.ShouldScrollUp = function()
	{
		return (this.ContentElement.scrollTop > 0);
	};

	this.UpdateScrollPosition = function()
	{
		var scrollTop = this.ScrollPosition * this.ScrollHeight;
		this.ContentElement.scrollTop = scrollTop;
		
		if (!this.ShouldScrollUp())
		{
			System.ClassList.Add(this.ScrollBarUpButton, "uwt-disabled");
		}
		else
		{
			System.ClassList.Remove(this.ScrollBarUpButton, "uwt-disabled");
		}
		if (!this.ShouldScrollDown())
		{
			System.ClassList.Add(this.ScrollBarDownButton, "uwt-disabled");
		}
		else
		{
			System.ClassList.Remove(this.ScrollBarDownButton, "uwt-disabled");
		}
	};
	
	this.UpdateScrollPosition();
}

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-ribbon-listview");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new RibbonListView(items[i]);
	}
});