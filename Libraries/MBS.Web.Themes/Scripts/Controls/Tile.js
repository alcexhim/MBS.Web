function Tile(parentElement)
{
	this.ParentElement = parentElement;
	this.ContentElement = this.ParentElement.children[1];
	
	this.SetColor = function(color)
	{
		this.ParentElement.style.backgroundColor = color;
	};
	this.SetContent = function(html)
	{
		this.ContentElement.innerHTML = html;
	};
}

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-tile");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Tile(items[i]);
	}
});