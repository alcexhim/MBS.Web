function Calendar(parentElement)
{
	parentElement.__value = (new Date()).toLocaleString();
	this.ParentElement = parentElement;
	this.SelectionChanged = new System.EventHandler();
	
	this.GetValue = function()
	{
		// wow I can't believe Date.parse is this stupid
		var num = Date.parse(this.ParentElement.__value);
		var date = new Date();
		date.setTime(num);
		return date;
	};
	this.SetValue = function(value)
	{
		var oldvalue = this.GetValue();
		if (oldvalue == null && value == null) return;
		
		if (oldvalue == null) oldvalue = new Date();
		if (value == null) value = new Date();
		
		if (oldvalue.valueOf() == value.valueOf()) return;
		
		this.ParentElement.__value = value.toLocaleString();
		
		var tbody = this.ParentElement.children[0].children[1];
		for (var i = 0; i < tbody.rows.length; i++)
		{
			for (var j = 0; j < tbody.rows[i].cells.length; j++)
			{
				if (tbody.rows[i].cells[j].children[0].innerHTML == value.getDate())
				{
					System.ClassList.Add(tbody.rows[i].cells[j].children[0], "uwt-selected");
				}
				else
				{
					System.ClassList.Remove(tbody.rows[i].cells[j].children[0], "uwt-selected");
				}
			}
		}
		
		this.SelectionChanged.Execute(this, null);
	};
	this.GenerateCalendarElement = function()
	{
		var date = this.GetValue();
		var month = date.getMonth() + 1, day = date.getDate(), year = date.getFullYear();
		var daysInMonth = ((month == 2) ? (DateTimePicker.IsLeapYear(year) ? 29 : 28) : (month == 9 || month == 4 || month == 6 || month == 11) ? 30 : 31);
		
		var table = document.createElement("table");
		
		var thead = document.createElement("thead");
		var tr = document.createElement("tr");
		var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
		for (var i = 0; i < days.length; i++)
		{
			var th = document.createElement("th");
			th.innerHTML = days[i];
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		
		var tbody = document.createElement("tbody");
		var tr = document.createElement("tr");
		
		var dummy = new Date();
		dummy.setMonth(month - 1);
		dummy.setDate(1);
		dummy.setFullYear(year);
		
		var k = dummy.getDay();
		for (var i = 0; i < k; i++)
		{
			var td = document.createElement("td");
			
			var a = document.createElement("a");
			a.href = "#";
			td.appendChild(a);
			
			tr.appendChild(td);
		}
		for (var i = 0; i < daysInMonth; i++)
		{
			var td = document.createElement("td");
			var a = document.createElement("a");
			a.href = "#";
			
			if ((i + 1) == day)
			{
				a.className = "uwt-selected";
			}
			a.innerHTML = (i + 1).toString();
			a.NativeObject = this;
			a.addEventListener("click", function(e)
			{
				var date = this.NativeObject.GetValue();
				date.setDate(this.innerHTML);
				this.NativeObject.SetValue(date);
				
				e.preventDefault();
				e.stopPropagation();
			});
			td.appendChild(a);
			tr.appendChild(td);
			
			k++;
			if (k == 7)
			{
				k = 0;
				
				tbody.appendChild(tr);
				tr = document.createElement("tr");
			}
		}
		
		tbody.appendChild(tr);
		table.appendChild(tbody);
		return table;
	};
	
	this.ParentElement.appendChild(this.GenerateCalendarElement());
}

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-calendar");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Calendar(items[i]);
	}
});