function FlyoutTabContainer(id)
{
	this.ID = id;
	this.ToggleItem = function(itemID)
	{
		var tab = document.getElementById("FlyoutTabContainer_" + this.ID + "_" + itemID + "_Tab");
		var content = document.getElementById("FlyoutTabContainer_" + this.ID + "_" + itemID + "_Content");
		
		if (tab == null)
		{
			console.log("FlyoutTabContainer: nonexistent tab '" + itemID + "' on container '" + this.ID + "'");
			return;
		}
		if (content == null)
		{
			console.log("FlyoutTabContainer: nonexistent content '" + itemID + "' on container '" + this.ID + "'");
			return;
		}
		
		var parent = tab.parentNode;
		if (tab.className == "FlyoutTab Active")
		{
			tab.className = "FlyoutTab";
		}
		else
		{
			for (var i = 0; i < parent.childNodes.length; i++)
			{
				if (parent.childNodes[i].className == "FlyoutTab Active" && parent.childNodes[i] != tab);
				{
					parent.childNodes[i].className = "FlyoutTab";
				}
			}
			tab.className = "FlyoutTab Active";
		}
		
		parent = content.parentNode;
		if (content.className == "FlyoutTabContent Active")
		{
			content.className = "FlyoutTabContent";
		}
		else
		{
			for (var i = 0; i < parent.childNodes.length; i++)
			{
				if (parent.childNodes[i].className == "FlyoutTabContent Active" && parent.childNodes[i] != content);
				{
					parent.childNodes[i].className = "FlyoutTabContent";
				}
			}
			content.className = "FlyoutTabContent Active";
		}
	};
}