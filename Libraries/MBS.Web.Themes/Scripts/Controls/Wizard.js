function Wizard(parentElement)
{
	this.ParentElement = parentElement;
	this.TabContainerElement = this.ParentElement.childNodes[0];
	this.TabPageContainerElement = this.ParentElement.childNodes[1];
	
	for (var i = 0; i < this.TabContainerElement.childNodes.length; i++)
	{
		this.TabContainerElement.childNodes[i].NativeObject = this;
		this.TabContainerElement.childNodes[i].Index = i;
		
		System.AddEventListener(this.TabContainerElement.childNodes[i], "click", function(e)
		{
			this.NativeObject.SetSelectedPageIndex(this.Index);
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		System.AddEventListener(this.TabContainerElement.childNodes[i], "contextmenu", function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	}
	
	this.GetSelectedPageIndex = function()
	{
		for (var i = 0; i < this.TabContainerElement.childNodes.length; i++)
		{
			if (System.ClassList.Contains(this.TabContainerElement.childNodes[i], "Selected"))
			{
				return i;
			}
		}
		return -1;
	};
	this.SetSelectedPageIndex = function(index)
	{
		for (var i = 0; i < this.TabContainerElement.childNodes.length; i++)
		{
			if (i == index)
			{
				System.ClassList.Add(this.TabContainerElement.childNodes[i], "Selected");
			}
			else
			{
				System.ClassList.Remove(this.TabContainerElement.childNodes[i], "Selected");
			}
			
			if (i < index)
			{
				System.ClassList.Add(this.TabContainerElement.childNodes[i], "BeforeSelected");
				System.ClassList.Remove(this.TabContainerElement.childNodes[i], "AfterSelected");
			}
			else if (i > index)
			{
				System.ClassList.Add(this.TabContainerElement.childNodes[i], "AfterSelected");
				System.ClassList.Remove(this.TabContainerElement.childNodes[i], "BeforeSelected");
			}
		}
		for (var i = 0; i < this.TabPageContainerElement.childNodes.length; i++)
		{
			if (i == index)
			{
				System.ClassList.Add(this.TabPageContainerElement.childNodes[i], "Selected");
			}
			else
			{
				System.ClassList.Remove(this.TabPageContainerElement.childNodes[i], "Selected");
			}
		}
	};
}

System.AddEventListener(window, "load", function(e)
{
	var items = document.getElementsByClassName("Wizard");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Wizard(items[i]);
	}
});