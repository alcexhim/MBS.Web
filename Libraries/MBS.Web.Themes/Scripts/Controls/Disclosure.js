function Disclosure(parentElement)
{
	this.ParentElement = parentElement;
	
	parentElement.childNodes[0].childNodes[0].addEventListener("click", function(e)
	{
		parentElement.NativeObject.ToggleExpanded();
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	this.mvarExpanded = (parentElement.attributes["data-expanded"] != null ? parentElement.attributes["data-expanded"].value == "true" : false);
	this.GetExpanded = function()
	{
		return this.mvarExpanded;
	};
	this.SetExpanded = function(value)
	{
		this.mvarExpanded = value;
		this.Refresh();
	};
	this.ToggleExpanded = function()
	{
		this.SetExpanded(!this.GetExpanded());
	};
	
	this.Refresh = function()
	{
		var disclosure = this.ParentElement;
		if (this.GetExpanded())
		{
			disclosure.className = "Disclosure Expanded";
			disclosure.attributes["data-expanded"].value = "true";
		}
		else
		{
			disclosure.className = "Disclosure";
			disclosure.attributes["data-expanded"].value = "false";
		}
	};
}
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("Disclosure");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Disclosure(items[i]);
	}
});