function Countdown(parentElement)
{
	this.ParentElement = parentElement;
	this.ParentElement.addEventListener("contextmenu", function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	this.mvarTargetYear = parentElement.getAttribute("data-target-year");
	this.get_TargetYear = function() { return this.mvarTargetYear; };
	this.set_TargetYear = function(value) { this.mvarTargetYear = value; };
	
	this.mvarTargetMonth = parentElement.getAttribute("data-target-month");
	this.get_TargetMonth = function() { return this.mvarTargetMonth; };
	this.set_TargetMonth = function(value) { this.mvarTargetMonth = value; };
	
	this.mvarTargetDay = parentElement.getAttribute("data-target-day");
	this.get_TargetDay = function() { return this.mvarTargetDay; };
	this.set_TargetDay = function(value) { this.mvarTargetDay = value; };
	
	this.mvarTargetHour = parentElement.getAttribute("data-target-hour");
	this.get_TargetHour = function() { return this.mvarTargetHour; };
	this.set_TargetHour = function(value) { this.mvarTargetHour = value; };
	
	this.mvarTargetMinute = parentElement.getAttribute("data-target-minute");
	this.get_TargetMinute = function() { return this.mvarTargetMinute; };
	this.set_TargetMinute = function(value) { this.mvarTargetMinute = value; };
	
	this.mvarTargetSecond = parentElement.getAttribute("data-target-second");
	this.get_TargetSecond = function() { return this.mvarTargetSecond; };
	this.set_TargetSecond = function(value) { this.mvarTargetSecond = value; };
	
	this.get_Year = function()
	{
		return parseInt(this.ParentElement.children[0].children[0].innerHTML);
	};
	this.set_Year = function(value)
	{
		this.ParentElement.children[0].children[0].innerHTML = value.toString();
	};
	this.get_Month = function()
	{
		return parseInt(this.ParentElement.children[1].children[0].innerHTML);
	};
	this.set_Month = function(value)
	{
		this.ParentElement.children[1].children[0].innerHTML = value.toString();
	};
	this.get_Day = function()
	{
		return parseInt(this.ParentElement.children[2].children[0].innerHTML);
	};
	this.set_Day = function(value)
	{
		this.ParentElement.children[2].children[0].innerHTML = value.toString();
	};
	this.get_Hour = function()
	{
		return parseInt(this.ParentElement.children[3].children[0].innerHTML);
	};
	this.set_Hour = function(value)
	{
		this.ParentElement.children[3].children[0].innerHTML = value.toString();
	};
	this.get_Minute = function()
	{
		return parseInt(this.ParentElement.children[4].children[0].innerHTML);
	};
	this.set_Minute = function(value)
	{
		this.ParentElement.children[4].children[0].innerHTML = value.toString();
	};
	this.get_Second = function()
	{
		return parseInt(this.ParentElement.children[5].children[0].innerHTML);
	};
	this.set_Second = function(value)
	{
		this.ParentElement.children[5].children[0].innerHTML = value.toString();
	};
	
	var thiss = this;
	this._timer = null;
	this._timer_Tick = function()
	{
		if (thiss.get_Second() == 0)
		{
			if (thiss.get_Minute() == 0)
			{
				if (thiss.get_Hour() == 0)
				{
					if (thiss.get_Day() == 0)
					{
						if (thiss.get_Month() == 0)
						{
							if (thiss.get_Year() == 0)
							{
								// everything is 0 so we can stop
								thiss.Stop();
								return;
							}
							else
							{
								thiss.set_Year(thiss.get_Year() - 1);
							}
						}
						else
						{
							thiss.set_Month(thiss.get_Month() - 1);
						}
						
						// TODO: figure out how many days are left for this month... probably using target date
						thiss.set_Day(31);
					}
					else
					{
						thiss.set_Day(thiss.get_Day() - 1);
					}
					thiss.set_Hour(23);
				}
				else
				{
					thiss.set_Hour(thiss.get_Hour() - 1);
				}
				thiss.set_Minute(59);
			}
			else
			{
				thiss.set_Minute(thiss.get_Minute() - 1);
			}
			thiss.set_Second(59);
		}
		else
		{
			thiss.set_Second(thiss.get_Second() - 1);
		}
		thiss._timer = window.setTimeout(thiss._timer_Tick, 1000);
	};
	
	this.Stop = function()
	{
		if (this._timer == null) return;
		window.clearTimeout(this._timer);
	};
	this.Start = function()
	{
		this._timer = window.setTimeout(this._timer_Tick, 1000);
	};
	
	var date = new Date();
	var targetDate = new Date(this.get_TargetYear(), this.get_TargetMonth(), this.get_TargetDay(), this.get_TargetHour(), this.get_TargetMinute(), this.get_TargetSecond());
	
	this.set_Year(targetDate.getFullYear() - date.getFullYear());
	this.set_Month((targetDate.getMonth() - date.getMonth()) + 1);
	this.set_Day(targetDate.getDate() - date.getDate());
	this.set_Hour(date.getHours() - targetDate.getHours());
	this.set_Minute(date.getMinutes() - targetDate.getMinutes());
	this.set_Second(date.getSeconds() - targetDate.getSeconds());
	
	this.Start();
}
window.addEventListener("load", function(e)
{
	var items = document.getElementsByClassName("Countdown");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Countdown(items[i]);
	}
});