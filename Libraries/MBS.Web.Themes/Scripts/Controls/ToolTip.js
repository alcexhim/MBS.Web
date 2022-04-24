function ToolTip()
{
}

ToolTip.CurrentContextHelpURL = "";
ToolTip.CurrentContextHelpTargetName = null;

ToolTip.DefaultDelay = 500;

ToolTip.ParentElement = null;
ToolTip.Timer = null;
ToolTip.InhibitAutoHide = false;

ToolTip.SetContent = function(content)
{
	var tooltipContentElement = ToolTip.ParentElement.childNodes[1];
	tooltipContentElement.innerHTML = content;
};

ToolTip.Show = function(parent, content, title, x, y, contextHelpURL, contextHelpTargetName)
{
	if (ToolTip.ParentElement == null)
	{
		ToolTip.CreateParentElement();
	}
	
	var tooltipTitleElement = ToolTip.ParentElement.childNodes[0];
	var tooltipContentElement = ToolTip.ParentElement.childNodes[1];
	var tooltipContextHelpElement = ToolTip.ParentElement.childNodes[2];
	
	if (title != "")
	{
		tooltipTitleElement.innerHTML = title;
	}
	else
	{
		tooltipTitleElement.style.display = "none";
	}
	
	if (content != "")
	{
		tooltipContentElement.innerHTML = content;
	}
	else
	{
		tooltipContentElement.style.display = "none";
	}
	
	if (contextHelpURL)
	{
		tooltipContextHelpElement.style.display = "block";
		ToolTip.CurrentContextHelpURL = contextHelpURL;
	}
	else
	{
		tooltipContextHelpElement.style.display = "none";
	}
	
	if (contextHelpTargetName)
	{
		ToolTip.CurrentContextHelpTargetName = contextHelpTargetName;
	}
	
	var anchor = "none";
	if (typeof(parent.attributes["data-tooltip-anchor"]) !== 'undefined')
	{
		anchor = parent.attributes["data-tooltip-anchor"].value;
	}
	
	ToolTip.ParentElement.style.top = "";
	ToolTip.ParentElement.style.bottom = "";
	if (anchor == "none")
	{
		ToolTip.ParentElement.style.left = x + "px";
		ToolTip.ParentElement.style.top = (y + 16) + "px";
		ToolTip.ParentElement.style.bottom = "";
		
		console.log("offset-top: ", ToolTip.ParentElement.offsetTop);
		console.log("offset-height: ", ToolTip.ParentElement.offsetHeight);
		console.log("offset-bottom: ", (ToolTip.ParentElement.offsetTop + ToolTip.ParentElement.offsetHeight));
		
		var h = document.body.scrollHeight - window.scrollY;
		console.log("h: ", h);
		
		var usebottom = ToolTip.ParentElement.offsetTop + ToolTip.ParentElement.offsetHeight > h;
		console.log("using bottom: ", usebottom);
		if (usebottom)
		{
			ToolTip.ParentElement.style.top = "";
			ToolTip.ParentElement.style.bottom = h - (y - 16 - ToolTip.ParentElement.offsetHeight) + "px";
		}
	}
	else
	{
		var anchor_p = anchor.split(",");
		var anchor_t = null;
		
		var anchor_oy = 0, anchor_ox = 0;
		if (anchor_p[0] == "parent")
		{
			anchor_t = parent.parentElement;
			
			ToolTip.ParentElement.style.top = (anchor_t.offsetTop - 32) + "px";
			ToolTip.ParentElement.style.left = (anchor_t.offsetLeft + (((anchor_t.offsetWidth - anchor_t.offsetLeft) - ToolTip.ParentElement.scrollWidth) / 2)) + "px";
		}
		else if (anchor_p[0] == "child")
		{
			anchor_t = parent.children[anchor_p[1]];
			for (var i = 2; i < anchor_p.length; i++)
			{
				anchor_t = anchor_t.children[anchor_p[i]];
			}
			anchor_oy += parent.offsetTop;
			anchor_ox += parent.offsetLeft;
			
			ToolTip.ParentElement.style.top = (anchor_oy + anchor_t.offsetTop - 48) + "px";
			ToolTip.ParentElement.style.left = (anchor_ox + anchor_t.offsetLeft) + "px";
		}
	}
	
	System.ClassList.Add(ToolTip.ParentElement, "uwt-visible");
};
ToolTip.Hide = function()
{
	ToolTip.CurrentContextHelpURL = "";
	ToolTip.CurrentContextHelpTargetName = "_blank";
	if (ToolTip.Timer != null) window.clearTimeout(ToolTip.Timer);
	
	if (ToolTip.ParentElement == null) return;
	System.ClassList.Remove(ToolTip.ParentElement, "uwt-visible");
};
ToolTip.CreateParentElement = function()
{
	ToolTip.ParentElement = document.createElement("div");
	ToolTip.ParentElement.onmouseover = function()
	{
		if (!ToolTip.InhibitAutoHide)
			ToolTip.Hide();
	};
	ToolTip.ParentElement.className = "uwt-tooltip";

	var ttTitleElement = document.createElement("div");
	ttTitleElement.className = "uwt-title";
	ToolTip.ParentElement.appendChild(ttTitleElement);
	
	var ttContentElement = document.createElement("div");
	ttContentElement.className = "uwt-content";
	ToolTip.ParentElement.appendChild(ttContentElement);
	
	var ttContextHelpElement = document.createElement("div");
	ttContextHelpElement.className = "ContextHelp";
	ToolTip.ParentElement.appendChild(ttContextHelpElement);
	
	document.body.appendChild(ToolTip.ParentElement);
};

window.addEventListener('load', function (e)
{
	// go through each and every HTML element and see if they are set up for tooltips
	var tooltips = document.getElementsByTagName("*");
	for (var i = 0; i < tooltips.length; i++)
	{
		(function(tt)
		{
			if (typeof(tt.attributes["data-tooltip-content"]) === 'undefined' && typeof(tt.attributes["data-tooltip-title"]) === 'undefined') return;
			
			console.log("found a tooltip");
			var delay = ToolTip.DefaultDelay;
			if (tt.attributes["data-tooltip-delay"])
			{
				delay = tt.attributes["data-tooltip-delay"];
			}

			tt.tooltipTimer = null;
			tt.onmousemove = function(e)
			{
				tt.mouseX = e.clientX;
				tt.mouseY = e.clientY;
			};
			tt.onmouseover = function(e)
			{
				if (System.ClassList.Contains(tt, "uwt-disabled")) return;
				
				if (ToolTip.Timer != null) window.clearTimeout(ToolTip.Timer);
				tt.tooltipTimer = window.setTimeout(function(tt)
				{
					var x = tt.mouseX;
					var y = tt.mouseY;
					
					var tooltipTitle = (typeof(tt.attributes["data-tooltip-title"]) !== 'undefined' ? tt.attributes["data-tooltip-title"].value : "");
					var tooltipContent = (typeof(tt.attributes["data-tooltip-content"]) !== 'undefined' ? tt.attributes["data-tooltip-content"].value : "");
					var tooltipContextHelpURL = (typeof(tt.attributes["data-tooltip-contexthelpurl"]) !== 'undefined' ? tt.attributes["data-tooltip-contexthelpurl"].value : "");
					var tooltipContextHelpTargetName = (typeof(tt.attributes["data-tooltip-contexthelptarget"]) !== 'undefined' ? tt.attributes["data-tooltip-contexthelptarget"].value : "_blank");
				
					if (tooltipTitle == "" && tooltipContent == "") return;
					
					ToolTip.Show(tt, tooltipContent, tooltipTitle, x, y, tooltipContextHelpURL, tooltipContextHelpTargetName);
				}, delay, tt);
			};
			tt.onmouseout = function(e)
			{
				if (!ToolTip.InhibitAutoHide)
					ToolTip.Hide();
			};
		})(tooltips[i]);
	}
	
	// create parent element in advance so first-time tooltips animate properly
	// this is done last as we don't ever have tooltips on the tooltip so we don't need to include it in our loop above
	ToolTip.CreateParentElement();
});
window.addEventListener("keydown", function (e)
{
	switch (e.keyCode)
	{
		case KeyboardKeys.F1: /* F1 */
		{
			if (ToolTip.CurrentContextHelpURL != "")
			{
				var path = System.ExpandRelativePath(ToolTip.CurrentContextHelpURL);
				window.open(path, ToolTip.CurrentContextHelpTargetName);
			}
			break;
		}
	}
});