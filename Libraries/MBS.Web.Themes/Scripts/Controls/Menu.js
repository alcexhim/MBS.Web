function Menu(parentElement)
{
	this.ParentElement = parentElement;
	this.set_Expanded = function(value)
	{
		switch (value)
		{
			case true:
			{
				System.ClassList.Add(this.ParentElement.parentNode, "Opened");
				break;
			}
			case false:
			{
				System.ClassList.Remove(this.ParentElement.parentNode, "Opened");
				break;
			}
		}
	};
	
	for (var i = 0; i < this.ParentElement.childNodes.length; i++)
	{
		this.ParentElement.childNodes[i].childNodes[0].addEventListener("click", function(e)
		{
			if (this.parentNode.childNodes.length > 1)
			{
				System.ClassList.Toggle(this.parentNode, "Opened");
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
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("Menu");
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].NativeObject) continue;
		items[i].NativeObject = new Menu(items[i]);
	}
});

function ContextMenu()
{
	this.Items = [];
	this.ParentElement = null;
	this.Show = function(x, y, parent)
	{
		ContextMenu.HideAll();
		if (this.ParentElement == null)
		{
			var elem = document.createElement("ul");
			elem.className = "Menu Popup";
			elem.addEventListener("contextmenu", function(e)
			{
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			
			for (var i = 0; i < this.Items.length; i++)
			{
				var li = document.createElement("li");
				System.ClassList.Add(li, "MenuItem");
				if (this.Items[i].Visible)
				{
					System.ClassList.Add(li, "Visible");
				}
				
				if (this.Items[i].ClassName == "MenuItemCommand")
				{
					var elem1 = document.createElement("a");
					elem1.setAttribute("href", "#");
					elem1.addEventListener("click", function(e)
					{
						this.NativeObject.Hide();
						this.MenuItem.Execute();
						
						e.preventDefault();
						e.stopPropagation();
						return false;
					});
					elem1.innerHTML = this.Items[i].Title;
					elem1.NativeObject = this;
					elem1.MenuItem = this.Items[i];
					li.appendChild(elem1);
					
					System.ClassList.Add(li, "Command");
				}
				else if (this.Items[i].ClassName == "MenuItemSeparator")
				{
					System.ClassList.Add(li, "Separator");
				}
				else if (this.Items[i].ClassName == "MenuItemHeader")
				{
					System.ClassList.Add(li, "Header");
					li.innerHTML = this.Items[i].Title;
				}
				elem.appendChild(li);
			}
			
			elem.style.left = x + "px";
			elem.style.top = y + "px";
			
			if (parent == null) parent = document.body;
			
			parent.appendChild(elem);
			this.ParentElement = elem;
		}
		this.ParentElement.className = "Menu Popup Visible";
	};
	this.Hide = function()
	{
		if (this.ParentElement == null) return;
		this.ParentElement.className = "Menu Popup";
	};
}

ContextMenu.HideAll = function()
{
	var items = document.getElementsByClassName("Menu");
	for (var i = 0; i < items.length; i++)
	{
		if (System.ClassList.Contains(items[i], "Popup"))
		{
			if (!System.ClassList.Contains(items[i], "Visible-Always"))
			{
				System.ClassList.Remove(items[i], "Visible");
			}
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
	
	this.Execute = function()
	{
		if (this.OnClientClick != null) this.OnClientClick();
	};
}

window.addEventListener("contextmenu", function()
{
	ContextMenu.HideAll();
});