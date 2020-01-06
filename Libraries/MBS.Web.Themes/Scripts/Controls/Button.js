function Button(parentElement)
{
	this.ParentElement = parentElement;
	
	this.ButtonElement = this.ParentElement.children[0];
	this.ButtonElement.NativeObject = this;
	
	this.DropDownButtonElement = this.ParentElement.children[1];
	this.DropDownButtonElement.NativeObject = this;
	
	this.DropDownContentElement = this.ParentElement.children[2];
	
	this.getDropDownOpened = function()
	{
		return System.ClassList.Contains(this.DropDownContentElement, "Visible");
	};
	this.setDropDownOpened = function(value)
	{
		if (value)
		{
			System.ClassList.Add(this.DropDownContentElement, "Visible");
			if (this.ParentElement.getAttribute("data-pwt-dropdown-direction") == "right")
			{
				this.DropDownContentElement.style.left = (this.ParentElement.offsetLeft - this.ParentElement.offsetWidth) + "px";
			}
		}
		else
		{
			System.ClassList.Remove(this.DropDownContentElement, "Visible");
		}
	};
	this.toggleDropDownOpened = function()
	{
		this.setDropDownOpened(!this.getDropDownOpened());
	};
	
	this.isDropDownRequired = function()
	{
		return System.ClassList.Contains(this.ParentElement, "pwt-DropDownRequired");
	}

	this.ButtonElement.addEventListener("click", function(e)
	{
		if (this.NativeObject.isDropDownRequired())
		{
			this.NativeObject.setDropDownOpened(true);
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});
	this.DropDownButtonElement.addEventListener("click", function(e)
	{
		this.NativeObject.setDropDownOpened(true);
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
}
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("pwt-Button");
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].tagName.toLowerCase() != "div") continue;
		items[i].NativeObject = new Button(items[i]);
	}
});