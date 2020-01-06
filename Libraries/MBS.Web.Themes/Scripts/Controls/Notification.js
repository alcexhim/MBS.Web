function Notification(parentElement)
{
	this.mvarTitle = "";
	this.SetTitle = function(value)
	{
		this.mvarTitle = value;
	};
	this.GetTitle = function()
	{
		return this.mvarTitle;
	}
	
	this.mvarContent = "";
	this.SetContent = function(value)
	{
		this.mvarContent = value;
	};
	this.GetContent = function()
	{
		return this.mvarContent;
	};
	
	this.mvarCssClass = "";
	this.SetCssClass = function(value)
	{
		this.mvarCssClass = value;
	};
	this.GetCssClass = function()
	{
		return this.mvarCssClass;
	};
	
	this.mvarTimeout = -1;
	this.SetTimeout = function(value)
	{
		this.mvarTimeout = value;
	}
	this.GetTimeout = function()
	{
		return this.mvarTimeout;
	};
	
	this.mvarParentElement = null;
	this.Show = function(timeoutInMilliseconds)
	{
		var element = document.createElement("DIV");
		var cssClass = "Notification";
		if (this.GetCssClass() != "") cssClass += " " + this.GetCssClass();
		element.className = cssClass;
		element.ObjectReference = this;
		
		element.addEventListener("click", function(e)
		{
			this.ObjectReference.Hide();
		});
		
		this.mvarParentElement = element;
		
		var elemTitle = document.createElement("DIV");
		elemTitle.className = "Title";
		elemTitle.innerHTML = this.GetTitle();
		element.appendChild(elemTitle);
		
		var elemContent = document.createElement("DIV");
		elemContent.className = "Content";
		elemContent.innerHTML = this.GetContent();
		element.appendChild(elemContent);
		
		document.body.appendChild(element);
		cssClass += " Visible";
		
		// timeout required to see the transition when first adding the element to the page
		window.setTimeout(function()
		{
			element.className = cssClass;
		}, 50);
		
		if (typeof(timeoutInMilliseconds) != "undefined")
		{
			window.setTimeout(function(sender)
			{
				sender.Hide();
			}, timeoutInMilliseconds, this);
		}
	};
	this.Hide = function()
	{
		var cssClass = "Notification";
		if (this.GetCssClass() != "") cssClass += " " + this.GetCssClass();
		this.mvarParentElement.className = cssClass;
	};
}

Notification.Show = function(content, title, cssClass, timeoutInMilliseconds)
{
	var n = new Notification();
	
	if (typeof(content) === "undefined")
	{
		console.warn("showing notification with empty content");
		content = "";
	}
	n.SetContent(content);
	
	if (typeof(title) === "undefined")
	{
		console.warn("showing notification with empty title");
		title = "";
	}
	n.SetTitle(title);
	
	if (typeof(cssClass) === "undefined") cssClass = "";
	n.SetCssClass(cssClass);
	
	if (typeof(timeoutInMilliseconds) !== "undefined")
	{
		n.SetTimeout(timeoutInMilliseconds);
	}
	
	n.Show();
};
