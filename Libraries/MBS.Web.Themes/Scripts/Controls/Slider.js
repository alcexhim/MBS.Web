Slider.DraggingSlider = null;

function Slider(parentElement)
{
	this.ParentElement = parentElement;
	
	this.SelectionElement = this.ParentElement.children[0].children[0];
	this.ButtonElement = this.ParentElement.children[0].children[1];
	
	this.GetMaximum = function()
	{
		return this.ParentElement.attributes["data-maximum"].value;
	};
	this.GetMinimum = function()
	{
		return this.ParentElement.attributes["data-minimum"].value;
	};
	this.GetStep = function()
	{
		if (typeof(this.ParentElement.attributes["data-step"]) !== 'undefined')
		{
			return this.ParentElement.attributes["data-step"].value;
		}
		return null;
	};
	this.SetMaximum = function(value)
	{
		this.ParentElement.attributes["data-maximum"].value = value;
		this.Update();
	};
	this.SetMinimum = function(value)
	{
		this.ParentElement.attributes["data-minimum"].value = value;
		this.Update();
	};
	this.SetStep = function(value)
	{
		if (value === null)
		{
			this.ParentElement.removeAttribute("data-step");
		}
		else
		{
			this.ParentElement.attributes["data-step"] = value;
		}
	};
	
	this.GetDecimalValue = function()
	{
		return (this.GetValue() / (this.GetMaximum() - this.GetMinimum()));
	};
	this.GetPercentValue = function()
	{
		return (this.GetDecimalValue() * 100);
	};
	
	this.GetValue = function()
	{
		return this.ParentElement.attributes["data-value"].value;
	};
	this.SetValue = function(value)
	{
		if (value >= this.GetMaximum())
		{
			value = this.GetMaximum();
		}
		else if (value <= this.GetMinimum())
		{
			value = this.GetMinimum();
		}
		
		var step = this.GetStep();
		if (step != null)
		{
			value = Math.round(value / step) * step;
		}
		
		this.ParentElement.attributes["data-value"].value = value;
		this.ParentElement.attributes["data-tooltip-content"].value = value;
		this.Update();
	};
	
	this.Update = function()
	{
		this.SelectionElement.style.width = this.GetPercentValue() + "%";
		this.ButtonElement.style.left = this.GetPercentValue() + "%";
	};
	
	this.ButtonElement.NativeObject = this;
	this.ButtonElement.addEventListener("mousedown", function(e)
	{
		System.ClassList.Add(this.NativeObject.ParentElement, "uwt-disable-animation");
		
		ToolTip.InhibitAutoHide = true;
		ToolTip.Show(this.NativeObject.ParentElement, this.NativeObject.GetValue());
		
		Slider.DraggingSlider = this.NativeObject;
		Slider.DragStartX = e.x;
		Slider.ButtonStartX = this.NativeObject.ButtonElement.offsetLeft;
	});
	
	this.ParentElement.addEventListener("mousedown", function(e)
	{
		var value = (((e.x - this.offsetLeft) / this.offsetWidth) * (this.NativeObject.GetMaximum() - this.NativeObject.GetMinimum()));
		this.NativeObject.SetValue(value);
	});
}

window.addEventListener("load", function()
{
	var items = document.getElementsByClassName("uwt-slider");
	for (var i = 0; i < items.length; i++)
	{
		items[i].NativeObject = new Slider(items[i]);
	}
});
window.addEventListener("mouseup", function(e)
{
	ToolTip.InhibitAutoHide = false;
	ToolTip.Hide();
	
	if (Slider.DraggingSlider !== null)
	{
		System.ClassList.Remove(Slider.DraggingSlider.ParentElement, "uwt-disable-animation");
	}
	Slider.DraggingSlider = null;
});
window.addEventListener("mousemove", function(e)
{
	if (Slider.DraggingSlider != null)
	{
		var value = ((Slider.ButtonStartX + (e.x - Slider.DragStartX)) / Slider.DraggingSlider.ParentElement.offsetWidth) * (Slider.DraggingSlider.GetMaximum() - Slider.DraggingSlider.GetMinimum());
		Slider.DraggingSlider.SetValue(value);
		
		ToolTip.Show(Slider.DraggingSlider.ParentElement, Slider.DraggingSlider.GetValue());
	}
});