function TabContainer(parentElement)
{
	this.ParentElement = parentElement;
	
	this.mvarSelectedTabID = null;
	this.GetSelectedTabID = function()
	{
		return this.mvarSelectedTabID;
	};
	
	this.SetSelectedTab = function(tab)
	{
		var tabContainer = this.ParentElement;
		if (tabContainer == null) return;
		
		var tabs = tabContainer.children[0];
		var tabPages = tabContainer.children[1];
		var selectedIndex = -1;
		for (var i = 0; i < tabs.children.length; i++)
		{
			if (System.ClassList.Contains(tabs.children[i], "uwt-selected"))
			{
				System.ClassList.Remove(tabs.children[i], "uwt-selected");
			}
			
			if (tabs.children[i] === tab)
			{
				selectedIndex = i;
				System.ClassList.Add(tabs.children[i], "uwt-selected");
			}
		}
		for (var i = 0; i < tabPages.children.length; i++)
		{
			if (selectedIndex > -1 && selectedIndex < tabPages.children.length && i == selectedIndex)
			{
				System.ClassList.Add(tabPages.children[i], "uwt-selected");
			}
			else
			{
				System.ClassList.Remove(tabPages.children[i], "uwt-selected");
			}
		}
		
		System.SetClientProperty(this.ID, "SelectedTabIndex", selectedIndex);
		
		if (tabs.children[selectedIndex] != null && tabs.children[selectedIndex].attributes["data-id"] != null)
		{
			this.mvarSelectedTabID = tabs.children[selectedIndex].attributes["data-id"].value;
		}
		
		var attOnClientTabChanged = tabContainer.attributes["data-onclienttabchanged"];
		if (attOnClientTabChanged != null)
		{
			eval(attOnClientTabChanged.value);
		}
	};
	
	var tabContainer = this.ParentElement;
	var tabs = tabContainer.children[0];
	for (var i = 0; i < tabs.children.length; i++)
	{
		(function(i, tc)
		{
			if (!System.ClassList.Contains(tabs.children[i], "uwt-tabcontainer-controlbox"))
			{
				tabs.children[i].children[0].addEventListener("click", function(e)
				{
					tc.SetSelectedTab(tabs.children[i]);
					
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
			}
		})(i, this);
	}
	
	// eval("window." + tabContainer.attributes["id"].value + " = this;");
}
window.addEventListener("load", function(e)
{
	var tbss = document.getElementsByClassName("uwt-tabcontainer");
	for (var i = 0; i < tbss.length; i++)
	{
		tbss[i].ObjectReference = new TabContainer(tbss[i]);
	}
});