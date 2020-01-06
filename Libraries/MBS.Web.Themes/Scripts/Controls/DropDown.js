function DropDownWrapper(parentElement)
{
	this.ParentElement = parentElement;
	
}

function DropDown(id)
{
	this.ID = id;
	this.IsOpen = false;
	
	var Container = document.getElementById("DropDown_" + id);
	Container.Parent = this;
	if (Container.className == "DropDown SelectionRequired")
	{
		Container.onmousedown = function(e)
		{
			if (e.button == 0)
			{
				// open the dropdown
				if (this.Parent.IsOpen)
				{
					this.Parent.Close();
				}
				else
				{
					this.Parent.Open();
				}
			}
			e.preventDefault();
			e.stopPropagation();
		};
		Container.onmouseup = function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		};
		Container.oncontextmenu = function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		};
	}
	
	var Button = document.getElementById("DropDown_" + id + "_Button");
	Button.Parent = this;
	Button.onmousedown = function(e)
	{
		if (e.button == 0)
		{
			// open the dropdown
			if (this.Parent.IsOpen)
			{
				this.Parent.Close();
			}
			else
			{
				this.Parent.Open();
			}
		}	
		e.preventDefault();
		e.stopPropagation();
	};
	Button.onmouseup = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		return false;
	};
	
	var ItemList_Items = document.getElementById("DropDown_" + id + "_ItemList_Items");
	ItemList_Items.Parent = this;
	ItemList_Items.onmousedown = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
	};
	ItemList_Items.oncontextmenu = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		return false;
	};
	
	var Search = document.getElementById("DropDown_" + id + "_ItemList_Search");
	Search.onmousedown = function(e)
	{
		// e.preventDefault();
		e.stopPropagation();
	};
	
	this.Select = function(index)
	{
		// Selects the item with the specified index.
		var dd_Text = document.getElementById("DropDown_" + this.ID + "_Text");
		var dd_Input = document.getElementById("DropDown_" + this.ID + "_Input");
		
		var menuItemsContainer = document.getElementById("DropDown_" + this.ID + "_ItemList_Items");
		var menuItems = menuItemsContainer.getElementsByTagName("A");
		var menuItem = menuItems[index];
		
		if (dd_Text)
		{
			dd_Text.innerHTML = menuItem.innerHTML;
		}
		else if (dd_Input)
		{
			dd_Input.value = menuItem.innerHTML;
			dd_Input.focus();
			dd_Input.select();
		}
	};
	this.Open = function()
	{
		DropDown.CloseAll();
		
		var dd = document.getElementById("DropDown_" + this.ID);
		var dd_Button = document.getElementById("DropDown_" + this.ID + "_Button");
		var dd_DropDown = document.getElementById("DropDown_" + this.ID + "_ItemList");
		var dd_ItemList_Search = document.getElementById("DropDown_" + this.ID + "_ItemList_Search");
		var dd_Text = document.getElementById("DropDown_" + this.ID + "_Text");
		var dd_Input = document.getElementById("DropDown_" + this.ID + "_Input");
		
		if (dd.className == "DropDown SelectionRequired")
		{
			dd.className = "DropDown SelectionRequired Opened";
		}
		else if (dd.className == "DropDown")
		{
			dd.className = "DropDown Opened";
		}
		
		dd_DropDown.style.width = dd.offsetWidth + "px";
		
		dd_Button.className = "Button Pressed";
		
		dd_ItemList_Search.focus();
		dd_ItemList_Search.value = "";
		this.UpdateFilter();
		
		dd_DropDown.style.display = "block";
		
		this.IsOpen = true;
		
		if (dd_Input) dd_Input.select();
		/*
		if (dd_Input)
		{
			dd_ItemList_Search.value = dd_Input.value;
		}
		else if (dd_Text)
		{
			dd_ItemList_Search.value = dd_Text.innerHTML;
		}
		dd_ItemList_Search.select();
		*/
	};
	this.Close = function()
	{
		var dd = document.getElementById("DropDown_" + this.ID);
		var dd_Button = document.getElementById("DropDown_" + this.ID + "_Button");
		var dd_DropDown = document.getElementById("DropDown_" + this.ID + "_ItemList");
		
		if (dd.className == "DropDown SelectionRequired Opened")
		{
			dd.className = "DropDown SelectionRequired";
		}
		else if (dd.className == "DropDown Opened")
		{
			dd.className = "DropDown";
		}
		
		dd_DropDown.style.width = dd.offsetWidth;
		
		dd_Button.className = "Button";
		
		dd_DropDown.style.display = "none";
		
		this.IsOpen = false;
	};
	
	// go through and initialize all of the links in the menu items, for menu items that are already created
	var menuItemsContainer = document.getElementById("DropDown_" + this.ID + "_ItemList_Items");
	var menuItems = menuItemsContainer.getElementsByTagName("A");
	for (var i = 0; i < menuItems.length; i++)
	{
		menuItems[i].Index = i;
		menuItems[i].Parent = this;
		menuItems[i].onmousedown = function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		};
		menuItems[i].onmouseup = function(e)
		{
			if (e.button == 0)
			{
				this.Parent.Select(this.Index);
				this.Parent.Close();
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		};
		menuItems[i].oncontextmenu = function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		};
	}
	
	this.UpdateFilter = function()
	{
		var dd_Search = document.getElementById("DropDown_" + this.ID + "_ItemList_Search");
		// filter the text in the text box
		var menuItemsContainer = document.getElementById("DropDown_" + this.ID + "_ItemList_Items");
		var menuItems = menuItemsContainer.getElementsByTagName("A");
		for (var i = 0; i < menuItems.length; i++)
		{
			if (dd_Search.value == "" || menuItems[i].innerHTML.toLowerCase().indexOf(dd_Search.value.toLowerCase()) != -1)
			{
				menuItems[i].style.display = "block";
			}
			else
			{
				menuItems[i].style.display = "none";
			}
		}
	};
	
	// set up the search text box
	var dd_Search = document.getElementById("DropDown_" + this.ID + "_ItemList_Search");
	dd_Search.Parent = this;
	dd_Search.onkeyup = function()
	{
		this.Parent.UpdateFilter();
	};
}
DropDown.CloseAll = function()
{
	var dropdowns = document.getElementsByClassName("DropDown");
	for (var i = 0; i < dropdowns.length; i++)
	{
		dropdowns[i].Parent.Close();
	}
};

// add a global hook to close all the dropdown lists when the mouse button is pressed
document.addEventListener("mousedown", function(e)
{
	DropDown.CloseAll();
});

window.addEventListener("load", function(e)
{
	// find DropDownButtons to trigger
	var dropdowns = document.getElementsByClassName("DropDownButton");
	for (var i = 0; i < dropdowns.length; i++)
	{
		(function(index)
		{
			dropdowns[index].addEventListener("mousedown", function(ee)
			{
				if (dropdowns[index].className == "DropDownButton")
				{
					dropdowns[index].className = "DropDownButton Opened";
				}
				else if (dropdowns[index].className == "DropDownButton Opened")
				{
					dropdowns[index].className = "DropDownButton";
				}
			});
		})(i);
	}
	
	// retrofit SELECT elements
	var selects = document.getElementsByTagName("SELECT");
	for (var i = 0; i < selects.length; i++)
	{
		selects[i].NativeObject = new DropDownWrapper(selects[i]);
	}
});