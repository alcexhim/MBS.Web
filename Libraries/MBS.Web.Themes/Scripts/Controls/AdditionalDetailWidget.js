function AdditionalDetailWidget(parent)
{
	this.Parent = parent;
	this.Show = function ()
	{
		System.ClassList.Add(this.Parent, "uwt-visible");
	};
	this.Hide = function ()
	{
		System.ClassList.Remove(this.Parent, "uwt-visible");
	};
	
	this.PreviewElement = this.Parent.children[2];

	this.TextLink = parent.children[0];

	this.TextLinkText = this.TextLink.children[1];
	
	this.ButtonLink = parent.children[1];
	this.Gripper = this.PreviewElement.children[3];
	this.Gripper.NativeObject = this;
	this.CloseButton = this.PreviewElement.children[4];
	this.CloseButton.addEventListener("click", function(e)
	{
		this.parentElement.parentElement.removeChild(this.parentElement);
	});
	
	this.SetIconUrl = function(url)
	{
		this.TextLinkIcon.backgroundImage = 'url("' + url + ");";
	};
	this.SetTitle = function(title)
	{
		this.TextLinkText.innerText = title;
	};
	
	this.ReparentPreview = function()
	{
		var previewElement = document.createElement("div");
		System.ClassList.Add(previewElement, "apb-preview");
		System.ClassList.Add(previewElement, "uwt-popup");
		
		var spinner = document.createElement("div");
		System.ClassList.Add(spinner, "uwt-spinner");
		previewElement.appendChild(spinner);
		
		var actions = document.createElement("div");
		System.ClassList.Add(actions, "apb-actions");
		
		var h2Actions = document.createElement("h2");
		h2Actions.innerText = "Actions";
		actions.appendChild(h2Actions);
		var ulActions  = document.createElement("ul");
		System.ClassList.Add(ulActions, "uwt-menu");
		actions.appendChild(ulActions);
		previewElement.appendChild(actions);
		
		var content = document.createElement("div");
		System.ClassList.Add(content, "uwt-content");
		previewElement.appendChild(content);
		
		var gripper = document.createElement("div");
		System.ClassList.Add(gripper, "uwt-gripper");
		gripper.NativeObject = this;
		previewElement.appendChild(gripper);
		
		var aClose = document.createElement("a");
		System.ClassList.Add(aClose, "uwt-button");
		System.ClassList.Add(aClose, "uwt-button-close");
		aClose.addEventListener("click", function(e)
		{
			this.parentElement.parentElement.removeChild(this.parentElement);
		});
		previewElement.appendChild(aClose);
		
		this.PreviewElement = previewElement;
		this.Parent.appendChild(this.PreviewElement);
		
		previewElement.NativeObject = this;
		
		this.InitializeGripper(gripper);
	};
	
	this.InitializeGripper = function(gripper)
	{
		gripper.addEventListener("dblclick", function(e)
		{
			var previewElement = this.parentElement;
			System.ClassList.Toggle(previewElement, "uwt-collapsed");
		});
		gripper.addEventListener("mousedown", function (e)
		{
			var previewElement = this.parentElement;
			var detached = System.ClassList.Contains(previewElement, "uwt-detached");
			
 			if (!detached)
			{
				System.ClassList.Add(previewElement, "uwt-detached");
			
				var oldLeft = previewElement.offsetLeft - window.scrollX;
				var oldTop = previewElement.offsetTop - window.scrollY;
				console.log("old left: " + oldLeft + ", old top: " + oldTop);
					
				previewElement.parentElement.removeChild(previewElement);
				document.body.appendChild(previewElement);
				
				previewElement.style.position = "fixed";
				previewElement.style.left = oldLeft + "px";
				previewElement.style.top = oldTop + "px";
			}
			
			DragManager.BeginDrag(e, previewElement);
			
			if (!detached)
			{
				this.NativeObject.ReparentPreview();
			}
		});
	};
	
	this.InitializeGripper(this.Gripper);
	this.ButtonLink = parent.children[1];
	
	this.ButtonLink.NativeObject = this;
	this.ButtonLink.addEventListener("click", function (e)
	{
		if (e.which == MouseButtons.Primary)
		{
			this.NativeObject.Show();
		}
		e.preventDefault();
		//e.stopPropagation();
	});
	this.ClearPreviewMenuItems = function()
	{
		var previewActionsElement = this.PreviewElement.children[1].children[1];
		var childrenCount = previewActionsElement.children.length;
		for (var i = 0; i < childrenCount; i++)
		{
			previewActionsElement.removeChild(previewActionsElement.children[0]); // use of 0 here is intentional
		}
	};
	
	this.SetPreviewContentElement = function(element)
	{
		this.PreviewElement.style.position = "absolute";
		var previewContentElement = this.PreviewElement.children[2];
		
		var childCount = previewContentElement.children.length;
		for (var i = 0; i < childCount; i++)
		{
			previewContentElement.removeChild(previewContentElement.children[0]);
		}
		
		previewContentElement.appendChild(element);
		
		if (this.PreviewElement.getBoundingClientRect().right > window.innerWidth)
		{
			// FIXME: add timeout or put this in callback from ajax request so we get it accurately
			this.PreviewElement.style.right = "0px";
		}
	};
	
	this.AddPreviewMenuItem = function(title, items)
	{
		var previewActionsElement = this.PreviewElement.children[1].children[1];
		
		var li = document.createElement("li");
		li.className = "uwt-visible uwt-menu-item-popup";
		
		var a = document.createElement("a");
		a.href = "#";
		a.innerText = title;
		li.appendChild(a);
		
		var ul = document.createElement("ul");
		ul.className = "uwt-menu";
		for (var i = 0; i < items.length; i++)
		{
			var li1 = document.createElement("li");
			li1.className = "uwt-visible";
			
			var a1 = document.createElement("a");
			if (items[i].url !== undefined)
			{
				a1.href = items[i].url;
			}
			else
			{
				a1.href = "#";
			}
			if (items[i].newWindow !== undefined)
			{
				if (items[i].newWindow === true)
				{
					a1.target = "_blank";
				}
			}
			a1.innerText = items[i].title;
			li1.appendChild(a1);
			
			ul.appendChild(li1);
		}
		li.appendChild(ul);
		
		previewActionsElement.appendChild(li);
	};
	
	this.SetLoading = function(value)
	{
		console.log(this.PreviewElement);
		
		if (value)
		{
			System.ClassList.Add(this.PreviewElement, "uwt-loading");
		}
		else
		{
			System.ClassList.Remove(this.PreviewElement, "uwt-loading");
		}
	};
}

AdditionalDetailWidget.Create = function(title, url, previewUrl, attributes)
{
	var div = document.createElement("div");
	div.className = "uwt-actionpreviewbutton apb-display-text apb-display-ellipsis";
	div.setAttribute("data-preview-url", previewUrl);
	if (typeof(attributes) !== 'undefined')
	{
		for (const [key, value] of Object.entries(attributes))
		{
			div.setAttribute(key, value);
		}
	}
	
	var a = document.createElement("a");
	a.href = url;
	a.className = "apb-text";
	
	var spanIcon = document.createElement("span");
	spanIcon.className = "uwt-icon";
	a.appendChild(spanIcon);
	
	var spanText = document.createElement("span");
	spanText.className = "uwt-text";
	spanText.innerText = title;
	a.appendChild(spanText);
	
	div.appendChild(a);
	
	var aEllipsis = document.createElement("a");
	aEllipsis.href = "#";
	aEllipsis.className = "apb-button";
	div.appendChild(aEllipsis);
	
	var divPreview = document.createElement("div");
	divPreview.className = "apb-preview uwt-popup";
	divPreview.innerHTML = "<div class=\"uwt-spinner\"></div><div class=\"apb-actions\"><h2>Actions</h2><ul class=\"uwt-menu\"></ul></div><div class=\"apb-content\"></div><div class=\"uwt-gripper\"></div><a class=\"uwt-button uwt-button-close\"></a>";
	div.appendChild(divPreview);
	
	div.NativeObject = new AdditionalDetailWidget(div);
	return div;
};

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