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

		public MenuItem.MenuItemCollection MenuItems { get; } = new MenuItem.MenuItemCollection();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-actionpreviewbutton");
			this.AddCssClass("apb-display-text");
			this.AddCssClass("apb-display-ellipsis");

			System.Web.UI.HtmlControls.HtmlAnchor aText = new System.Web.UI.HtmlControls.HtmlAnchor();
			aText.HRef = String.IsNullOrEmpty(TargetUrl) ? "#" : TargetUrl;
			aText.AddCssClass("apb-text");

			System.Web.UI.HtmlControls.HtmlGenericControl spanIcon = new System.Web.UI.HtmlControls.HtmlGenericControl();
			spanIcon.AddCssClass("uwt-icon");
			aText.Controls.Add(spanIcon);

			System.Web.UI.HtmlControls.HtmlGenericControl spanText = new System.Web.UI.HtmlControls.HtmlGenericControl();
			spanText.AddCssClass("uwt-text");
			spanText.InnerText = Text;
			aText.Controls.Add(spanText);

			this.Controls.Add(aText);

			System.Web.UI.HtmlControls.HtmlAnchor btn = new System.Web.UI.HtmlControls.HtmlAnchor();
			btn.HRef = "#";
			btn.AddCssClass("apb-button");
			this.Controls.Add(btn);

			System.Web.UI.WebControls.Panel pnlContent = new System.Web.UI.WebControls.Panel();

			pnlContent.AddCssClass("apb-preview uwt-popup uwt-loading");

			System.Web.UI.HtmlControls.HtmlGenericControl divLoading = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			divLoading.AddCssClass("uwt-spinner");

			pnlContent.Controls.Add(divLoading);

			pnlContent.AddCssClass("apb-preview uwt-popup");

			System.Web.UI.WebControls.Panel pnlMenuItems = new System.Web.UI.WebControls.Panel();
			pnlMenuItems.AddCssClass("apb-actions");

			System.Web.UI.HtmlControls.HtmlGenericControl h2 = new System.Web.UI.HtmlControls.HtmlGenericControl("h2");
			h2.InnerHtml = "Actions";
			pnlMenuItems.Controls.Add(h2);

			System.Web.UI.HtmlControls.HtmlGenericControl ul = new System.Web.UI.HtmlControls.HtmlGenericControl("ul");
			ul.AddCssClass("uwt-menu");

			foreach (MenuItem menuItem in MenuItems)
			{
				System.Web.UI.HtmlControls.HtmlGenericControl li = new System.Web.UI.HtmlControls.HtmlGenericControl("li");
				li.AddCssClass("uwt-visible uwt-menu-item-popup");

				System.Web.UI.HtmlControls.HtmlAnchor a = new System.Web.UI.HtmlControls.HtmlAnchor();
				a.HRef = menuItem.TargetURL;
				a.InnerHtml = menuItem.Text;
				li.Controls.Add(a);

				// currently support only 1 level of submenu, like pleasanton
				Menu menu = new Menu();

				if (menuItem.Items.Count > 0)
				{
					foreach (MenuItem menuItemSub in menuItem.Items)
					{
						menu.Items.Add(menuItemSub);
					}
					li.Controls.Add(menu);
				}

				ul.Controls.Add(li);
			}

			pnlMenuItems.Controls.Add(ul);

			pnlContent.Controls.Add(pnlMenuItems);

			PreviewContent.AddCssClass("apb-content");
			pnlContent.Controls.Add(PreviewContent);

			System.Web.UI.HtmlControls.HtmlGenericControl divGripper = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			divGripper.AddCssClass("uwt-gripper");
			pnlContent.Controls.Add(divGripper);

			System.Web.UI.HtmlControls.HtmlGenericControl aClose = new System.Web.UI.HtmlControls.HtmlGenericControl("a");
			aClose.AddCssClass("uwt-button uwt-button-close");
			pnlContent.Controls.Add(aClose);

			this.Controls.Add(pnlContent);

			base.RenderBeginTag(writer);
		}
	}
}
