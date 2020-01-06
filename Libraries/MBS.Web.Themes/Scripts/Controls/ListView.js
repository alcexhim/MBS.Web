var ListViewMode =
{
	"Detail": 1,
	"Tile": 2
};
function ListViewItemActivationMode(value)
{
	this._value = value;
}
ListViewItemActivationMode.SingleClick = new ListViewItemActivationMode(1);
ListViewItemActivationMode.DoubleClick = new ListViewItemActivationMode(2);

function ListViewColumnResizer(parentElement)
{
	this.ParentElement = parentElement;

	for (var i = 0; i < this.ParentElement.parentNode.children.length; i++)
	{
		if (this.ParentElement.parentNode.children[i] == this.ParentElement)
		{
			this.ParentElement.parentNode.children[i].index = i;
			break;
		}
	}
	
	this.ParentElement.addEventListener("mousedown", function(e)
	{
		ListViewColumnResizer._moving = true;
		this._prevX = e.clientX;
		this._prevWidth = this.parentNode.children[this.index - 1].clientWidth;
		ListViewColumnResizer._current = this;
		
		// document.body.style.cursor = "ew-resize";
		e.preventDefault();
	});
}
ListViewColumnResizer._moving = false;
ListViewColumnResizer._current = null;

window.addEventListener("mousemove", function(e)
{
	if (ListViewColumnResizer._moving)
	{
		var lvcr = ListViewColumnResizer._current;
		var w = lvcr._prevWidth + (e.clientX - lvcr._prevX);
		lvcr.parentNode.children[lvcr.index - 1].style.width = w.toString() + "px";
	}
});
window.addEventListener("mouseup", function(e)
{
	ListViewColumnResizer._moving = false;
});

function ListViewItemColumn(parentItem)
{
	this.mvarParentItem = parentItem;
	this.get_ParentItem = function()
	{
		return this.mvarParentItem;
	};
	
	this.get_Value = function()
	{
	};
}
function ListViewItem(parentListView, index)
{
	this.mvarParentListView = parentListView;
	this.get_ParentListView = function()
	{
		return this.mvarParentListView;
	};
	
	this.mvarIndex = index;
	this.get_Index = function()
	{
		return this.mvarIndex;
	};
	
	this.get_ParentElement = function()
	{
		return this.get_ParentListView().ItemsElement.children[this.get_Index()];
	};
	
	this.get_Value = function()
	{
		return this.get_ParentElement().getAttribute("data-value");
	};
}
function ListViewColumn()
{
	this.Title = null;
	this.ItemTemplate = null;
}
function ListView(parentElement)
{
	this.ParentElement = parentElement;
	this.ColumnHeaderElement = this.ParentElement.children[0];
	this.EmptyMessageElement = this.ParentElement.children[1];
	this.ItemsElement = this.ParentElement.children[2];
	
	this.AddRemoveColumnHeaderElement = this.ColumnHeaderElement.children[0];
	this.AddRemoveColumnHeaderAddColumnButton = this.AddRemoveColumnHeaderElement.children[0];
	
	this.AddRemoveColumnHeaderAddColumnButton.NativeObject = this;
	this.AddRemoveColumnHeaderAddColumnButton.addEventListener("click", function(e)
	{
		this.NativeObject.InsertRowAfter(-1);
	});
	
	/**
	 * Inserts a row after the row at the specified index.
	 */
	this.InsertRowAfter = function(index)
	{
		var rw = document.createElement("div");
		rw.className = "ListViewItem";
		
		var col = document.createElement("div");
		col.className = "ListViewItemColumn AddRemoveRowItemColumn";
		
		var aAdd = document.createElement("a");
		aAdd.className = "Add";
		col.appendChild(aAdd);
		
		var aRemove = document.createElement("a");
		aRemove.className = "Remove";
		col.appendChild(aRemove);
		
		rw.appendChild(col);
		
		for (var i = 0; i < this.Columns.Count(); i++)
		{
			var column = this.Columns.GetByIndex(i);
			var col = document.createElement("div");
			col.className = "ListViewItemColumn";
			
			col.innerHTML = column.ItemTemplate;
			
			if (col.children.length > 0)
			{
				col.children[0].id = "ListView_" + this.ParentElement.id + "_Rows_" + this.ItemsElement.children.length + "_Columns_" + column.ID + "_Value";
			}
			
			rw.appendChild(col);
		}
		
		if ((index + 1) > this.ItemsElement.children.length)
		{
			this.ItemsElement.appendChild(rw);
		}
		else
		{
			this.ItemsElement.insertBefore(rw, this.ItemsElement.children[index + 1]);
		}
		this.Refresh();
	};
	
	this.Refresh = function()
	{
		if (this.Rows.Count() > 0)
		{
			System.ClassList.Remove(this.ParentElement, "Empty");
		}
		else
		{
			System.ClassList.Add(this.ParentElement, "Empty");
		}
		
		for (var i = 0; i < this.ColumnHeaderElement.children.length; i++)
		{
			if (this.ColumnHeaderElement.children[i].className == "ColumnResizer")
			{
				this.ColumnHeaderElement.children[i].NativeObject = new ListViewColumnResizer(this.ColumnHeaderElement.children[i]);
			}
		}
		
		for (var i = 0; i < this.ItemsElement.children.length; i++)
		{
			var row = this.ItemsElement.children[i];

			row.m_Index = i;
			
			var AddRemoveRowItemColumnElement = row.children[0];
			var AddRowButton = AddRemoveRowItemColumnElement.children[0];
			AddRowButton.m_Index = i;
			
			var RemoveRowButton = AddRemoveRowItemColumnElement.children[1];
			RemoveRowButton.m_Index = i;
			
			// if it has already been processed, skip it
			if (row.NativeObject) continue;
			
			row.NativeObject = this;
			
			AddRowButton.NativeObject = this;
			AddRowButton.addEventListener("click", function(e)
			{
				this.NativeObject.InsertRowAfter(this.m_Index);
			});
			
			RemoveRowButton.NativeObject = this;
			RemoveRowButton.addEventListener("click", function(e)
			{
				this.NativeObject.Rows.RemoveAt(this.m_Index);
			});
			
			row.addEventListener("mousedown", function(e)
			{
				if (e.ctrlKey && System.ClassList.Contains(this.NativeObject.ParentElement, "MultiSelect"))
				{
					this.NativeObject.SelectedRows.Toggle(this.m_Index);
				}
				else if (e.shiftKey && System.ClassList.Contains(this.NativeObject.ParentElement, "MultiSelect"))
				{
					
				}
				else
				{
					if (!(this.NativeObject.SelectedRows.Count() == 1 && this.NativeObject.SelectedRows.ContainsIndex(this.m_Index)))
					{
						this.NativeObject.SelectedRows.Clear();
						this.NativeObject.SelectedRows.Add(this.m_Index);
					}
				}

				// WARNING: this messes with input elements and other controls - don't uncomment unless you KNOW WHAT YOU'RE DOING
				// e.preventDefault();
				e.stopPropagation();
				return false;
			});
			row.addEventListener("dblclick", function(e)
			{
				if (this.NativeObject.get_ItemActivationMode() == ListViewItemActivationMode.DoubleClick)
				{
					this.NativeObject.EventHandlers.ItemActivated.Execute();
				}
			});
			row.addEventListener("contextmenu", function(e)
			{
				this.NativeObject.SelectedRows.Clear();
				this.NativeObject.SelectedRows.Add(this.m_Index);
				// e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
	};
	
	this.mvarItemActivationMode = ListViewItemActivationMode.DoubleClick;
	this.get_ItemActivationMode = function()
	{
		return this.mvarItemActivationMode;
	};
	this.set_ItemActivationMode = function(value)
	{
		this.mvarItemActivationMode = value;
	};
	
	if (this.ParentElement.hasAttribute("data-item-activation-mode"))
	{
		switch (this.ParentElement.getAttribute("data-item-activation-mode").toLowerCase())
		{
			case "singleclick":
			{
				this.set_ItemActivationMode(ListViewItemActivationMode.SingleClick);
				break;
			}
			case "doubleclick":
			{
				this.set_ItemActivationMode(ListViewItemActivationMode.DoubleClick);
				break;
			}
		}
	}
	
	this.EventHandlers = 
	{
		"ItemActivated": new System.EventHandler(),
		"SelectionChanging": new System.EventHandler(),
		"SelectionChanged": new System.EventHandler()
	};
	
	this.Columns =
	{
		"NativeObject": null,
		
		// # of predefined columns; e.g. add/remove column, row ordering column, etc.
		"_predefinedColumnsCount": 1,
		
		"Count": function()
		{
			return this.NativeObject.ColumnHeaderElement.children.length - this._predefinedColumnsCount;
		},
		"GetByIndex": function(index)
		{
			var col = this.NativeObject.ColumnHeaderElement.children[index + this._predefinedColumnsCount];
			var column = new ListViewColumn();
			column.ID = col.getAttribute("data-id");
			column.Title = col.children[0].innerHTML;
			column.ItemTemplate = col.children[1].innerHTML;
			return column;
		}
	};
	this.Columns.NativeObject = this;
	
	this.Rows =
	{
		"NativeObject": null,
		"Count": function()
		{
			return this.NativeObject.ItemsElement.children.length;
		},
		"Remove": function(row)
		{
			this.NativeObject.ItemsElement.removeChild(row.ParentElement);
		},
		"RemoveAt": function(index)
		{
			this.NativeObject.ItemsElement.removeChild(this.NativeObject.ItemsElement.children[index]);
			this.NativeObject.Refresh();
		}
	};
	this.Rows.NativeObject = this;
	
	this.SelectedRows =
	{
		"NativeObject": null,
		"Clear": function()
		{
			var changed = false;
			for (var i = 0; i < this.NativeObject.ItemsElement.children.length; i++)
			{
				if (System.ClassList.Contains(this.NativeObject.ItemsElement.children[i], "Selected"))
				{
					changed = true;
					break;
				}
			}
			if (!changed) return;
			
			this.NativeObject.EventHandlers.SelectionChanging.Execute();
			for (var i = 0; i < this.NativeObject.ItemsElement.children.length; i++)
			{
				System.ClassList.Remove(this.NativeObject.ItemsElement.children[i], "Selected");
			}
			this.NativeObject.EventHandlers.SelectionChanged.Execute();
		},
		"AddRange": function(indices)
		{
			var changed = false;
			for (var i = 0; i < indices.length; i++)
			{
				if (!System.ClassList.Contains(this.NativeObject.ItemsElement.children[indices[i]], "Selected"))
				{
					changed = true;
					break;
				}
			}
			if (!changed) return;
			
			this.NativeObject.EventHandlers.SelectionChanging.Execute();
			for (var i = 0; i < indices.length; i++)
			{
				System.ClassList.Add(this.NativeObject.ItemsElement.children[indices[i]], "Selected");
			}
			this.NativeObject.EventHandlers.SelectionChanged.Execute();
		},
		"RemoveRange": function(indices)
		{
			var changed = false;
			for (var i = 0; i < indices.length; i++)
			{
				if (System.ClassList.Contains(this.NativeObject.ItemsElement.children[indices[i]], "Selected"))
				{
					changed = true;
					break;
				}
			}
			if (!changed) return;
			
			this.NativeObject.EventHandlers.SelectionChanging.Execute();
			for (var i = 0; i < indices.length; i++)
			{
				System.ClassList.Remove(this.NativeObject.ItemsElement.children[indices[i]], "Selected");
			}
			this.NativeObject.EventHandlers.SelectionChanged.Execute();
		},
		"Add": function(index)
		{
			this.AddRange([index]);
		},
		"Remove": function(index)
		{
			this.RemoveRange([index]);
		},
		"Count": function()
		{
			return this.Get().length;
		},
		"Get": function()
		{
			var items = new Array();
			for (var i = 0; i < this.NativeObject.ItemsElement.children.length; i++)
			{
				if (System.ClassList.Contains(this.NativeObject.ItemsElement.children[i], "Selected"))
				{
					items.push(new ListViewItem(this, i));
				}
			}
			return items;
		},
		"ContainsIndex": function(index)
		{
			return System.ClassList.Contains(this.NativeObject.ItemsElement.children[index], "Selected");
		},
		"Toggle": function(index)
		{
			if (this.ContainsIndex(index))
			{
				this.Remove(index);
			}
			else
			{
				this.Add(index);
			}
		},
		"ToggleRange": function(indices)
		{
			for (var i = 0; i < indices.length; i++)
			{
				this.Toggle(indices[i]);
			}
		}
	};
	this.SelectedRows.NativeObject = this;

	/*
	if (parentElement.tHead != null && parentElement.tHead.rows[0] != null)
	{
		// begin : magic - do not even begin to attempt to understand this logic
		for (var i = 0; i < parentElement.tHead.rows[0].cells.length; i++)
		{
			if (parentElement.tHead.rows[0].cells[i].childNodes[0].className == "CheckBox")
			{
				(function(i)
				{
					parentElement.tHead.rows[0].cells[i].childNodes[1].addEventListener("change", function(e)
					{
						for (var j = 0; j < parentElement.tBodies[0].rows.length; j++)
						{
							parentElement.tBodies[0].rows[j].cells[i].childNodes[0].NativeObject.SetChecked(parentElement.tHead.rows[0].cells[i].childNodes[0].NativeObject.GetChecked());
						}
					});
				})(i);
			}
		}
		// end : magic
	}
	*/
	
	this.ParentElement.addEventListener("mousedown", function(e)
	{
		this.NativeObject.SelectedRows.Clear();
		// e.preventDefault();
		// e.stopPropagation();
		return false;
	});
	
	this.Refresh();
}
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("ListView");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new ListView(items[i]);
	}
});
