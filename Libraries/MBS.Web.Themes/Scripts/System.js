function StringPadDirection(value)
{
	this._value = value;
}
StringPadDirection.Left = new StringPadDirection(1);
StringPadDirection.Right = new StringPadDirection(2);
StringPadDirection.Both = new StringPadDirection(3);

function StringPad(str, len, pad, dir)
{
    if (typeof(len) == "undefined") len = 0;
    if (typeof(pad) == "undefined") pad = ' ';
    if (typeof(dir) == "undefined") dir = StringPadDirection.Right;

    if (len + 1 >= str.length)
    {
        if (dir == StringPadDirection.Left)
        {
        	str = Array(len + 1 - str.length).join(pad) + str;
        }
        else if (dir == StringPadDirection.Both)
        {
	        var right = Math.ceil((padlen = len - str.length) / 2);
	        var left = padlen - right;
	        str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
        }
        else
        {
        	str = str + Array(len + 1 - str.length).join(pad);
        }
    }
    return str;
}

String.prototype.padLeft = function(length, value)
{
	return StringPad(this, length, value, StringPadDirection.Left);
}
String.prototype.padRight = function(length, value)
{
	return StringPad(this, length, value, StringPadDirection.Right);
}
String.prototype.pad = function(length, value)
{
	return StringPad(this, length, value, StringPadDirection.Both);
}

/**
 * Event arguments for an event that can be canceled.
 */
function CancelEventArgs()
{
	this.Cancel = false;
}

function EventArgs()
{
}
EventArgs.Empty = new EventArgs();

/**
 * Enumeration for mouse button values
 */
function MouseButtons()
{
}
/**
 * No mouse buttons are being pressed.
 */
MouseButtons.None = 0;
/**
 * The primary (usually left) button is being pressed.
 */
MouseButtons.Primary = 1;
/**
 * The secondary (usually right) button is being pressed.
 */
MouseButtons.Secondary = 2;
/**
 * The tertiary (usually wheel) button is being pressed.
 */
MouseButtons.Tertiary = 4;
/**
 * The additional primary button is being pressed.
 */
MouseButtons.XButton1 = 8;
/**
 * The additional secondary button is being pressed.
 */
MouseButtons.XButton2 = 16;

function MouseEventArgs(button, x, y)
{
	this.Button = button;
	this.X = x;
	this.Y = y;
	this.NativeEventArgs = null;

	this.Control = false;
	this.Alt = false;
	this.Shift = false;
}

MouseEventArgs.FromNativeEventArgs = function(e)
{
	var ee = new MouseEventArgs(0);
	ee.X = e.clientX;
	ee.Y = e.clientY;
	
	ee.Control = e.ctrlKey;
	ee.Alt = e.altKey;
	ee.Shift = e.shiftKey;
	
	ee.NativeEventArgs = e;
	
	if (e.which)
	{
		switch (e.which)
		{
			case 1:
			{
				ee.Button |= MouseButtons.Primary;
				break;
			}
			case 2:
			{
				ee.Button |= MouseButtons.Tertiary;
				break;
			}
			case 3:
			{
				ee.Button |= MouseButtons.Secondary;
				break;
			}
		}
	}
	else if (e.button)
	{
		if ((e.button & 1) == 1) ee.Button |= MouseButtons.Primary;
		if ((e.button & 4) == 4) ee.Button |= MouseButtons.Tertiary;
		if ((e.button & 2) == 2) ee.Button |= MouseButtons.Secondary;
	}
	return ee;
};
function KeyboardKeys()
{
};
/**
 * The ENTER key.
 */
KeyboardKeys.Enter = 13;
/**
 * The ESC key.
 */
KeyboardKeys.Escape = 27;
/**
 * The F1 function key.
 */
KeyboardKeys.F1 = 112;

KeyboardKeys.Control = 17;
KeyboardKeys.Alt = 18;

KeyboardKeys.ArrowLeft = 37;
KeyboardKeys.ArrowUp = 38;
KeyboardKeys.ArrowRight = 39;
KeyboardKeys.ArrowDown = 40;

KeyboardKeys.Meta = 91;
KeyboardKeys.ContextMenu = 93;

/**
 * Enumeration for horizontal alignment values
 */
function HorizontalAlignment(value)
{
	this._value = value;
}
/**
 * Specifies that content is aligned to the left.
 */
HorizontalAlignment.Left = new HorizontalAlignment(0);
/**
 * Specifies that content is aligned in the center of the screen.
 */
HorizontalAlignment.Center = new HorizontalAlignment(1);
/**
 * Specifies that content is aligned to the right.
 */
HorizontalAlignment.Right = new HorizontalAlignment(2);

/**
 * Enumeration for vertical alignment values
 */
function VerticalAlignment(value)
{
	this._value = value;
}
/**
 * Specifies that content is aligned to the top.
 */
VerticalAlignment.Top = new VerticalAlignment(0);
/**
 * Specifies that content is aligned in the middle of the screen.
 */
VerticalAlignment.Middle = new VerticalAlignment(1);
/**
 * Specifies that content is aligned to the bottom.
 */
VerticalAlignment.Bottom = new VerticalAlignment(2);

function Callback(sender)
{
	this._items = [];
	this._sender = sender;
	
	this.Add = function(func)
	{
		this._items.push(func);
	};
	this.Execute = function(e)
	{
		for (var i = 0; i < this._items.length; i++)
		{
			this._items[i](this._sender, e);
		}
	};
}
function CallbackArgument()
{
}
CallbackArgument.Empty = new CallbackArgument();

function Page()
{
}
Page.Cookies = new Object();
/**
 * Gets the cookie with the specified name.
 */
Page.Cookies.Get = function(name)
{
	var cookie = document.cookie.split(';');
	for (var i = 0; i < cookie.length; i++)
	{
		var cookie1 = cookie[i].split(';', 2);
		if (cookie1[0] == name) return cookie1[1];
	}
	return null;
};
/**
 * Sets the cookie with the given name to the given value, and optionally sets an expiration date.
 * @param name string The name of the cookie to set or update.
 * @param value string The value of the cookie.
 * @param expires string The date and time at which the cookie should expire.
 */
Page.Cookies.Set = function(name, value, expires)
{
	var cookie = name + "=" + value;
	if (expires)
	{
		cookie += ";expires=" + expires;
	}
	document.cookie = cookie;
};

Page.Path = new Object();
Page.Path.GetParts = function()
{
	var p = window.location.href.substring(System.ExpandRelativePath("~/").length + 5);
	return p.split('/');
};

/**
 * The Phast static members
 */
function System()
{
}

/**
 * Redirects the browser to the given page.
 */
System.Redirect = function(path)
{
	window.location.href = System.ExpandRelativePath(path);
};
/**
 * Expands the given path using the tilde (~) character and variable replacement.
 */
System.ExpandRelativePath = function(path)
{
	var replpath = System.BasePath;
	if (System.IsTenantedHostingEnabled())
	{
		replpath = replpath + "/" + System.GetTenantName();
	}
	return path.replace(/~\//, replpath + "/");
};
/**
 * Raises a custom DOM event on the given element.
 * @param element string The element on which to raise the event.
 * @param eventName string The name of the Event to raise.
 * @param args any Arguments passed into the event handler.
 */
System.RaiseEvent = function(element, eventName, args)
{
	var event; // The custom event that will be created
	if (document.createEvent)
	{
		event = document.createEvent("HTMLEvents");
		event.initEvent(eventName, true, true);
	}
	else
	{
		event = document.createEventObject();
		event.eventType = eventName;
	}
	event.eventName = eventName;

	if (document.createEvent)
	{
		return element.dispatchEvent(event);
	}
	else
	{
		element.fireEvent("on" + eventName, event);
	}
};
/**
 * Provides an event handler for custom-handled events.
 * @deprecated Use DOM events and System.RaiseEvent() instead.
 */
System.EventHandler = function()
{
	this._functions = new Array();
	this.Add = function (func)
	{
		this._functions.push(func);
	};
	this.Execute = function(sender, e)
	{
		for (var i = 0; i < this._functions.length; i++)
		{
			var retval = this._functions[i](sender, e);
			if (!retval) return false;
		}
		return true;
	};
};
System.Navigation = new Object();
/**
 * Retrieves partial content from a URL and loads it into the specified element's innerHTML property.
 *
 * @param url string The URL to fetch.
 * @param targetFrame string The DOM element in which to load the data.
 * @param throbber DOMElement The DOM element used as the waiting indicator (optional).
 * @param throbberClassDefault string The CSS class for the waiting indicator (optional).
 * @param throbberClassHidden string The CSS class for the hidden waiting indicator (optional).
 * @param throbberClassVisible string The CSS class for the visible waiting indicator (optional).
 */
System.Navigation.LoadPartialContent = function(url, targetFrame, async, throbber, throbberClassDefault, throbberClassHidden, throbberClassVisible)
{
	if (typeof(async) === "undefined") async = false;
	if (!throbberClassDefault) throbberClassDefault = "";
	if (!throbberClassHidden) throbberClassHidden = "Hidden";
	if (!throbberClassVisible) throbberClassHidden = "Visible";
	
	// fetch the data from the URL, should be a same-origin URL
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			targetFrame.innerHTML = xhr.responseText;
			if (throbber)
			{
				var cssclass = "";
				if (throbberClassDefault) cssclass += throbberClassDefault + " ";
				if (throbberClassVisible) cssclass += throbberClassHidden;
				throbber.className = cssclass;
			}
		}
	};
	xhr.open('GET', url, async);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send(null);
	
	if (throbber)
	{
		var cssclass = "";
		if (throbberClassDefault) cssclass += throbberClassDefault + " ";
		if (throbberClassVisible) cssclass += throbberClassVisible;
		throbber.className = cssclass;
	}
};
System.TerminateIfSenderIs = function(sender, compareTo)
{
	while (sender != null)
	{
		if (sender.classList)
		{
			for (var i = 0; i < compareTo.length; i++)
			{
				if (System.ClassList.Contains(sender, compareTo[i]))
				{
					// do not close the popup when we click inside itself
					// e.preventDefault();
					// e.stopPropagation();
					// alert(compareTo[i] + " = " + sender.className + " ? true ");
					return true;
				}
			}
		}
		sender = sender.parentNode;
		if (sender == null) break;
	}
	return false;
};
/**
 * Enters full screen mode on the specified element. If no element is specified, the entire page becomes full screen.
 * @param element DOMElement The element with which to fill the screen. If not specified, document.body will be used.
 */
System.EnterFullScreen = function(element)
{
	if (!element) element = document.body;
	if (element.requestFullscreen)
	{
		// The HTML5 way
		element.requestFullscreen();
	}
	else if (element.webkitRequestFullscreen)
	{
		// The WebKit (safari/chrome) way
		element.webkitRequestFullscreen();
	}
	else if (element.mozRequestFullScreen)
	{
		// The Firefox way
		element.mozRequestFullScreen();
	}
	else if (element.msRequestFullscreen)
	{
		// The Internet Explorer way
		element.msRequestFullscreen();
	}
};
/**
 * Exits full screen mode.
 */
System.ExitFullScreen = function()
{
	if (document.exitFullscreen)
	{
		document.exitFullscreen();
	}
	else if (document.webkitExitFullscreen)
	{
		document.webkitExitFullscreen();
	}
	else if (document.mozCancelFullScreen)
	{
		document.mozCancelFullScreen();
	}
	else if (document.msExitFullscreen)
	{
		document.msExitFullscreen();
	}
};

/**
 * Gets the predefined Phast events that are passed into event handlers.
 */
System.Events = new Object();

System.Events.MouseClick = new Object();
System.Events.MouseClick.Name = "click";

/**
 * The event that is raised when the mouse wheel is scrolled over an element.
 */
System.Events.MouseWheel = new Object();
//FF doesn't recognize mousewheel as of FF3.x
/**
 * Gets the name of this event.
 */
System.Events.MouseWheel.Name = ((/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel");
/**
 * Gets the event arguments for this event.
 */
System.Events.GetEventArgs = function(e)
{
	var delta = e.detail ? e.detail * (-120) : e.wheelDelta;
	// delta returns +120 when wheel is scrolled up, -120 when scrolled down
	var evt =
	{
		"Cancel": false,
		"Delta": delta
	};
	return evt;
};

/**
 * Gets the value of the ClientProperty with the given propertyName for the control with the given controlName.
 * @param controlName string The name of the control for which to retrieve a ClientProperty.
 * @param propertyName string The name of the property to search for.
 */
System.GetClientProperty = function(controlName, propertyName)
{
	return Page.Cookies.Get(controlName + "__ClientProperty_" + propertyName);
};
/**
 * Sets the value of the ClientProperty with the given propertyName for the control with the given controlName to the given propertyValue.
 * @param controlName string The name of the control for which to update a ClientProperty.
 * @param propertyName string The name of the property to search for.
 * @param propertyValue string The new value of the property.
 */
System.SetClientProperty = function(controlName, propertyName, propertyValue)
{
	Page.Cookies.Set(controlName + "__ClientProperty_" + propertyName, propertyValue);
};
/**
 * Adds an event listener with the given eventTypeOrName to the parent element.
 * @param parent DOMElement The element on which to add an event listener.
 * @param eventTypeOrName string The name of the event for which to add a listener, minus the "on" prefix.
 * @param callback EventListener The event listener that will be called when this event is raised.
 */
System.AddEventListener = function(parent, eventTypeOrName, callback)
{
	function CustomCallback(evt)
	{
		if (typeof eventTypeOrName.GetEventArgs !== 'undefined')
		{
			var eas = eventTypeOrName.GetEventArgs(evt);
			eas.Cancel = false;
			callback(eas);
			if (eas.Cancel)
			{
				evt.preventDefault();
				evt.stopPropagation();
				return false;
			}
		}
		else
		{
			var eas = evt;
			eas.Cancel = false;
			callback(eas);
			if (eas.Cancel)
			{
				evt.preventDefault();
				evt.stopPropagation();
				return false;
			}
		}
		return true;
	}

	if (typeof eventTypeOrName !== "object")
	{
		if (parent.attachEvent)
		{
			//if IE (and Opera depending on user setting)
			parent.attachEvent("on" + eventTypeOrName, callback);
		}
		else if (parent.addEventListener) //WC3 browsers
		{
			parent.addEventListener(eventTypeOrName, callback, false);
		}
	}
	else
	{
		if (parent.attachEvent)
		{
			//if IE (and Opera depending on user setting)
			parent.attachEvent("on" + eventTypeOrName.Name, CustomCallback);
		}
		else if (parent.addEventListener) //WC3 browsers
		{
			parent.addEventListener(eventTypeOrName.Name, CustomCallback, false);
		}
	}
};

System.ClassList = 
{
	"Add": function (object, className)
	{
		if (object.classList && object.classList.add)
		{
			object.classList.add(className);
			return true;
		}

		var splits = object.className.split(" ");
		for (var i = 0; i < splits.length; i++)
		{
			if (splits[i] == className) return true;
		}
		splits.push(className);
		object.className = splits.join(" ");
		return false;
	},
	"Remove": function (object, className)
	{
		if (object.classList && object.classList.remove)
		{
			object.classList.remove(className);
			return true;
		}

		var splits = object.className.split(" ");
		var newsplits = new Array();
		for (var i = 0; i < splits.length; i++)
		{
			if (splits[i] == className) continue;
			newsplits.push(splits[i]);
		}
		object.className = newsplits.join(" ");
		return false;
	},
	"Contains": function (object, className)
	{
		if (object.classList && object.classList.contains)
		{
			return object.classList.contains(className);
		}

		if (!object.className) return false;

		var splits = object.className.split(" ");
		for (var i = 0; i < splits.length; i++)
		{
			if (splits[i] == className) return true;
		}
		return false;
	},
	"Toggle": function (object, className)
	{
		if (System.ClassList.Contains(object, className))
		{
			System.ClassList.Remove(object, className);
		}
		else
		{
			System.ClassList.Add(object, className);
		}
	}
};

System.StringMethods =
{
	"Contains": function(string, value)
	{
		if (string.includes) return string.includes(value);
		if (string.contains) return string.contains(value);
		
		console.error("Neither String.includes nor String.contains were found");
		return false;
	}
};

var WebPage =
{
	"Postback": function(url)
	{
		var WebPageForm = document.getElementById("WebPageForm");
		if (url)
		{
			// Set the action of the WebPageForm to the specified PostBackURL before submitting
			WebPageForm.action = url;
		}
		if (!WebPageForm)
		{
			console.warn("WebPage.Postback: could not find WebPageForm, postbacks are not enabled");
			return;
		}
		WebPageForm.submit();
	},
	"IsVariableDefined": function(name)
	{
		var txtWebPageVariable = document.getElementById("WebPageVariable_" + name + "_Value");
		if (!txtWebPageVariable) return false;
		return true;
	},
	"IsVariableSet": function(name)
	{
		var txtWebPageVariable_IsSet = document.getElementById("WebPageVariable_" + name + "_IsSet");
		if (!txtWebPageVariable_IsSet)
		{
			console.warn("WebPage.IsVariableSet: undefined variable '" + name + "'");
			return false;
		}
		return true;
	},
	"ClearVariableValue": function(name, value)
	{
		var txtWebPageVariable = document.getElementById("WebPageVariable_" + name + "_Value");
		var txtWebPageVariable_IsSet = document.getElementById("WebPageVariable_" + name + "_IsSet");
		if (!txtWebPageVariable || !txtWebPageVariable_IsSet)
		{
			console.error("WebPage.ClearVariableValue: undefined variable '" + name + "'");
			return false;
		}
		txtWebPageVariable_IsSet.value = "false";
		txtWebPageVariable.value = "";
		
		WebPage.Postback();
		return true;
	},
	"GetVariableValue": function(name)
	{
		var txtWebPageVariable = document.getElementById("WebPageVariable_" + name + "_Value");
		if (!txtWebPageVariable)
		{
			console.error("WebPage.GetVariableValue: undefined variable '" + name + "'");
			return null;
		}
		return txtWebPageVariable.value;
	},
	"SetVariableValue": function(name, value, autoPostback)
	{
		var txtWebPageVariable = document.getElementById("WebPageVariable_" + name + "_Value");
		var txtWebPageVariable_IsSet = document.getElementById("WebPageVariable_" + name + "_IsSet");
		if (!txtWebPageVariable || !txtWebPageVariable_IsSet)
		{
			console.error("WebPage.GetVariableValue: undefined variable '" + name + "'");
			return false;
		}
		txtWebPageVariable_IsSet.value = "true";
		txtWebPageVariable.value = value;
		
		if (autoPostback !== false)
		{
			WebPage.Postback();
		}
		return true;
	}
};

/*
   Provide the XMLHttpRequest constructor for Internet Explorer 5.x-6.x:
   Other browsers (including Internet Explorer 7.x-9.x) do not redefine
   XMLHttpRequest if it already exists.
 
   This example is based on findings at:
   http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
*/
if (typeof XMLHttpRequest === "undefined")
{
	XMLHttpRequest = function ()
	{
		try
		{
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
		}
		catch (e) {}
		try
		{
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		}
		catch (e) {}
		try
		{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e) {}
		console.log("This browser does not support XMLHttpRequest.");
	};
}