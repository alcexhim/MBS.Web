using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	[ParseChildren(true)]
	public class ActionPreviewButton : System.Web.UI.WebControls.Panel
	{
		public string Text { get; set; } = String.Empty;
		public string TargetUrl { get; set; } = String.Empty;

		public System.Web.UI.WebControls.Panel PreviewContent { get; } = new System.Web.UI.WebControls.Panel();

		// public MenuItem.MenuItemCollection MenuItems { get; } = new MenuItem.MenuItemCollection();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-actionpreviewbutton");
			this.AddCssClass("apb-display-text");
			this.AddCssClass("apb-display-ellipsis");

			System.Web.UI.HtmlControls.HtmlAnchor aText = new System.Web.UI.HtmlControls.HtmlAnchor();
			aText.HRef = String.IsNullOrEmpty(TargetUrl) ? "#" : TargetUrl;
			aText.InnerText = Text;
			aText.AddCssClass("apb-text");

			this.Controls.Add(aText);

			System.Web.UI.HtmlControls.HtmlAnchor btn = new System.Web.UI.HtmlControls.HtmlAnchor();
			btn.HRef = "#";
			btn.AddCssClass("apb-button");
			this.Controls.Add(btn);

			System.Web.UI.WebControls.Panel pnlContent = new System.Web.UI.WebControls.Panel();
			pnlContent.AddCssClass("apb-preview uwt-popup");

			System.Web.UI.WebControls.Panel pnlMenuItems = new System.Web.UI.WebControls.Panel();
			pnlMenuItems.AddCssClass("apb-actions");
			pnlContent.Controls.Add(pnlMenuItems);

			PreviewContent.AddCssClass("apb-content");
			pnlContent.Controls.Add(PreviewContent);

			this.Controls.Add(pnlContent);

			base.RenderBeginTag(writer);
		}
	}
}
