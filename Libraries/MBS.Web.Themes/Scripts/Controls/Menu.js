function Menu(parentElement)
{
	this.ParentElement = parentElement;
	this.set_Expanded = function(value)
	{
		switch (value)
		{
			case true:
			{
				System.ClassList.Add(this.ParentElement.parentNode, "uwt-opened");
				break;
			}
			case false:
			{
				System.ClassList.Remove(this.ParentElement.parentNode, "uwt-opened");
				break;
			}
		}
	};
	/*
	for (var i = 0; i < this.ParentElement.childNodes.length; i++)
	{
		this.ParentElement.childNodes[i].childNodes[0].addEventListener("click", function(e)
		{
			if (this.parentNode.childNodes.length > 1)
			{
				System.ClassList.Toggle(this.parentNode, "uwt-opened");
			}
			
			this.blur();
			
			if (this.href == "" || this.href == window.location.href + "#")
			{
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		});
	}
	*/
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("uwt-menu");
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].NativeObject) continue;
		items[i].NativeObject = new Menu(items[i]);
	}
	var items = document.getElementsByClassName("uwt-contextmenu");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new ContextMenu(items[i]);
	}
});

function ContextMenu(parentElement)
{
	this.Items = [];
	this.ParentElement = parentElement;
	this.Show = function(x, y, parent)
	{
		ContextMenu.HideAll();
		if (this.ParentElement == null)
		{
			var elemPopup = document.createElement("div");
			elemPopup.className = "uwt-popup";
			parent.appendChild(elemPopup);
			
			this.ParentElement = elemPopup;
		}
		
		while (this.ParentElement.children.length > 0)
		{
			this.ParentElement.children[0].remove();
		}
		
		var elem = document.createElement("ul");
		elem.className = "uwt-menu";
		elem.addEventListener("contextmenu", function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		
		for (var i = 0; i < this.Items.length; i++)
		{
			var li = document.createElement("li");
			// System.ClassList.Add(li, "uwt-menuitem");
			if (this.Items[i].Visible)
			{
				System.ClassList.Add(li, "uwt-visible");
			}
			
			if (this.Items[i].ClassName == "MenuItemCommand")
			{
				var elem1 = document.createElement("a");
				elem1.setAttribute("href", "#");
				elem1.addEventListener("click", function(e)
				{
					this.NativeObject.Hide();
					this.MenuItem.Execute(this, e);
					
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
				elem1.innerHTML = this.Items[i].Title;
				elem1.NativeObject = this;
				elem1.MenuItem = this.Items[i];
				li.appendChild(elem1);
				
				// System.ClassList.Add(li, "uwt-command");
			}
			else if (this.Items[i].ClassName == "MenuItemSeparator")
			{
				System.ClassList.Add(li, "uwt-separator");
			}
			else if (this.Items[i].ClassName == "MenuItemHeader")
			{
				System.ClassList.Add(li, "uwt-section");
				li.innerHTML = this.Items[i].Title;
			}
			elem.appendChild(li);
		}
		
		elemPopup.style.left = x + "px";
		elemPopup.style.top = y + "px";
		
		if (parent == null) parent = document.body;
		
		this.ParentElement.appendChild(elem);
		
		this.ParentElement.className = "uwt-popup uwt-contextmenu uwt-visible";
	};
	this.Hide = function()
	{
		if (this.ParentElement == null) return;
		this.ParentElement.className = "uwt-popup uwt-contextmenu";
	};
}

ContextMenu.HideAll = function()
{
	var items = document.getElementsByClassName("uwt-contextmenu");
	for (var i = 0; i < items.length; i++)
	{
		if (!System.ClassList.Contains(items[i], "uwt-visible-always"))
		{
			System.ClassList.Remove(items[i], "uwt-visible");
		}
	}
};

function MenuItemHeader(id, title)
{
	this.ClassName = "MenuItemHeader";
	this.ID = id;
	this.Title = title;
	this.Visible = true;
}
function MenuItemSeparator(id)
{
	this.ClassName = "MenuItemSeparator";
	this.ID = id;
	this.Visible = true;
}
function MenuItemCommand(id, title, onclick)
{
	this.ClassName = "MenuItemCommand";
	this.ID = id;
	this.Title = title;
	this.OnClientClick = onclick;
	this.Visible = true;
	
	this.Execute = function(sender, e)
	{
		if (this.OnClientClick != null) this.OnClientClick(sender, e);
	};
}

window.addEventListener("contextmenu", function(e)
{
	ContextMenu.HideAll();
	
	e.preventDefault();
});