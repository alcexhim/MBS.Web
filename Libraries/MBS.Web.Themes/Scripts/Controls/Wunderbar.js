function WunderbarSelectionChangedEventArgs(index)
{
	this.Index = index;
}
function Wunderbar(parentElement)
{
	this.ParentElement = parentElement;
	
	this.ContentsElement = this.ParentElement.children[0];
	this.ButtonsElement = this.ParentElement.children[1];
	
	this.ButtonsGripper = this.ButtonsElement.children[0];
	this.ButtonsList = this.ButtonsElement.children[1];
	
	this.SelectionChanged = new System.EventHandler();
	
	for (var i = 0; i < this.ButtonsList.children.length; i++)
	{
		this.ButtonsList.children[i].children[0].NativeObject = this;
		this.ButtonsList.children[i].children[0].addEventListener("click", function(e)
		{
			var index = -1;
			var ul = this.parentElement.parentElement;
			for (var j = 0; j < ul.children.length; j++)
			{
				if (ul.children[j] == this.parentElement)
				{
					index = j;
					System.ClassList.Add(ul.children[j], "uwt-selected");
					System.ClassList.Add(this.NativeObject.ContentsElement.children[j], "uwt-visible");
				}
				else
				{
					System.ClassList.Remove(ul.children[j], "uwt-selected");
					System.ClassList.Remove(this.NativeObject.ContentsElement.children[j], "uwt-visible");
				}
			}
			
			this.NativeObject.SelectionChanged.Execute(this, new WunderbarSelectionChangedEventArgs(index));
		
			e.preventDefault();
			e.stopPropagation();
		});
	}
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("uwt-wunderbar");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Wunderbar(items[i]);
	}
});