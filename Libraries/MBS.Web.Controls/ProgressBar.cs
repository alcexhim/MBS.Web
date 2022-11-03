using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class ProgressBar : System.Web.UI.WebControls.Panel
	{
		public int Minimum { get; set; } = 0;
		public int Maximum { get; set; } = 100;
		public int Value { get; set; } = 0;
		public bool Marquee { get; set; } = false;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-progressbar");
			this.Attributes.Add("data-minimum", Minimum.ToString());
			this.Attributes.Add("data-maximum", Maximum.ToString());
			this.Attributes.Add("data-value", Value.ToString());
			this.Attributes.Add("data-marquee", (Marquee ? "true" : "false"));

			base.RenderBeginTag(writer);

			writer.WriteLine("<div class=\"uwt-progressbar-value\">&nbsp;</div>");
		}
	}
}