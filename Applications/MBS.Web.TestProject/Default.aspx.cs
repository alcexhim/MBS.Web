using System;
using System.Configuration;
using System.Web;
using System.Web.UI;

namespace MBS.Web.TestProject
{

	public partial class Default : System.Web.UI.Page
	{
		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);

			this.InitializeUWT("Office2016");
			// this.InitializeUWT("Avondale");
			this.RegisterScript("~/Default.aspx.js");

			lblApplicationTitle.Text = ConfigurationManager.AppSettings["Application.Title"];
		}

		public void button1Clicked(object sender, EventArgs args)
		{
			button1.Text = "You clicked me";
		}
	}
}
