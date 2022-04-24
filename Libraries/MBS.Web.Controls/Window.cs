using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class Window : Panel
	{
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-window");
			this.AddCssClass("uwt-popup");

			base.RenderBeginTag(writer);
		}
	}
}
