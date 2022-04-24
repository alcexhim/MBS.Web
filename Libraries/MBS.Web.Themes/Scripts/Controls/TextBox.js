function TextBoxItem(parent, value, title)
{
	this.NativeObject = parent;
	this.Title = title;
	this.Value = value;
	
	this.GetSelected = function()
	{
		for (var i = 0; i < this.NativeObject.SelectElement.children.length; i++)
		{
			if (this.NativeObject.SelectElement.children[i].value == this.Value)
			{
				if (this.NativeObject.SelectElement.children[i].hasAttribute("selected")) return true;
			}
		}
		return false;
	}
	this.SetSelected = function(value)
	{
		var changed = false;
		for (var i = 0; i < this.NativeObject.SelectElement.children.length; i++)
		{
			if (this.NativeObject.SelectElement.children[i].value == this.Value)
			{
				if (value)
				{
					changed = changed || !this.NativeObject.SelectElement.children[i].hasAttribute("selected");
					this.NativeObject.SelectElement.children[i].setAttribute("selected", "selected");
				}
				else
				{
					changed = changed || !this.NativeObject.SelectElement.children[i].hasAttribute("selected");
					this.NativeObject.SelectElement.children[i].removeAttribute("selected", "selected");
				}
			}
			else
			{
				if (!this.NativeObject.IsMultiSelect())
				{
					changed = changed || this.NativeObject.SelectElement.children[i].hasAttribute("selected");
					this.NativeObject.SelectElement.children[i].removeAttribute("selected");
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
	
	this.TextBoxElement = parentElement;
	this.PopupElement = document.createElement("div");
	this.PopupElement.className = "uwt-popup uwt-textbox-popup";
	
	this.SpinnerElement = document.createElement("div");
	this.SpinnerElement.className = "uwt-spinner";
	this.PopupElement.appendChild(this.SpinnerElement);
	
	var dropDownElement = document.createElement("div");
	dropDownElement.className = "uwt-dropdown-content";
	this.PopupElement.appendChild(dropDownElement);
	
	this.DropDownElement = this.PopupElement.children[1];
	
	parentElement.parentElement.appendChild(this.PopupElement);
	
	this.EventHandlers =
	{
		"DropDownOpening": new System.EventHandler(),
		"DropDownOpened": new System.EventHandler(),
		"DropDownClosing": new System.EventHandler(),
		"DropDownClosed": new System.EventHandler(),
		"SelectionChanged": new System.EventHandler()
	};
	
	this.SetLoading = function(value)
	{
		if (value)
		{
			System.ClassList.Add(this.PopupElement, "uwt-loading");
		}
		else
		{
			System.ClassList.Remove(this.PopupElement, "uwt-loading");
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
		for (var i = 0; i < this.SelectElement.children.length; i++)
		{
			if (this.SelectElement.options[i].hasAttribute("selected"))
			{
				selectedItems.push(new TextBoxItem(this, this.SelectElement.options[i].value, this.SelectElement.options[i].label));
			}
		}
		for (var i = 0; i < this.DropDownElement.children.length; i++)
		{
			System.ClassList.Remove(this.DropDownElement.children[i], "uwt-selected");
		}
		for (var i = 0; i < selectedItems.length; i++)
		{
			text += selectedItems[i].Title;
			if (i < selectedItems.length - 1) text += "; ";

			for (var j = 0; j < this.DropDownElement.children.length; j++)
			{
				if (this.DropDownElement.children[j].children[0].getAttribute("data-value") == selectedItems[i].Value)
				{
					System.ClassList.Add(this.DropDownElement.children[j], "uwt-selected");
				}
			}
		}
		this.TextBoxElement.value = text;
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
		/*
		if (this.value == "" && this.placeholder != "")
		{
			this.value = this.placeholder;
		}
		*/
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
					if (!System.ClassList.Contains(no.DropDownElement.children[i], "uwt-visible"))
						continue;
					
					if (firstI == -1)
						firstI = i;
					
					if (System.ClassList.Contains(no.DropDownElement.children[i], "uwt-active"))
					{
						System.ClassList.Remove(no.DropDownElement.children[i], "uwt-active");
						if (e.keyCode == KeyboardKeys.ArrowDown)
						{
							if (i < no.DropDownElement.children.length - 1)
							{
								System.ClassList.Add(no.DropDownElement.children[i + 1], "uwt-active");
								found = true;
							}
						}
						else if (e.keyCode == KeyboardKeys.ArrowUp)
						{
							if (i > 0)
							{
								System.ClassList.Add(no.DropDownElement.children[i - 1], "uwt-active");
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
						System.ClassList.Add(no.DropDownElement.children[firstI], "uwt-active");
					}
					else if (e.keyCode == KeyboardKeys.ArrowUp)
					{
						System.ClassList.Add(no.DropDownElement.children[no.DropDownElement.children.length - (firstI + 1)], "uwt-active");
					}
				}
			}
		}
		else if (e.keyCode == KeyboardKeys.Enter)
		{
			// activate the selected menu item
			for (var i = 0; i < no.DropDownElement.children.length; i++)
			{
				if (!System.ClassList.Contains(no.DropDownElement.children[i], "uwt-visible"))
					continue;
				
				if (System.ClassList.Contains(no.DropDownElement.children[i], "uwt-active"))
				{
					System.ClassList.Remove(no.DropDownElement.children[i], "uwt-active");
					
					var a = no.DropDownElement.children[i].children[0];
					if (e.ctrlKey)
					{
						window.open(a.href);
					}
					else
					{
						window.location.href = a.href;
					}
					
					no.DropDown.Close();
					break;
				}
			}
		}
	});
	
	this.RefreshTimeout = null;
	
	this.TextBoxElement.NativeObject = this;
	this.TextBoxElement.addEventListener("keyup", function(e)
	{
		switch (e.keyCode)
		{
			case 27:
			{
				this.NativeObject.DropDown.Close();
				break;
			}
			default:
			{
				if (this.NativeObject.RefreshTimeout != null)
				{
					window.clearTimeout(this.NativeObject.RefreshTimeout);
				}
				this.NativeObject.RefreshTimeout = window.setTimeout(function(thiss)
				{
					thiss.NativeObject.Refresh();
				}, 100, this);
				break;
			}
		}
	});
	
	for (var i = 0; i < this.DropDownElement.children.length; i++)
	{
		this.DropDownElement.children[i].children[0].NativeObject = this;
		this.DropDownElement.children[i].children[0].addEventListener("click", function(e)
		{
			if (!this.NativeObject.IsMultiSelect())
			{
				this.NativeObject.GetItemByValue(this.parentElement.getAttribute("data-value")).SetSelected(true);
				
				// this.NativeObject.DropDown.Close();
				this.NativeObject.PopupElement.focus();
			}
			else
			{
				var item = this.NativeObject.GetItemByValue(this.parentElement.getAttribute("data-value"));
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
	this.GetItemByIndex = function(index)
	{
		if (index >= 0 && index < this.SelectElement.options.length)
		{
			return new TextBoxItem(this, this.SelectElement.options[index].value, this.SelectElement.options[index].label);
		}
		return null;
	};
	this.GetItemByValue = function(value)
	{
		for (var i = 0; i < this.SelectElement.options.length; i++)
		{
			if (this.SelectElement.options[i].value == value || (this.SelectElement.options[i].value == null && this.SelectElement.options[i].label == value))
			{
				return new TextBoxItem(this, this.SelectElement.options[i].value, this.SelectElement.options[i].label);
			}
		}
		return null;
	};
	
	this.Refresh = function()
	{
		var ret = null;
		this.SetLoading(true);
		if (this.Suggest)
		{
			ret = this.Suggest(this.GetText());
		}
		
		this.DropDownElement.innerHTML = "";
		if (ret != null)
		{
			var elem = this.BuildDropDownContainer();
			if (elem)
			{
				this.DropDownElement.appendChild(elem);
				
				for (var i = 0; i < ret.length; i++)
				{
					var elemChild = this.BuildDropDownItem(ret[i], (i % 2) != 0);
					if (elemChild)
						elem.appendChild(elemChild);
				}
			}
			this.DropDown.Open();
			
			this.SetLoading(false);
		}
		else if (this.SuggestionURL)
		{
			var xhr = new XMLHttpRequest();
			xhr.parentTextbox = this;
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState === 4)
				{
					xhr.parentTextbox.SetLoading(false);
					
					if (xhr.status != 200)
					{
						console.log("TextBox: XMLHttpRequest returned response code " + xhr.status + ": " + xhr.statusText);
						return;
					}
					
					var elem = xhr.parentTextbox.BuildDropDownContainer();
					var obj = JSON.parse(xhr.responseText);
					if (obj.result == "success")
					{
						for (var i = 0; i < obj.items.length; i++)
						{
							var elemChild = xhr.parentTextbox.BuildDropDownItem(obj.items[i]);
							elem.appendChild(elemChild);
						}
					}
					
					xhr.parentTextbox.DropDownElement.appendChild(elem);
					xhr.parentTextbox.DropDown.Open();
				}
			};
			
			var url = System.ExpandRelativePath(this.SuggestionURL);
			xhr.open('GET', url.replace(/\%1/g, this.GetText()), true);
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
					System.ClassList.Add(ul.children[i], "uwt-visible");
				}
				else
				{
					System.ClassList.Remove(ul.children[i], "uwt-visible");
				}
			}
		}
	};
	this.FormatItemID = function(item)
	{
		return item.ID;
	};
	this.FormatItemText = function(item)
	{
		return "<span class=\"uwt-title\">" + item.title + "</span>"
			+ "<span class=\"uwt-subtitle\">" + item.subtitle + "</span>"
			+ "<span class=\"uwt-content\">" + item.description + "</span>";
	};
	this.FormatItemTargetURL = function(item)
	{
		return System.ExpandRelativePath(item.targetUrl);
	};
	
	this.BuildDropDownContainer = function()
	{
		var elem = document.createElement("ul");
		elem.className = "uwt-menu";
		return elem;
	};
	this.BuildDropDownItem = function(item, alternate)
	{
		var elem = document.createElement("li");
		elem.className = "uwt-visible";
		if (alternate)
		{
			elem.className = "uwt-visible uwt-alternate";
		}
		
		var a = this.BuildDropDownItemContent(item, alternate);
		elem.appendChild(a);
		return elem;
	};
	this.BuildDropDownItemContent = function(item, alternate)
	{
		var a = document.createElement("a");
		a.href = this.FormatItemTargetURL(item);
		a._NativeObject = this;
		a._Item = item;
		a.addEventListener("click", function(e)
		{
			if (this._NativeObject.AddItem(this._NativeObject, this._Item))
			{
				e.preventDefault();
				e.stopPropagation();
			}
		});
		a.innerHTML = this.FormatItemText(item);
		return a;
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
			
			System.ClassList.Add(popup, "uwt-visible");
			
			this.NativeObject.EventHandlers.DropDownOpened.Execute(this.NativeObject, EventArgs.Empty);
		},
		"Close": function()
		{
			var ee = new CancelEventArgs();
			this.NativeObject.EventHandlers.DropDownClosing.Execute(this.NativeObject, ee);
			
			if (ee.Cancel) return;
			
			var popup = this.NativeObject.PopupElement;
			System.ClassList.Remove(popup, "uwt-visible");
			
			this.NativeObject.EventHandlers.DropDownClosed.Execute(this.NativeObject, EventArgs.Empty);
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
			System.ClassList.Add(li, "uwt-menuitem");
			System.ClassList.Add(li, "uwt-command");
			System.ClassList.Add(li, "uwt-visible");
			
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
	
	this.EnableMultipleSelection = this.ParentElement.getAttribute("data-multiple-selection") == "true";
	this.AddItem = function(textbox, item)
	{
		if (this.EnableMultipleSelection)
		{
			/*
			var i = this.CountItems();
			
			var html = this.GetElement("items").innerHTML;
			html += "<span id=\"Textbox_" + this.ID + "_items_" + i + "\" class=\"TextboxSelectedItem\">";
			html += "<span class=\"TextboxSelectedItemText\">" + this.FormatItemText(item) + "</span>";
			html += "<a class=\"TextboxSelectedItemCloseButton\" onclick=\"" + this.ID + ".RemoveItemAtIndex(" + i + ");\" href=\"#\">x</a>";
			html += "</span>";
			this.GetElement("items").innerHTML = html;
			
			this.GetElement("popup").style.display = "none";
			
			this.SelectedItems.push(item);
			*/
		}
		else
		{
			/*
			this.SelectedItems = new Array();
			this.SelectedItems.push(item);
			this.SetText(this.FormatItemText(item));
			*/
		}
	};
	/*
	
	this.Suggest = function(filter)
	{
		return null;
	};
	
	this.SelectedItems = new Array();
	
	this.CountItems = function()
	{
		var items = this.GetElement("items");
		return items.children.length - 1;
	};
	
	this.RemoveItemAtIndex = function(index)
	{
		var items = this.GetElement("items");
		index++;
		items.removeChild(items.children[index]);
	};
	
	*/
}
window.addEventListener("load", function(e)
{
	// retrofit SELECT elements
	var selects = document.getElementsByTagName("SELECT");
	for (var i = 0; i < selects.length; i++)
	{
		if (System.ClassList.Contains(selects[i], "uwt-system-control"))
			continue;
			
		var pn = selects[i].parentNode;
		
		var divTextBox = document.createElement("div");
		
		var textBoxWrapper = document.createElement("div");
		var dummy = document.createElement("div");
		textBoxWrapper.appendChild(dummy);
		
		var textBox = document.createElement("input");
		textBox.type = "text";
		textBoxWrapper.appendChild(textBox);
		divTextBox.appendChild(textBoxWrapper);
		
		var popupElement = document.createElement("div");
		popupElement.className = "uwt-popup";
		
		textBox._popupElement = popupElement;
		textBox.addEventListener("focus", function()
		{
			System.ClassList.Add(this._popupElement, "uwt-visible");
		});
		textBox.addEventListener("blur", function()
		{
			System.ClassList.Remove(this._popupElement, "uwt-visible");
		});
		
		var menuElement = document.createElement("ul");
		menuElement.className = "uwt-menu";
		
		var select2 = document.createElement("select");
		for (var j = 0; j < selects[i].options.length; j++)
		{
			var li = document.createElement("li");
			li.className = "uwt-visible";
			
			if (selects[i].options[j].value == null)
			{
				li.setAttribute("data-value", selects[i].options[j].label)
			}
			else
			{
				li.setAttribute("data-value", selects[i].options[j].value)
			}
			
			var a = document.createElement("a");
			
			var spanIcon = document.createElement("span");
			spanIcon.className = "uwt-menuitem-icon";
			a.appendChild(spanIcon);
			
			var spanText = document.createElement("span");
			spanText.className = "uwt-menuitem-text";
			spanText.innerHTML = selects[i].options[j].label;
			a.appendChild(spanText);
			a.href = "#";
			li.appendChild(a);
			
			menuElement.appendChild(li);
			select2.options.add(selects[i].options[j]);
			j--;
		}
		
		popupElement.appendChild(menuElement);
		
		divTextBox.appendChild(popupElement);
		
		divTextBox.className = "uwt-textbox uwt-selection-required";
		selects[i].replaceWith(divTextBox);
		divTextBox.appendChild(select2);
	}
	
	var textBoxes = document.getElementsByTagName("input");
	for (var i = 0; i < textBoxes.length; i++)
	{
		if (textBoxes[i].type == "submit" || textBoxes[i].type == "button")
		{
			// these are not text boxes; they're buttons
			continue;
		}
		
		textBoxes[i].NativeObject = new TextBox(textBoxes[i]);
	}
});