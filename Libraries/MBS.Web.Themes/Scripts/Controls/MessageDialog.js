window.MessageDialog = 
{
	"ModalParent": null,
	"DialogParent": null,
	"Close": function()
	{
		if (MessageDialog.ModalParent !== null)
		{
			System.ClassList.Remove(MessageDialog.ModalParent, "uwt-visible");
		}
		if (MessageDialog.DialogParent !== null)
		{
			System.ClassList.Remove(MessageDialog.DialogParent, "uwt-visible");
		}
	},
	"ShowDialog": function(content, title, buttons, icon, callback)
	{
		MessageDialog.DialogParent.children[0].children[0].innerHTML = title;
		MessageDialog.DialogParent.children[1].innerHTML = content;
		MessageDialog.DialogParent.children[2].innerHTML = "";
		
		for (var i = 0; i < buttons.length; i++)
		{
			var a = document.createElement("a");
			a.className = "uwt-button";
			if (typeof(buttons[i].CssClass !== 'undefined'))
			{
				System.ClassList.Add(a, buttons[i].CssClass);
			}
			a.innerHTML = buttons[i].Text;
			a.button = buttons[i];
			a.addEventListener("click", function(e)
			{
				this.button.OnClientClick(e);
			});
			MessageDialog.DialogParent.children[2].appendChild(a);
		}
		
		System.ClassList.Add(MessageDialog.ModalParent, "uwt-visible");
		System.ClassList.Add(MessageDialog.DialogParent, "uwt-visible");
	}
};

window.addEventListener("load", function()
{
	MessageDialog.ModalParent = document.createElement("div");
	MessageDialog.ModalParent.className = "uwt-dialog-background";
	MessageDialog.ModalParent.addEventListener("mousedown", function()
	{
		MessageDialog.Close();
	});
	document.body.appendChild(MessageDialog.ModalParent);
	
	var divDialog = document.createElement("div");
	divDialog.className = "uwt-dialog uwt-messagedialog";
	
	var divDialogHeader = document.createElement("div");
	divDialogHeader.className = "uwt-header";
	
	var divDialogTitle = document.createElement("div");
	divDialogTitle.className = "uwt-dialog-title";
	divDialogHeader.appendChild(divDialogTitle);
	
	var divDialogHeaderButtons = document.createElement("div");
	divDialogHeaderButtons.className = "uwt-dialog-controlbox";
	
	var aDialogHeaderButtonsClose = document.createElement("a");
	aDialogHeaderButtonsClose.addEventListener("click", function(e)
	{
		MessageDialog.Close();
		e.stopPropagation();
	});
	aDialogHeaderButtonsClose.href = "#";
	aDialogHeaderButtonsClose.className = "uwt-dialog-controlbox-close";
	aDialogHeaderButtonsClose.innerHTML = "×";
	
	divDialogHeaderButtons.appendChild(aDialogHeaderButtonsClose);
	divDialogHeader.appendChild(divDialogHeaderButtons);
	
	divDialog.appendChild(divDialogHeader);
	
	var divDialogContent = document.createElement("div");
	divDialogContent.className = "uwt-content";
	divDialog.appendChild(divDialogContent);
	
	var divDialogFooter = document.createElement("div");
	divDialogFooter.className = "uwt-footer";
	divDialog.appendChild(divDialogFooter);
	
	MessageDialog.ModalParent.appendChild(divDialog);
	MessageDialog.DialogParent = divDialog;
	
	MessageDialog.DialogParent.addEventListener("mousedown", function(e)
	{
		e.stopPropagation();
	});
});

