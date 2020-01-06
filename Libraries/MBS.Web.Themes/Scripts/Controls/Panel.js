function Panel(id)
{
	this._iframe = document.getElementById("Panel_" + id + "_IFrame");
	this._iframe.onload = function(sender)
	{
		sender._throbber.style.display = "none";
		sender._content.style.display = "block";
	}.PrependArgument(this);
	
	this._content = document.getElementById("Panel_" + id + "_Content");
	
	this._throbber = document.getElementById("Panel_" + id + "_Throbber");
	
	this.ID = id;
	this.NavigateTo = function(url)
	{
		this._throbber.style.display = "block";
		// this._content.style.display = "none";
		this._iframe.src = url;
	};
}
