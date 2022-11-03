using System;
using System.Web;
using MBS.Framework;

namespace MBS.Web.TestProject
{
	public class Global : HttpApplication
	{
		protected void Application_Start()
		{
			Framework.Application.Instance = new WebApplication("MBS.Web.TestProject");

			Framework.Application.Instance.Commands.Add(new Command("CreateObject", "Create New Object"));
			Framework.Application.Instance.Commands.Add(new Command("HelpAbout", "About Web Framework"));

			Framework.Application.Instance.Commands["HelpAbout"].ImageFileName = "~/Images/Commands/HelpAbout.png";

			Framework.Application.Instance.AttachCommandEventHandler("HelpAbout", delegate (object sender, EventArgs e)
			{

			});
		}
	}
}
