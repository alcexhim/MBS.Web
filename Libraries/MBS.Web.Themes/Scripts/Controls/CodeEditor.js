window.addEventListener("load", function(e)
{
	var CodeEditors = document.getElementsByTagName("textarea");
	for(var i = 0; i < CodeEditors.length; i++)
	{
		if (CodeEditors[i].className == "CodeEditor")
		{
			CodeEditors[i].NativeEditor = CodeMirror.fromTextArea(CodeEditors[i],
			{
				mode: CodeEditors[i].attributes["data-mode"].value
			});
		}
	}
});
