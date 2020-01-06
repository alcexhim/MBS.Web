/**
 * Creates a Window.
 * @param parentElement Element The parent element with which to associate the Window.
 */
function Window(parentElement)
{
	if (!parentElement)
	{
		parentElement = document.createElement("div");
		parentElement.className = "Window";
		
		var titleBar = document.createElement("div");
		titleBar.className = "Header";
		
		var title = document.createElement("span");
		title.className = "Title";
		titleBar.appendChild(title);
		
		parentElement.appendChild(titleBar);
		
		var content = document.createElement("div");
		content.className = "Content";
		parentElement.appendChild(content);
		
		var footer = document.createElement("div");
		footer.className = "Buttons";
		footer.NativeObject = this;
		footer.style.display = "none";
		parentElement.appendChild(footer);
		
		document.body.appendChild(parentElement);
	}
	this.ParentElement = parentElement;
	
	this.mvarContentURL = null;
	/**
	 * Gets the content URL used for dynamically-loading content via AJAX.
	 */
	this.GetContentURL = function()
	{
		return this.mvarContentURL;
	};
	/**
	 * Sets the content URL used for dynamically-loading content via AJAX.
	 * @param value string The URL from which to load content when the Window is opened.
	 */
	this.SetContentURL = function(value)
	{
		this.mvarContentURL = value;
	};
	
	// Set the content URL automatically if we specify it in the attribute
	if (parentElement.hasAttribute("data-content-url"))
	{
		this.SetContentURL(parentElement.getAttribute("data-content-url"));
	}

	this.GetLoading = function()
	{
		return System.ClassList.Contains(this.ParentElement, "Loading");
	};
	this.SetLoading = function(value)
	{
		if (value)
		{
			return System.ClassList.Add(this.ParentElement, "Loading");
		}
		else
		{
			return System.ClassList.Remove(this.ParentElement, "Loading");
		}
	};
	
	this.GetLoadingText = function()
	{
		return this.ParentElement.childNodes[1].childNodes[1].childNodes[0].childNodes[1].innerHTML;
	};
	this.SetLoadingText = function(value)
	{
		this.ParentElement.childNodes[1].childNodes[1].childNodes[0].childNodes[1].innerHTML = value;
	};
	
	this.Opened = new Callback(this);
	this.Closed = new Callback(this);
	
	this.DefaultHorizontalAlignment = HorizontalAlignment.Center;
	this.DefaultVerticalAlignment = VerticalAlignment.Middle;
	
	var TitleBar = parentElement.childNodes[0];
	TitleBar.Parent = this;
	TitleBar.addEventListener("mousedown", function(e)
	{
		Window.BeginDrag(this.Parent, e);
		e.preventDefault();
		return false;
	});
	TitleBar.addEventListener("contextmenu", function(e)
	{
		var menu = new ContextMenu();
		menu.Items =
		[
		 	new MenuItemCommand("mnuWindowClose", "Close", function(e1)
			{
		 		TitleBar.Parent.Hide();
			})
		];
		menu.Show(e.clientX, e.clientY);
		
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	this.GetContentElement = function()
	{
		return this.ParentElement.childNodes[1];
	};
	/**
	 * Gets the content of this Window
	 */
	this.GetContent = function()
	{
		return this.GetContentElement().innerHTML;
	};
	/**
	 * Sets the content of this Window
	 * @param value string The content to insert into this Window
	 */
	this.SetContent = function(value)
	{
		this.GetContentElement().innerHTML = value;
	};
	this.GetFooterElement = function()
	{
		return this.ParentElement.childNodes[2];
	};
	/**
	 * Gets the footer area content (e.g. buttons, etc.) of this Window
	 */
	this.GetFooter = function()
	{
		return this.GetFooterElement().innerHTML;
	};
	/**
	 * Sets the footer area content (e.g. buttons, etc.) of this Window
	 * @param value string The footer area content (e.g. buttons, etc.) to insert into this Window
	 */
	this.SetFooter = function(value)
	{
		var footer = this.GetFooterElement();
		footer.innerHTML = value;
		if (value == null)
		{
			footer.style.display = "none";			
		}
		else
		{
			footer.style.display = "block";
		}
	};
	
	/**
	 * Gets the client width, in pixels, of this Window.
	 */
	this.GetWidth = function()
	{
		return this.ParentElement.clientWidth;
	};
	/**
	 * Gets the client height, in pixels, of this Window.
	 */
	this.GetHeight = function()
	{
		return this.ParentElement.clientHeight;
	};

	/**
	 * Gets the title of this Window.
	 */
	this.GetTitle = function()
	{
		return this.ParentElement.childNodes[0].childNodes[0].innerHTML;
	};
	/**
	 * Sets the title of this Window.
	 * @param title string The title to set
	 */
	this.SetTitle = function(title)
	{
		this.ParentElement.childNodes[0].childNodes[0].innerHTML = title;
	};

	/**
	 * Sets the horizontal alignment (left, center, right) of this Window.
	 * @param alignment HorizontalAlignment One of these: HorizontalAlignment.Left, HorizontalAlignment.Center, or HorizontalAlignment.Right.
	 */
	this.SetHorizontalAlignment = function(alignment)
	{
		var Window = this.ParentElement;
		switch(alignment)
		{
			case HorizontalAlignment.Left:
			{
				Window.style.left = "16px";
				break;
			}
			case HorizontalAlignment.Center:
			{
				Window.style.left = ((parseInt(window.GetWidth()) - parseInt(this.GetWidth())) / 2) + "px";
				break;
			}
			case HorizontalAlignment.Right:
			{
				Window.style.left = (parseInt(window.GetWidth()) - parseInt(this.GetWidth()) - 16) + "px";
				break;
			}
		}
	};
	this.SetVerticalAlignment = function(alignment)
	{
		var Window = this.ParentElement;
		switch(alignment)
		{
			case VerticalAlignment.Top:
			{
				Window.style.top = "16px";
				break;
			}
			case VerticalAlignment.Middle:
			{
				Window.style.top = ((parseInt(window.GetHeight()) - parseInt(this.GetHeight())) / 2) + "px";
				break;
			}
			case VerticalAlignment.Bottom:
			{
				Window.style.top = (parseInt(window.GetHeight() - parseInt(this.GetHeight())) - 16) + "px";
				break;
			}
		}
	};
	
	this.SetTop = function(y)
	{
		var Window = this.ParentElement;
		Window.style.top = y + "px";
	};
	
	/**
	 * Presents this Window to the user.
	 * @param parent Element The Element to assign as the owner of this Window, or null to keep current owner 
	 */
	this.Show = function(parent)
	{
		if (parent)
		{
			this.ParentElement.parentNode.removeChild(this.ParentElement);
			parent.appendChild(this.ParentElement);
			
			// NOTE: parent must have its style not set to the default for this to work
			if (!(parent.style.position == "relative" || parent.style.position == "absolute"))
			{
				parent.style.position = "relative";			
			}
			this.ParentElement.style.position = "absolute";
		}
		else
		{
			this.ParentElement.parentNode.removeChild(this.ParentElement);
			document.body.appendChild(this.ParentElement);
			this.ParentElement.style.position = "fixed";
		}
		
		var Window = this.ParentElement;
		Window.className = "Window Visible";
		
		if (this.mvarContentURL != null)
		{
			this.SetContent("<div class=\"Throbber\">&nbsp;</div>");
			
			// TODO: execute AJAX request to load content
			var xhr = new XMLHttpRequest();
			xhr.ParentWindow = this;
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						this.ParentWindow.SetContent(this.responseText);
					}
					else
					{
						this.ParentWindow.SetContent("<div class=\"Alert Failure\"><div class=\"Title\">Could not load window content</div><div class=\"Content\">Check your Internet connection and try again</div></div>");
					}
				}
			};
			xhr.open("GET", System.ExpandRelativePath(this.mvarContentURL), true);
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.send(null);
		}
		
		this.Opened.Execute(CallbackArgument.Empty);
	};
	this.ShowDialog = function()
	{
		Window.DialogCount++;
		
		if (Window.ModalBackgroundElement == null)
		{
			Window.ModalBackgroundElement = document.createElement("div");
			Window.ModalBackgroundElement.className = "WindowModalBackground";
			document.body.appendChild(Window.ModalBackgroundElement);
		}
		Window.ModalBackgroundElement.style.display = "block";
		Window.ModalBackgroundElement.style.zIndex = (100 + Window.DialogCount);
		
		var WindowDOMObject = this.ParentElement;
		WindowDOMObject.className = "Window Visible";
		
		WindowDOMObject.style.zIndex = (100 + Window.DialogCount + 1);
		
		this.SetHorizontalAlignment(this.DefaultHorizontalAlignment);
		this.SetVerticalAlignment(this.DefaultVerticalAlignment);
		this.Opened.Execute(CallbackArgument.Empty);
	};
	this.Hide = function()
	{
		var WindowDOMObject = this.ParentElement;
		WindowDOMObject.className = "Window";
		this.Closed.Execute(CallbackArgument.Empty);
		
		Window.DialogCount--;
		
		if (Window.ModalBackgroundElement != null)
		{
			Window.ModalBackgroundElement.style.zIndex = (100 + Window.DialogCount);
		}
			
		if (Window.DialogCount == 0)
		{
			if (Window.ModalBackgroundElement != null)
			{
				Window.ModalBackgroundElement.parentNode.removeChild(Window.ModalBackgroundElement);
				Window.ModalBackgroundElement = null;
			}
		}
	};
	
	if (this.ParentElement.id != "") eval("window." + this.ParentElement.id + " = this;");
};
Window.ModalBackgroundElement = null;
Window.DialogCount = 0;
Window.BeginDrag = function(sender, e)
{
	Window.DragWindow = sender;
	Window.CursorOriginalX = e.clientX;
	Window.CursorOriginalY = e.clientY;
	
	var obj = Window.DragWindow.ParentElement;
	Window.DragWindowOriginalX = obj.style.left.substring(0, obj.style.left.length - 2);
	Window.DragWindowOriginalY = obj.style.top.substring(0, obj.style.top.length - 2);
};
Window.ContinueDrag = function(e)
{
	if (!Window.DragWindow) return;
	
	var obj = Window.DragWindow.ParentElement;
	
	var ix = parseInt(Window.DragWindowOriginalX), iy = parseInt(Window.DragWindowOriginalY);
	if (ix.toString() == "NaN") ix = 0;
	if (iy.toString() == "NaN") iy = 0;
	
	obj.style.left = (ix + (e.clientX - Window.CursorOriginalX)) + "px";
	obj.style.top = (iy + (e.clientY - Window.CursorOriginalY)) + "px";
};
Window.EndDrag = function()
{
	Window.DragWindow = null;
};

Window.ShowDialog = function(message, title, buttons)
{
	var wnd = new Window();
	wnd.SetTitle(title);
	wnd.SetContent(message);
	wnd.ShowDialog();
};

window.addEventListener("mousemove", function(e)
{
	if (Window.DragWindow)
	{
		Window.ContinueDrag(e);
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
});
window.addEventListener("mouseup", function(e)
{
	if (Window.DragWindow)
	{
		Window.EndDrag();
	}
});
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("Window");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Window(items[i]);
	}
});


//The awesomely cool, really slick jack-of-all-trades ShowDialog function to generate pretty
//JavaScript asynchronous dialogs =(^.^)=
/**
* Shows a JavaScript dialog with the specified parameters.
* @param content string The HTML to display in the window's content area.
* @param title string The HTML to display in the window's title bar.
* @param buttons array Array of button definitions.
* 
* The following properties are currently supported for button definitions:
* Enabled, Text, ClassName (optional), OnClientClick
*/
Window.ShowDialog = function (content, title, buttons, styles, iconName, className)
{
	if (!buttons || buttons === null) buttons =
	[
		{
			"Enabled": true,
			"Text": "OK",
			"ClassName": "Primary",
			"OnClientClick": function (sender, e)
			{
				return true;
			}
		}
	];
	if (!styles || styles === null) styles = [];

	content = content.replace(/\r\n/g, "<br />");
	content = content.replace(/\n/g, "<br />");
	content = content.replace(/\\r\\n/g, "<br />");
	content = content.replace(/\\n/g, "<br />");

	var divWindow = document.createElement("div");

	System.ClassList.Add(divWindow, "Window");
	if (className)
	{
		System.ClassList.Add(divWindow, className);
	}

	for (var i = 0; i < styles.length; i++)
	{
		divWindow.style.setProperty(styles[i].name, styles[i].value);
	}

	var divHeader = document.createElement("div");
	divHeader.className = "Header";

	var spanHeaderTitle = document.createElement("span");
	spanHeaderTitle.className = "Title";
	spanHeaderTitle.innerHTML = title;
	divHeader.appendChild(spanHeaderTitle);

	var divHeaderControlBox = document.createElement("div");
	divHeaderControlBox.className = "ControlBox";
	var aButtonClose = document.createElement("a");
	aButtonClose.className = "Close";
	aButtonClose.href = "#";
	aButtonClose.windowElement = divWindow;

	var aButtonCloseText = document.createElement("span");
	aButtonCloseText.innerHTML = "×";
	aButtonClose.appendChild(aButtonCloseText);
	divHeaderControlBox.appendChild(aButtonClose);
	divHeader.appendChild(divHeaderControlBox);

	divWindow.appendChild(divHeader);

	var divContent = document.createElement("div");
	divContent.className = "Content";

	var divContentContent = document.createElement("div");
	divContentContent.className = "Content";

	if (iconName && iconName !== null)
	{
		var divIcon = document.createElement("div");
		divIcon.className = "Icon";

		var divStockIcon = document.createElement("div");
		divStockIcon.className = "StockIcon si-Large si-" + iconName;

		divIcon.appendChild(divStockIcon);

		divContentContent.appendChild(divIcon);
	}
	
	divContentContent.innerHTML = content;

	divContent.appendChild(divContentContent);

	var divLoading = document.createElement("div");
	divLoading.className = "Loading";

	var divLoadingStatus = document.createElement("div");
	divLoadingStatus.className = "LoadingStatus";

	var divLoadingStatusThrobber = document.createElement("div");
	divLoadingStatusThrobber.className = "Throbber";
	divLoadingStatusThrobber.innerHTML = "&nbsp;";
	divLoadingStatus.appendChild(divLoadingStatusThrobber);

	var pLoadingStatusText = document.createElement("p");
	pLoadingStatusText.className = "LoadingStatusText";
	divLoadingStatus.appendChild(pLoadingStatusText);

	divLoading.appendChild(divLoadingStatus);

	divContent.appendChild(divLoading);

	divWindow.appendChild(divContent);

	var divFooter = document.createElement("div");
	divFooter.className = "Footer";
	for (var i = 0; i < buttons.length; i++)
	{
		var aButton = document.createElement("a");
		aButton.className = "pwt-Button";
		if (buttons[i].ClassName) aButton.className += " " + buttons[i].ClassName;
		if ((typeof (buttons[i].Enabled) !== 'undefined') && !buttons[i].Enabled)
		{
			aButton.setAttribute("disabled", "disabled");
		}
		aButton.innerHTML = buttons[i].Text;
		aButton.NativeObject = buttons[i];
		aButton.ParentWindowElement = divWindow;
		if (buttons[i].TargetURL)
		{
			aButton.href = System.ExpandRelativePath(buttons[i].TargetURL);
		}
		else
		{
			aButton.href = "#";
		}
		if (buttons[i].TargetFrame)
		{
			aButton.setAttribute("target", buttons[i].TargetFrame);
		}

		if (buttons[i].OnClientClick)
		{
			aButton.addEventListener("click", function (e)
			{
				if (this.NativeObject.OnClientClick(this, { "NativeObject": this.NativeObject, "ParentWindow": this.ParentWindowElement }))
				{
					// close the dialog
					this.ParentWindowElement.NativeObject.Hide();
				}
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
		divFooter.appendChild(aButton);
	}
	divWindow.appendChild(divFooter);

	// Append the newly-created element to the DOM
	document.body.appendChild(divWindow);

	divWindow.NativeObject = new Window(divWindow);
	aButtonClose.NativeObject = divWindow.NativeObject;

	window.setTimeout(function()
	{
		// Show the newly-created window AFTER we append it to the DOM, otherwise CSS transitions don't
		// happen
		divWindow.NativeObject.ShowDialog();
	}, 100);
};