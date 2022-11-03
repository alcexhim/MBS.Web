function Popup(nativeHandle)
{
	this.NativeHandle = nativeHandle;
	this.Show = function(x, y)
	{
		Popup.HideAll();
		
		System.ClassList.Add(this.NativeHandle, "uwt-visible");
		
		if (x !== undefined && y !== undefined)
		{
			this.NativeHandle.style.left = x.toString() + "px";
			this.NativeHandle.style.top = y.toString() + "px";
		}
	};
	this.Hide = function()
	{
		System.ClassList.Remove(this.NativeHandle, "uwt-visible");
	};
}
Popup.CssClass = "uwt-popup";

Popup.HideAll = function()
{
	var elems = document.getElementsByClassName(Popup.CssClass);
	for (var i = 0; i < elems.length; i++)
	{
		if (!System.ClassList.Contains(elems[i], Popup.IgnoredClasses))
		{
			System.ClassList.Remove(elems[i], "uwt-visible");
		}
	}
};

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-popup");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Popup(items[i]);
	}

	if (Popup.IgnoredClasses)
	{
		Popup.IgnoredClasses.push("uwt-always-visible");
	}
	else
	{
		Popup.IgnoredClasses = [ "uwt-always-visible" ];
	}
});

window.addEventListener("mousedown", function(e)
{
	var sender;
	if (!e)
	{
		e = window.event;
	}
	if (e.target)
	{
		sender = e.target;
	}
	else if (e.srcElement)
	{
		sender = e.srcElement;
	}
	
	while (sender != null)
	{
		if (System.ClassList.Contains(sender, Popup.CssClass))
		{
			// do not close the popup when we click inside itself
			// FIXME: need to hide all popups opened after this one though
			return;
		}
		sender = sender.parentNode;
		if (sender == null) break;
	}
	Popup.HideAll();
});