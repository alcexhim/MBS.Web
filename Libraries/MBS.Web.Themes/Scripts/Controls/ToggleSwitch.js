function ToggleSwitch(parentElement)
{
	this.ParentElement = parentElement;
	parentElement.addEventListener("click", function(e)
	{
		if (e.which == 1)
		{
			if (!this.hasAttribute("disabled"))
			{
				var changed = System.ClassList.Toggle(this, "Checked");
				if (changed) this.NativeObject.on_Changed();
			}
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	parentElement.addEventListener("contextmenu", function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	this.get_Enabled = function()
	{
		return !(this.ParentElement.hasAttribute("disabled"));
	};
	this.set_Enabled = function(value)
	{
		if (value)
		{
			this.ParentElement.removeAttribute("disabled");
		}
		else
		{
			this.ParentElement.setAttribute("disabled", "disabled");
		}
	};
	
	this.EventHandlers =
	{
		"Changed": new System.EventHandler()
	};

	this.on_Changed = function()
	{
		this.EventHandlers.Changed.Execute(this, null);
	};

	this.set_Checked = function(value)
	{
		if (this.get_Checked() == value) return false;

		if (value)
		{
			System.ClassList.Add(this.ParentElement, "Checked");
		}
		else
		{
			System.ClassList.Remove(this.ParentElement, "Checked");
		}
		this.on_Changed();
		return true;
	};
	this.get_Checked = function()
	{
		return System.ClassList.Contains(this.ParentElement, "Checked");
	};
}

window.addEventListener("load", function ()
{
	var items = document.getElementsByClassName("ToggleSwitch");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new ToggleSwitch(items[i]);
	}
});