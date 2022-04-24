using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace MBS.Web.Controls
{
	public class WunderbarPanel : System.Web.UI.WebControls.Panel
	{
		public bool Selected { get; set; } = false;
		public string Title { get; set; } = String.Empty;

		public class WunderbarPanelCollection
			: System.Collections.ObjectModel.Collection<WunderbarPanel>
		{

		}

	}

	[ParseChildren(true)]
	public class Wunderbar : System.Web.UI.WebControls.WebControl
	{

		public WunderbarPanel.WunderbarPanelCollection Items { get; } = new WunderbarPanel.WunderbarPanelCollection();
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);

			this.AddCssClass("uwt-wunderbar");

			HtmlGenericControl divContent = new HtmlGenericControl("div");
			divContent.AddCssClass("uwt-content");
			foreach (WunderbarPanel panel in Items)
			{
				panel.AddCssClass("uwt-wunderbar-content");
				if (panel.Selected)
				{
					panel.AddCssClass("uwt-visible");
				}
				divContent.Controls.Add(panel);
			}

			HtmlGenericControl divButtons = new HtmlGenericControl("div");
			divButtons.AddCssClass("uwt-wunderbar-buttons");

			HtmlGenericControl divGripper = new HtmlGenericControl("div");
			divGripper.AddCssClass("uwt-wunderbar-gripper");
			HtmlGenericControl divGripperHandle = new HtmlGenericControl("div");
			divGripperHandle.AddCssClass("uwt-gripper");
			divGripperHandle.InnerHtml = "&nbsp;";
			divGripper.Controls.Add(divGripperHandle);
			divButtons.Controls.Add(divGripper);

			HtmlGenericControl ul = new HtmlGenericControl("ul");
			foreach (WunderbarPanel panel in Items)
			{
				HtmlGenericControl li = new HtmlGenericControl("li");
				if (panel.Selected)
				{
					li.AddCssClass("uwt-selected");
				}

				HtmlAnchor a = new HtmlAnchor();
				a.InnerHtml = panel.Title;
				a.HRef = "#";
				li.Controls.Add(a);
				ul.Controls.Add(li);
			}
			divButtons.Controls.Add(ul);

			HtmlGenericControl divOverflow = new HtmlGenericControl("div");
			divOverflow.AddCssClass("uwt-wunderbar-overflow");
			divOverflow.InnerHtml = "&nbsp;";
			divButtons.Controls.Add(divOverflow);

			Controls.Add(divContent);
			Controls.Add(divButtons);
		}
	}
}
