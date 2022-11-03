using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	[ParseChildren(true)]
	public class MenuItem
	{
		public string ID { get; set; } = null;
		public string TargetURL { get; set; } = null;
		public string Text { get; set; } = null;
		public bool Visible { get; set; } = true;

		public MenuItem.MenuItemCollection Items { get; } = new MenuItemCollection();

		internal virtual System.Web.UI.Control Render()
		{
			System.Web.UI.HtmlControls.HtmlGenericControl li = new System.Web.UI.HtmlControls.HtmlGenericControl("li");
			li.AddCssClass("uwt-visible");

			System.Web.UI.HtmlControls.HtmlAnchor a = new System.Web.UI.HtmlControls.HtmlAnchor();
			a.InnerHtml = Text;
			if (TargetURL != null)
			{
				a.HRef = TargetURL;
			}
			li.Controls.Add(a);

			if (Items.Count > 0)
			{
				Menu menu = new Menu();
				for (int i = 0; i < Items.Count; i++)
				{
					menu.Items.Add(Items[i]);
				}
				li.Controls.Add(menu);
			}
			return li;
		}

		public class MenuItemCollection
			: System.Collections.ObjectModel.Collection<MenuItem>
		{
		}
	}
	public class SeparatorMenuItem : MenuItem
	{
		internal override Control Render()
		{
			System.Web.UI.HtmlControls.HtmlGenericControl li = new System.Web.UI.HtmlControls.HtmlGenericControl("li");
			li.AddCssClass("uwt-visible");
			li.AddCssClass("uwt-separator");
			return li;
		}
	}
	public class Menu : System.Web.UI.WebControls.WebControl
	{
		public MenuItem.MenuItemCollection Items { get; } = new MenuItem.MenuItemCollection();

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Ul;
<<<<<<< HEAD
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
=======

		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
			CssClass = "uwt-menu";

			for (int i = 0; i < Items.Count; i++)
			{
				System.Web.UI.Control ctl = Items[i].Render();
				Controls.Add(ctl);
			}
<<<<<<< HEAD

			base.RenderBeginTag(writer);
=======
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
		}
	}
}