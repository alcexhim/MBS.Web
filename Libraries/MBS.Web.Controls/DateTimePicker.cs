using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public enum DateTimePickerMode
	{
		Date = 1,
		Time = 2,
		DateTime = 3
	}

	public class DateTimePicker : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		public DateTimePickerMode Mode { get; set; } = DateTimePickerMode.Date;

		public DateTime? SelectedDateTime
		{
			get
			{
				if (DateTime.TryParse(Text, out DateTime dt))
					return dt;
				return null;
			}
			set
			{
				Text = SelectedDateTime.ToString();
			}
		}
		public string Text
		{
			get
			{
				return ViewState["Text"] as string;
			}
			set
			{
				ViewState["Text"] = value;
			}
		}

		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);

			this.AddCssClass("uwt-datetimepicker");
		}
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			base.RenderBeginTag(writer);

			writer.Write("<input type=\"text\" value=\"{0}\" />", SelectedDateTime?.ToString());
			writer.Write("<div class=\"uwt-popup\">");

			writer.Write("<div class=\"uwt-calendar\" data-selected-date=\"{0}\">&nbsp;</div>", SelectedDateTime?.ToString("yyyy-MM-ddTHH:mm:ss"));
		}
		public override void RenderEndTag(HtmlTextWriter writer)
		{
			base.RenderEndTag(writer);
		}
	}
}