function AdditionalDetailWidget(parent)
{
	this.Parent = parent;
	this.Show = function ()
	{
		System.ClassList.Add(this.Parent, "Visible");
	};
	this.Hide = function ()
	{
		System.ClassList.Remove(this.Parent, "Visible");
	};

	this.TextLink = parent.childNodes[0];
	this.ButtonLink = parent.childNodes[1];
	
	this.ButtonLink.NativeObject = this;
	this.ButtonLink.addEventListener("click", function (e)
	{
		if (e.which == MouseButtons.Primary)
		{
			this.NativeObject.Show();
		}
	});
}
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("AdditionalDetailWidget");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new AdditionalDetailWidget(items[i]);
	}
});
window.addEventListener("mousedown", function (e)
{
	var sender = null;
	if (!e) e = window.event;
	if (e.target)
	{
		sender = e.target;
	}
	else if (e.srcElement)
	{
		sender = e.srcElement;
	}
	if (!System.TerminateIfSenderIs(sender, ["AdditionalDetailWidget"]))
	{
		var items = document.getElementsByClassName("AdditionalDetailWidget");
		for (var i = 0; i < items.length; i++)
		{
			items[i].NativeObject.Hide();
		}
	}
});