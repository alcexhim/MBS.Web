function Alert(parentElement)
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
		var cssClass = "uwt-alert";
		if (this.GetCssClass() != "") cssClass += " " + this.GetCssClass();
		element.className = cssClass;
		element.ObjectReference = this;
		
		element.addEventListener("click", function(e)
		{
			this.ObjectReference.Hide();
		});
		
		this.mvarParentElement = element;
		
		var elemTitle = document.createElement("DIV");
		elemTitle.className = "uwt-title";
		elemTitle.innerHTML = this.GetTitle();
		element.appendChild(elemTitle);
		
		var elemContent = document.createElement("DIV");
		elemContent.className = "uwt-content";
		elemContent.innerHTML = this.GetContent();
		element.appendChild(elemContent);
		
		if (typeof(Alert.ContainerElement) === 'undefined')
		{
			Alert.ContainerElement = document.createElement("div");
			System.ClassList.Add(Alert.ContainerElement, "uwt-alert-container");
			document.body.appendChild(Alert.ContainerElement);
		}
		
		Alert.ContainerElement.appendChild(element);
		cssClass += " uwt-visible";
		
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
		var cssClass = "uwt-alert";
		if (this.GetCssClass() != "") cssClass += " " + this.GetCssClass();
		this.mvarParentElement.className = cssClass;
	};
}

Alert.Show = function(content, title, cssClass, timeoutInMilliseconds)
{
	var n = new Alert();
	
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