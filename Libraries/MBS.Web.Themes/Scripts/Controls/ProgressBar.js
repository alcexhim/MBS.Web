function ProgressBar(parentElement)
{
	this.ParentElement = parentElement;
	this.MinimumValue = 0;
	this.MaximumValue = 100;
	this.CurrentValue = 0;
	this.SetCurrentValue = function(value)
	{
		this.CurrentValue = value;
		this.Update();
	};
	this.Update = function()
	{
		var pb_fill = document.getElementById("ProgressBar_" + this.ID + "_ValueFill");
		var pb_label = document.getElementById("ProgressBar_" + this.ID + "_ValueLabel");
		pb_fill.style.width = ((this.CurrentValue / (this.MaximumValue - this.MinimumValue)) * 100).toFixed(0).toString() + "%";
		pb_label.innerHTML = ((this.CurrentValue / (this.MaximumValue - this.MinimumValue)) * 100).toFixed(0).toString() + "%";
	};
}

window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("ProgressBar");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new ProgressBar(items[i]);
	}
});