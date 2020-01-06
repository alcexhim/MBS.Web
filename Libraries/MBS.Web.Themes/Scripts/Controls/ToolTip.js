window.addEventListener('load', function (e)
{
	var tooltips = document.getElementsByTagName("*");
	for (var i = 0; i < tooltips.length; i++)
	{
		(function(tt)
		{
			if (typeof(tt.attributes["data-tooltip-content"]) === 'undefined' && typeof(tt.attributes["data-tooltip-title"]) === 'undefined') return;
		
			var delay = 1000;
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
				if (System.ClassList.Contains(tt, "Disabled")) return;
				
				if (ToolTip.Timer != null) window.clearTimeout(ToolTip.Timer);
				tt.tooltipTimer = window.setTimeout(function(tt)
				{
					var x = tt.mouseX;
					var y = tt.mouseY;
					
					var tooltipTitle = (tt.attributes["data-tooltip-title"] != null ? tt.attributes["data-tooltip-title"].value : "");
					var tooltipContent = (tt.attributes["data-tooltip-content"] != null ? tt.attributes["data-tooltip-content"].value : "");
					var tooltipContextHelpURL = (tt.attributes["data-tooltip-contexthelpurl"] != null ? tt.attributes["data-tooltip-contexthelpurl"].value : "");
					var tooltipContextHelpTargetName = (tt.attributes["data-tooltip-contexthelptarget"] != null ? tt.attributes["data-tooltip-contexthelptarget"].value : "_blank");
				
					if (tooltipTitle == "" || tooltipContent == "") return;
					
					ToolTip.Show(tooltipContent, tooltipTitle, x, y, tooltipContextHelpURL, tooltipContextHelpTargetName);
				}, delay, tt);
			};
			tt.onmouseout = function(e)
			{
				ToolTip.Hide();
			};
		})(tooltips[i]);
	}
});

function ToolTip()
{
}

ToolTip.CurrentContextHelpURL = "";
ToolTip.CurrentContextHelpTargetName = null;

ToolTip.ParentElement = null;
ToolTip.Timer = null;

ToolTip.Show = function(content, title, x, y, contextHelpURL, contextHelpTargetName)
{
	if (ToolTip.ParentElement == null)
	{
		ToolTip.ParentElement = document.createElement("div");
		ToolTip.ParentElement.className = "ToolTip";

		var ttTitleElement = document.createElement("div");
		ttTitleElement.className = "Title";
		ToolTip.ParentElement.appendChild(ttTitleElement);
		
		var ttContentElement = document.createElement("div");
		ttContentElement.className = "Content";
		ToolTip.ParentElement.appendChild(ttContentElement);
		
		var ttContextHelpElement = document.createElement("div");
		ttContextHelpElement.className = "ContextHelp";
		ToolTip.ParentElement.appendChild(ttContextHelpElement);
		
		document.body.appendChild(ToolTip.ParentElement);
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
	
	ToolTip.ParentElement.style.left = x + "px";
	ToolTip.ParentElement.style.top = (y + 16) + "px";
	
	System.ClassList.Add(ToolTip.ParentElement, "Visible");
};
ToolTip.Hide = function()
{
	ToolTip.CurrentContextHelpURL = "";
	ToolTip.CurrentContextHelpTargetName = "_blank";
	if (ToolTip.Timer != null) window.clearTimeout(ToolTip.Timer);
	
	if (ToolTip.ParentElement == null) return;
	System.ClassList.Remove(ToolTip.ParentElement, "Visible");
};


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