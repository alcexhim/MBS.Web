using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class TabPage : System.Web.UI.WebControls.Panel
	{
		public class TabPageCollection
			: System.Collections.ObjectModel.Collection<TabPage>
		{
		}

		public string Title { get; set; } = String.Empty;
	}

	public class TabContainer : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public TabPage SelectedPage { get; set; } = null;
		public TabPage.TabPageCollection TabPages { get; } = new TabPage.TabPageCollection();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-tabcontainer");

			if (SelectedPage == null && TabPages.Count > 0)
				SelectedPage = TabPages[0];

			System.Web.UI.HtmlControls.HtmlGenericControl ul = new System.Web.UI.HtmlControls.HtmlGenericControl("ul");
			ul.AddCssClass("uwt-tabcontainer-tabs");

			foreach (TabPage page in TabPages)
			{
				System.Web.UI.HtmlControls.HtmlGenericControl li = new System.Web.UI.HtmlControls.HtmlGenericControl("li");
				li.AddCssClass("uwt-visible");
				if (page == SelectedPage)
					li.AddCssClass("uwt-selected");

				System.Web.UI.HtmlControls.HtmlAnchor a = new System.Web.UI.HtmlControls.HtmlAnchor();
				a.HRef = "#";
				a.InnerText = page.Title;
				li.Controls.Add(a);
				ul.Controls.Add(li);
			}
			this.Controls.Add(ul);

			System.Web.UI.HtmlControls.HtmlGenericControl div = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			div.AddCssClass("uwt-tabcontainer-tabpages");

			foreach (TabPage page in TabPages)
			{
				page.AddCssClass("uwt-tabpage");
				if (page == SelectedPage)
				{
					page.AddCssClass("uwt-selected");
				}
				div.Controls.Add(page);
			}

			this.Controls.Add(div);

			base.RenderBeginTag(writer);
		}
	}
}
