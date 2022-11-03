window.addEventListener("load", function(e)
{
	
	window.addEventListener("contextmenu", function(ee)
	{
		// alert(System.Screen.Size.GetHeight());
		document.getElementById("cmnu1_popup").NativeObject.Show(ee.clientX, ee.clientY);
	});
	
	/*
	var wunderbar = document.getElementById("wunderbar").NativeObject;
	var stack = document.getElementById("stack").NativeObject;
	wunderbar.SelectionChanged.Add(function(sender, e)
	{
		stack.SwitchToIndex(e.Index);
	});
	*/
});