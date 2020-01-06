function SlideContainer(parentElement)
{
	this.ParentElement = parentElement;
	
	this.mvarCurrentPageIndex = 0;
	this.GetPageCount = function()
	{
		return this.ParentElement.children.length;
	};
	this.ScrollDown = function()
	{
		if (this.mvarCurrentPageIndex < this.GetPageCount() - 1)
		{
			this.mvarCurrentPageIndex++;
			this.Update();
		}
	};
	this.ScrollUp = function()
	{
		if (this.mvarCurrentPageIndex > 0)
		{
			this.mvarCurrentPageIndex--;
			this.Update();
		}
	};
	/*
	this._animationFrame = 0;
	this._animationStop = 0;
	this._animateFrame = function(frame)
	{
		var startFrame = (document.body.scrollHeight * (this.mvarCurrentPageIndex - 1)) * frame;
		var endFrame = (document.body.scrollHeight * this.mvarCurrentPageIndex) * frame;
		
		window.scrollTo("100%", endFrame - startFrame);
		if (frame < 1.0)
		{
			window.setTimeout(function(p, f)
			{
				p._animateFrame(f + 0.01);
			}, 10, this, frame);
		}
	};
	*/
	this.Update = function()
	{
		// this._animationStop = document.body.scrollHeight * this.mvarCurrentPageIndex;
		// this._animateFrame(0.0);
		window.scrollTo("100%", (document.body.scrollHeight * this.mvarCurrentPageIndex));
	};
}
SlideContainer.Create = function(element)
{
	if (!System.ClassList.Contains(element, "SlideContainer")) return null;
	return new SlideContainer(element);
};

window.addEventListener("load", function(e)
{
	window.SlideContainer = SlideContainer.Create(document.body);
	if (window.SlideContainer != null)
	{
		window.addEventListener("DOMMouseScroll", function(ee)
		{
			if (ee.detail > 0)
			{
				// scroll down
				ee.preventDefault();
				ee.stopPropagation();
				
				window.SlideContainer.ScrollDown();
				return false;
			}
			else if (ee.detail < 0)
			{
				// scroll up
				ee.preventDefault();
				ee.stopPropagation();
				
				window.SlideContainer.ScrollUp();
				return false;
			}
		});
	}
});