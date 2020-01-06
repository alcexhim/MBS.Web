function TextBoxItem(parent, value, title)
{
	this.NativeObject = parent;
	this.Title = title;
	this.Value = value;
	
	this.GetSelected = function()
	{
		for (var i = 0; i < this.NativeObject.SelectElement.childNodes.length; i++)
		{
			if (this.NativeObject.SelectElement.childNodes[i].value == this.Value)
			{
				if (this.NativeObject.SelectElement.childNodes[i].hasAttribute("selected")) return true;
			}
		}
		return false;
	}
	this.SetSelected = function(value)
	{
		var changed = false;
		for (var i = 0; i < this.NativeObject.SelectElement.childNodes.length; i++)
		{
			if (this.NativeObject.SelectElement.childNodes[i].value == this.Value)
			{
				if (value)
				{
					changed = changed || !this.NativeObject.SelectElement.childNodes[i].hasAttribute("selected");
					this.NativeObject.SelectElement.childNodes[i].setAttribute("selected", "selected");
				}
				else
				{
					changed = changed || !this.NativeObject.SelectElement.childNodes[i].hasAttribute("selected");
					this.NativeObject.SelectElement.childNodes[i].removeAttribute("selected", "selected");
				}
			}
			else
			{
				if (!this.NativeObject.IsMultiSelect())
				{
					changed = changed || this.NativeObject.SelectElement.childNodes[i].hasAttribute("selected");
					this.NativeObject.SelectElement.childNodes[i].removeAttribute("selected");
				}
			}
		}
		this.NativeObject.UpdateSelectedItems();
		
		if (changed)
		{
			this.NativeObject.EventHandlers.SelectionChanged.Execute(this.NativeObject, null);
		}
	};
}
function TextBox(parentElement)
{
	this.ParentElement = parentElement;
	this.TextBoxElement = parentElement.children[0].children[1];
	this.PopupElement = parentElement.children[1];
	this.DropDownElement = this.PopupElement.children[0];
	this.SelectElement = parentElement.children[2];
	
	this.EventHandlers =
	{
		"DropDownOpening": new System.EventHandler(),
		"DropDownOpened": new System.EventHandler(),
		"SelectionChanged": new System.EventHandler()
	};
	
	this.SetLoading = function(value)
	{
		if (value)
		{
			System.ClassList.Add(this.ParentElement, "Loading");
		}
		else
		{
			System.ClassList.Remove(this.ParentElement, "Loading");
		}
	};
	
	this.ShouldClearOnFocus = function()
	{
		return System.ClassList.Contains(this.ParentElement, "ClearOnFocus");
	};
	this.IsMultiSelect = function()
	{
		return System.ClassList.Contains(this.ParentElement, "MultiSelect");
	};
	
	this.UpdateSelectedItems = function()
	{
		var selectedItems = [];
		var text = "";
		for (var i = 0; i < this.SelectElement.childNodes.length; i++)
		{
			if (this.SelectElement.childNodes[i].hasAttribute("selected"))
			{
				selectedItems.push(new TextBoxItem(this, this.SelectElement.childNodes[i].value, this.SelectElement.childNodes[i].innerHTML));
			}
		}
		for (var i = 0; i < this.DropDownElement.childNodes.length; i++)
		{
			System.ClassList.Remove(this.DropDownElement.childNodes[i], "Selected");
		}
		for (var i = 0; i < selectedItems.length; i++)
		{
			text += selectedItems[i].Title;
			if (i < selectedItems.length - 1) text += "; ";

			for (var j = 0; j < this.DropDownElement.childNodes.length; j++)
			{
				if (this.DropDownElement.childNodes[j].childNodes[0].getAttribute("data-value") == selectedItems[i].Value)
				{
					System.ClassList.Add(this.DropDownElement.childNodes[j], "Selected");
				}
			}
		}
		this.TextBoxElement.placeholder = text;
		this.ParentElement.selectedItems = selectedItems;
	}
	
	if (parentElement.attributes["name"] != null)
	{
		this.Name = parentElement.attributes["name"].value;
	}
	else
	{
		this.Name = "";
	}
	if (parentElement.attributes["data-suggestion-url"] != null)
	{
		this.SuggestionURL = parentElement.attributes["data-suggestion-url"].value;
	}
	else
	{
		this.SuggestionURL = null;
	}
	
	this.Focus = function()
	{
		this.TextBoxElement.focus();
	};
	this.ClearText = function()
	{
		this.TextBoxElement.value = "";
	};
	this.GetText = function()
	{
		return this.TextBoxElement.value;
	};
	this.SetText = function(value)
	{
		this.TextBoxElement.value = value;
	};
	
	this.TextBoxElement.NativeObject = this;
	this.TextBoxElement.addEventListener("focus", function(e)
	{
		if (this.NativeObject.ShouldClearOnFocus())
		{
			this.NativeObject.TextBoxElement.placeholder = this.NativeObject.TextBoxElement.value;
			this.NativeObject.ClearText();
		}
		if (this.NativeObject.ParentElement.attributes["data-auto-open"] != null)
		{
			if (this.NativeObject.ParentElement.attributes["data-auto-open"].value == "true")
			{
				this.NativeObject.Refresh();
				this.NativeObject.DropDown.Open();
			}
		}
	});
	this.TextBoxElement.addEventListener("blur", function(e)
	{
		if (this.value == "" && this.placeholder != "")
		{
			this.value = this.placeholder;
		}
	});
	this.TextBoxElement.addEventListener("keydown", function(e)
	{
		var no = this.NativeObject;
		if (e.keyCode == KeyboardKeys.ArrowDown || e.keyCode == KeyboardKeys.ArrowUp)
		{
			if (no.DropDownElement.children.length > 0)
			{
				var found = false;
				var firstI = -1;
				for (var i = 0; i < no.DropDownElement.children.length; i++)
				{
					if (!System.ClassList.Contains(no.DropDownElement.children[i], "Visible"))
						continue;
					
					if (firstI == -1)
						firstI = i;
					
					if (System.ClassList.Contains(no.DropDownElement.children[i], "Hover"))
					{
						System.ClassList.Remove(no.DropDownElement.children[i], "Hover");
						if (e.keyCode == KeyboardKeys.ArrowDown)
						{
							if (i < no.DropDownElement.children.length - 1)
							{
								System.ClassList.Add(no.DropDownElement.children[i + 1], "Hover");
								found = true;
							}
						}
						else if (e.keyCode == KeyboardKeys.ArrowUp)
						{
							if (i > 0)
							{
								System.ClassList.Add(no.DropDownElement.children[i - 1], "Hover");
								found = true;
							}
						}
						break;
					}
				}
				if (!found)
				{
					if (e.keyCode == KeyboardKeys.ArrowDown)
					{
						System.ClassList.Add(no.DropDownElement.children[firstI], "Hover");
					}
					else if (e.keyCode == KeyboardKeys.ArrowUp)
					{
						System.ClassList.Add(no.DropDownElement.children[no.DropDownElement.children.length - (firstI + 1)], "Hover");
					}
				}
			}
		}
		else if (e.keyCode == KeyboardKeys.Enter)
		{
			// activate the selected menu item
			for (var i = 0; i < no.DropDownElement.children.length; i++)
			{
				if (!System.ClassList.Contains(no.DropDownElement.children[i], "Visible"))
					continue;
				
				if (System.ClassList.Contains(no.DropDownElement.children[i], "Hover"))
				{
					System.ClassList.Remove(no.DropDownElement.children[i], "Hover");
					
					var a = no.DropDownElement.children[i].children[0];
					if (e.ctrlKey)
					{
						window.open(a.href);
					}
					else
					{
						window.location.href = a.href;
					}
					break;2
				}
			}
		}
	});
	
	this.RefreshTimeout = null;
	
	this.TextBoxElement.onkeyup = function(sender, e)
	{
		if (e.keyCode == 27) // ESC
		{
			sender.DropDown.Close();
		}
		else
		{
			if (sender.RefreshTimeout != null)
			{
				window.clearTimeout(sender.RefreshTimeout);
			}
			sender.RefreshTimeout = window.setTimeout(function()
			{
				sender.Refresh();
			}, 100);
		}
	}.PrependArgument(this);
	
	for (var i = 0; i < this.DropDownElement.childNodes.length; i++)
	{
		this.DropDownElement.childNodes[i].childNodes[0].NativeObject = this;
		this.DropDownElement.childNodes[i].childNodes[0].addEventListener("click", function(e)
		{
			if (!this.NativeObject.IsMultiSelect())
			{
				this.NativeObject.GetItemByValue(this.getAttribute("data-value")).SetSelected(true);
				
				this.NativeObject.DropDown.Close();
				this.NativeObject.TextBoxElement.blur();
			}
			else
			{
				var item = this.NativeObject.GetItemByValue(this.getAttribute("data-value"));
				item.SetSelected(!item.GetSelected());
			}
			
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	}
	
	this.GetSelectedItems = function()
	{
		this.UpdateSelectedItems();
		return this.ParentElement.selectedItems;
	}
	this.GetItemByValue = function(value)
	{
		for (var i = 0; i < this.SelectElement.childNodes.length; i++)
		{
			if (this.SelectElement.childNodes[i].value == value)
			{
				return new TextBoxItem(this, this.SelectElement.childNodes[i].value, this.SelectElement.childNodes[i].innerHTML);
			}
		}
		return null;
	};
	
	this.Refresh = function()
	{
		var ret = null;
		if (this.Suggest)
		{
			ret = this.Suggest(this.GetText());
		}
		
		if (ret != null)
		{
			var html = "";
			html += this.FormatStart();
			for (var i = 0; i < ret.length; i++)
			{
				html += this.FormatItem(ret[i], (i % 2) != 0);
			}
			html += this.FormatEnd();
			
			this.DropDown.SetInnerHTML(html);
			this.DropDown.Open();
		}
		else if (this.SuggestionURL)
		{
			var xhr = new XMLHttpRequest();
			xhr.parentTextbox = this;
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState === 4)
				{
					if (xhr.status != 200)
					{
						console.log("TextBox: XMLHttpRequest returned response code " + xhr.status + ": " + xhr.statusText);
						return;
					}
					
					var html = "";
					html += xhr.parentTextbox.FormatStart();
					var obj = JSON.parse(xhr.responseText);
					if (obj.result == "success")
					{
						for (var i = 0; i < obj.items.length; i++)
						{
							html += xhr.parentTextbox.FormatItem(obj.items[i]);
						}
					}
					html += xhr.parentTextbox.FormatEnd();
					
					xhr.parentTextbox.DropDown.SetInnerHTML(html);
					xhr.parentTextbox.DropDown.Open();
				}
			};
			xhr.open('GET', this.SuggestionURL.replace(/\%1/g, this.GetText()), true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send(null);  // No data need to send along with the request.
		}
		else
		{
			// console.error("TextBox: no data retrieval functionality (SuggestionURL/Suggest) has been implemented");
			var ul = this.DropDownElement;
			for (var i = 0; i < ul.children.length; i++)
			{
				var spanText = ul.children[i].children[0].children[1];
				if (System.StringMethods.Contains(spanText.innerHTML.toLowerCase(), this.GetText().toLowerCase()))
				{
					System.ClassList.Add(ul.childNodes[i], "Visible");
				}
				else
				{
					System.ClassList.Remove(ul.childNodes[i], "Visible");
				}
			}
		}
	};
	this.FormatStart = function()
	{
		return "<div class=\"Menu\" style=\"width: 100%;\">";
	};
	this.FormatItemID = function(item)
	{
		return item.ID;
	};
	this.FormatItemText = function(item)
	{
		return "<span class=\"Title\">" + item.Title + "</span>"
			+ "<span class=\"Subtitle\">" + item.Subtitle + "</span>"
			+ "<span class=\"Description\">" + item.Description + "</span>";
	};
	this.FormatItemTargetURL = function(item)
	{
		return item.TargetURL;
	};
	this.FormatItem = function(item, alternate)
	{
		var html = "<a";
		if (alternate)
		{
			html += " class=\"Alternate\"";
		}
		html += " href=\"" + this.FormatItemTargetURL(item) + "\" onclick=\"" + this.ID + ".AddItem('" + this.FormatItemID(item) + "');\">" + this.FormatItemText(item) + "</a>";
		return html;
	};
	this.FormatEnd = function()
	{
		return "</div>";
	};
	
	this.DropDown = 
	{
		"NativeObject": null,
		"SetInnerHTML": function(html)
		{
			var popup = this.NativeObject.DropDownElement;
			popup.innerHTML = html;
		},
		"Open": function()
		{
			var ee = new CancelEventArgs();
			this.NativeObject.EventHandlers.DropDownOpening.Execute(this.NativeObject, ee);
			
			if (ee.Cancel) return;
			
			var dropdown = this.NativeObject.DropDownElement;
			var popup = this.NativeObject.PopupElement;
			dropdown.style.minWidth = this.NativeObject.ParentElement.offsetWidth + "px";
			popup.style.minWidth = this.NativeObject.ParentElement.offsetWidth + "px";
			
			System.ClassList.Add(dropdown, "Visible");
			
			this.NativeObject.EventHandlers.DropDownOpened.Execute(this.NativeObject, EventArgs.Empty);
		},
		"Close": function()
		{
			var popup = this.NativeObject.DropDownElement;
			System.ClassList.Remove(popup, "Visible");
		}
	};
	this.DropDown.NativeObject = this;
	
	this.Items =
	{
		"NativeObject": null,
		"_items": new Array(),
		"Add": function(item)
		{
			this._items.push(item);
			
			var li = document.createElement("li");
			System.ClassList.Add(li, "MenuItem");
			System.ClassList.Add(li, "Command");
			System.ClassList.Add(li, "Visible");
			
			li._item = item;
			
			var a = document.createElement("a");
			var iCheckmark = document.createElement("i");
			System.ClassList.Add(iCheckmark, "fa");
			System.ClassList.Add(iCheckmark, "fa-check");
			System.ClassList.Add(iCheckmark, "Checkmark");
			a.appendChild(iCheckmark);
			
			var spanText = document.createElement("span");
			spanText.innerHTML = item.Title;
			a.appendChild(spanText);
			
			if (typeof(item.TargetURL) === "string")
			{
				a.href = item.TargetURL;
			}
			li.appendChild(a);
			
			this.NativeObject.DropDownElement.appendChild(li);
		},
		"Clear": function()
		{
			this._items = new Array();
			this.NativeObject.DropDownElement.innerHTML = "";
		}
	};
	this.Items.NativeObject = this;
	
	/*
	
	this.Suggest = function(filter)
	{
		return null;
	};
	
	this.SelectedItems = new Array();
	
	this.CountItems = function()
	{
		var items = this.GetElement("items");
		return items.childNodes.length - 1;
	};
	
	this.AddItem = function(item)
	{
		if (this.EnableMultipleSelection)
		{
			var i = this.CountItems();
			
			var html = this.GetElement("items").innerHTML;
			html += "<span id=\"Textbox_" + this.ID + "_items_" + i + "\" class=\"TextboxSelectedItem\">";
			html += "<span class=\"TextboxSelectedItemText\">" + this.FormatItemText(item) + "</span>";
			html += "<a class=\"TextboxSelectedItemCloseButton\" onclick=\"" + this.ID + ".RemoveItemAtIndex(" + i + ");\" href=\"#\">x</a>";
			html += "</span>";
			this.GetElement("items").innerHTML = html;
			
			this.GetElement("popup").style.display = "none";
			
			this.SelectedItems.push(item);
		}
		else
		{
			this.SelectedItems = new Array();
			this.SelectedItems.push(item);
			this.SetText(this.FormatItemText(item));
		}
	};
	this.RemoveItemAtIndex = function(index)
	{
		var items = this.GetElement("items");
		index++;
		items.removeChild(items.childNodes[index]);
	};
	
	*/
}
window.addEventListener("load", function(e)
{
	var textBoxes = document.getElementsByClassName("TextBox");
	for (var i = 0; i < textBoxes.length; i++)
	{
		textBoxes[i].NativeObject = new TextBox(textBoxes[i]);
		if (textBoxes[i].id != "") eval("window." + textBoxes[i].id + " = document.getElementById('" + textBoxes[i].id + "').NativeObject;");
	}
});