using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	[ParseChildren(true)]
	public class Panel : System.Web.UI.WebControls.Panel
	{
		public string Title { get; set; } = String.Empty;

		public System.Web.UI.WebControls.Panel HeaderControls { get; } = new System.Web.UI.WebControls.Panel();
		public System.Web.UI.WebControls.Panel ContentControls { get; } = new System.Web.UI.WebControls.Panel();
		public System.Web.UI.WebControls.Panel FooterControls { get; } = new System.Web.UI.WebControls.Panel();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			if (HeaderControls.Controls.Count > 0 || !String.IsNullOrEmpty(Title))
			{
				HeaderControls.AddCssClass("uwt-panel-header");
				Controls.Add(HeaderControls);
			}

			ContentControls.AddCssClass("uwt-panel-content");
			Controls.Add(ContentControls);

			FooterControls.AddCssClass("uwt-panel-footer");
			Controls.Add(FooterControls);

			this.AddCssClass("uwt-panel");

			base.RenderBeginTag(writer);

			System.Web.UI.WebControls.Label lblTitleBar = new System.Web.UI.WebControls.Label();
			lblTitleBar.Text = Title;
			HeaderControls.Controls.Add(lblTitleBar);
		}
	}
}