using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class Window : Panel
	{
		public bool FooterVisible { get; set; } = true;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-window");
			this.AddCssClass("uwt-popup");
			if (!FooterVisible)
			{
				this.AddCssClass("uwt-footer-hidden");
			}

			base.RenderBeginTag(writer);
		}
	}
}
