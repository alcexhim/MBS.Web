using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class Window : Panel
	{
<<<<<<< HEAD
		public bool FooterVisible { get; set; } = true;

=======
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-window");
			this.AddCssClass("uwt-popup");
<<<<<<< HEAD
			if (!FooterVisible)
			{
				this.AddCssClass("uwt-footer-hidden");
			}
=======
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2

			base.RenderBeginTag(writer);
		}
	}
}
