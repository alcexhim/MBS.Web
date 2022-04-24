function AdditionalDetailWidget(parent)
{
	this.Parent = parent;
	this.Show = function ()
	{
		console.log("showing adw");
		System.ClassList.Add(this.Parent, "uwt-visible");
	};
	this.Hide = function ()
	{
		console.log("hiding adw");
		System.ClassList.Remove(this.Parent, "uwt-visible");
	};

	this.TextLink = parent.children[0];
	this.ButtonLink = parent.children[1];
	
	this.ButtonLink.NativeObject = this;
	this.ButtonLink.addEventListener("click", function (e)
	{
		if (e.which == MouseButtons.Primary)
		{
			this.NativeObject.Show();
		}
		e.preventDefault();
		e.stopPropagation();
	});
}
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("uwt-actionpreviewbutton");
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
	if (!System.TerminateIfSenderIs(sender, ["uwt-actionpreviewbutton"]))
	{
		var items = document.getElementsByClassName("uwt-actionpreviewbutton");
		for (var i = 0; i < items.length; i++)
		{
			items[i].NativeObject.Hide();
		}
	}
});