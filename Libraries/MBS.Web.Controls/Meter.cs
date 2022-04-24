using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public enum MeterDisplayStyle
	{
		None,
		Decimal,
		Percent
	}
	public class Meter : System.Web.UI.WebControls.WebControl
	{
		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);

			this.AddCssClass("uwt-meter");

			Attributes.Add("data-minimum-value", Minimum.ToString());
			Attributes.Add("data-maximum-value", Maximum.ToString());
			Attributes.Add("data-current-value", Value.ToString());
			Attributes.Add("data-display-style", DisplayStyle.ToString().ToLower());
		}

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		public MeterDisplayStyle DisplayStyle { get; set; } = MeterDisplayStyle.None;
		public int Minimum { get; set; } = 0;
		public int Maximum { get; set; } = 100;
		public int Value { get; set; } = 50;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			base.RenderBeginTag(writer);

			writer.Write("<div class=\"uwt-meter-wrapper\">");
			writer.Write("<div class=\"uwt-meter-content\">");
			writer.Write("</div>");
			writer.Write("<canvas class=\"uwt-meter-canvas\">");
			writer.Write("</canvas>");
			writer.Write("</div>");
			writer.Write("<div class=\"uwt-meter-label\">");
			writer.Write("</div>");
		}
	}
}
