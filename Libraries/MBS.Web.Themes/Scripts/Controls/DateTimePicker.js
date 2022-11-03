function DateTimePicker(parentElement)
{
	this.ParentElement = parentElement;
	this.TextBoxElement = this.ParentElement.children[0];
	this.PopupElement = this.ParentElement.children[1];
	this.CalendarElement = this.PopupElement.children[0];
	
	this.TextBoxElement.NativeObject = this;
	this.TextBoxElement.addEventListener("focus", function(e)
	{
		this.NativeObject.ShowPopup();
	});
	this.TextBoxElement.addEventListener("blur", function(e)
	{
		this.NativeObject.HidePopup();
	});
	this.TextBoxElement.addEventListener("keydown", function(e)
	{
		switch (e.keyCode)
		{
			case 40:
			{
				this.NativeObject.ShowPopup();
				
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		}
	});
	
	this.GetValue = function()
	{
		// wow I can't believe Date.parse is this stupid
		if (this.TextBoxElement.value == "")
		{
			return null;
		}
		var num = Date.parse(this.TextBoxElement.value);
		var date = new Date();
		date.setTime(num);
		return date;
	};
	this.SetValue = function(value)
	{
		this.TextBoxElement.value = value.toLocaleString();
		
		var tbody = this.CalendarElement.children[0].children[1];
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
	};
	
	this.ShowPopup = function()
	{
		this.CalendarElement.NativeObject.SelectionChanged.Clear();
		
		this.CalendarElement.NativeObject.SetValue(this.GetValue());
		
		var _this = this;
		this.CalendarElement.NativeObject.SelectionChanged.Add(function(sender, e)
		{
			_this.SetValue(sender.GetValue());
			_this.TextBoxElement.focus();
			System.ClassList.Remove(_this.PopupElement, "uwt-visible");
		});
		
		System.ClassList.Add(this.PopupElement, "uwt-visible");
	};
	this.HidePopup = function()
	{
		System.ClassList.Remove(this.PopupElement, "uwt-visible");
	};
}
DateTimePicker.IsLeapYear = function(year)
{
	// thanks https://stackoverflow.com/questions/725098/leap-year-calculation
	return (((year % 4 === 0) && (year % 100 !== 0))
		|| (year % 400 === 0));
};

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-datetimepicker");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new DateTimePicker(items[i]);
	}
});