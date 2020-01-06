function CheckBox(parentElement)
{
	this.ParentElement = parentElement;
	
	this.mvarChecked = parentElement.hasAttribute("checked");
	this.SetChecked = function(value)
	{
		var changed = (this.GetChecked() != value);
		
		this.mvarChecked = value;
		this.ParentElement.checked = this.mvarChecked;
		if (this.mvarChecked)
		{
			this.NewParentElement.className = "CheckBox Checked";
		}
		else
		{
			this.NewParentElement.className = "CheckBox";
		}
		
		if (!changed) return;
		System.RaiseEvent(this.ParentElement, "change", null);
	}
	this.GetChecked = function()
	{
		return this.mvarChecked;
	}
	this.ToggleChecked = function()
	{
		this.SetChecked(!this.GetChecked());
	}
	
	var child = document.createElement("div");
	child.className = "CheckBox";
	child.NativeObject = this;
	child.addEventListener("click", function(e)
	{
		child.NativeObject.ToggleChecked();
	});
	
	var fa = document.createElement("i");
	fa.className = "fa fa-check";
	child.appendChild(fa);
	
	parentElement.style.display = "none";
	parentElement.parentNode.insertBefore(child, parentElement);
	
	this.NewParentElement = child;
	
	parentElement.addEventListener("change", function(e)
	{
		parentElement.NativeObject.SetChecked(parentElement.checked);
	});
	this.SetChecked(parentElement.checked);
}
function RadioButton(parentElement)
{
	this.ParentElement = parentElement;
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByTagName("input");
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].attributes["type"] != null)
		{
			switch (items[i].attributes["type"].value)
			{
				case "checkbox":
				{
					items[i].NativeObject = new CheckBox(items[i]);
					break;
				}
				case "radio":
				{
					items[i].NativeObject = new RadioButton(items[i]);
					break;
				}
			}
		}
	}
});