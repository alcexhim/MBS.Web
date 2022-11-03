function ProgressBar(nativeHandle)
{
    this.NativeHandle = nativeHandle;
    
    this.SetMarquee = function(value)
    {
        if (value)
        {
            System.ClassList.Add(this.NativeHandle, "uwt-progressbar-marquee");
        }
        else
        {
            System.ClassList.Remove(this.NativeHandle, "uwt-progressbar-marquee");
        }
    };
    
    this.GetMinimum = function()
    {
        return this._Minimum;
    };
    this.SetMinimum = function(value)
    {
        this._Minimum = value;
    };
    this.GetMaximum = function()
    {
        return this._Maximum;
    };
    this.SetMaximum = function(value)
    {
        this._Maximum = value;
    };
    this.GetValue = function()
    {
        return this._Value;
    };
    this.SetValue = function(value)
    {
        this._Value = value;
        this.NativeHandle.children[0].style.width = ((this._Value / (this._Maximum - this._Minimum)) * 100) + "%";
    };
    
    if (nativeHandle.hasAttribute("data-minimum")) this.SetMinimum(nativeHandle.getAttribute("data-minimum"));
    if (nativeHandle.hasAttribute("data-maximum")) this.SetMaximum(nativeHandle.getAttribute("data-maximum"));
    if (nativeHandle.hasAttribute("data-value")) this.SetValue(nativeHandle.getAttribute("data-value"));
    if (nativeHandle.hasAttribute("data-marquee")) this.SetMarquee(nativeHandle.getAttribute("data-marquee") == "true");
}

window.addEventListener("load", function()
{
    var items = document.getElementsByClassName("uwt-progressbar");
    for (var i = 0; i < items.length; i++)
    {
        items[i].Handle = new ProgressBar(items[i]);
    }
});