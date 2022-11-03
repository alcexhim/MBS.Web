using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class Slider : System.Web.UI.WebControls.WebControl
	{
		public int Minimum { get; set; } = 0;
		public int Maximum { get; set; } = 100;
		public int Value { get; set; } = 0;
		public int Step { get; set; } = 1;

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);

			this.AddCssClass("uwt-slider");

			Attributes.Add("data-tooltip-anchor", "child,0,1");
			Attributes.Add("data-tooltip-content", Value.ToString());
			Attributes.Add("data-tooltip-delay", "0");
			Attributes.Add("data-minimum", Minimum.ToString());
			Attributes.Add("data-maximum", Maximum.ToString());
			Attributes.Add("data-value", Value.ToString());
			Attributes.Add("data-step", Step.ToString());
		}

		private double GetDecimalValue()
		{
			return (double)Value / (double)(Maximum - Minimum);
		}
		private int GetPercentValue()
		{
			return (int)(GetDecimalValue() * 100);
		}

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			base.RenderBeginTag(writer);

			writer.Write("<div class=\"uwt-slider-bar\">");
			writer.Write("<div class=\"uwt-slider-selection\" style=\"width: {0}%\">", GetPercentValue());
			writer.Write("</div>");
			writer.Write("<div class=\"uwt-slider-button\" style=\"left: {0}%\">&nbsp;</div>", GetPercentValue());
		}
		public override void RenderEndTag(HtmlTextWriter writer)
		{
			writer.Write("</div>");

			base.RenderEndTag(writer);
		}
	}
}
