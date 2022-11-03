function RadioButton(nativeHandle)
{
	this.NativeHandle = nativeHandle;
	
	this._RadioButton = nativeHandle.children[0];
	this._Label = nativeHandle.children[1];
}

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-radiobutton");
	for (var i = 0; i < items.length; i++)
	{
		items[i].Handle = new RadioButton(items[i]);
	}
});