using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class StackPage : System.Web.UI.WebControls.Panel
	{
		public class StackPageCollection
			: System.Collections.ObjectModel.Collection<StackPage>
		{

		}

		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);
			this.AddCssClass("uwt-stack-page");
		}
	}

	[ParseChildren(true)]
	public class StackContainer : System.Web.UI.WebControls.WebControl
	{
		public string SelectedItemID { get; set; } = null;
		public StackPage.StackPageCollection Items { get; } = new StackPage.StackPageCollection();

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);
			this.AddCssClass("uwt-stack-container");

			foreach (StackPage page in Items)
			{
				if (SelectedItemID == page.ID)
				{
					page.AddCssClass("uwt-visible");
				}
				Controls.Add(page);
			}
		}
	}
}
