using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public enum ButtonDropDownStyle
	{
		None,
		SplitButton,
		DropDownButton
	}
	public class Button : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.A;
		public ButtonDropDownStyle DropDownStyle { get; set; } = ButtonDropDownStyle.None;
		public ITemplate DropDownContent { get; set; }
		public string IconName { get; set; } = null;

		public string Text { get; set; } = null;

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			System.Web.UI.HtmlControls.HtmlGenericControl spanText = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
			spanText.AddCssClass("uwt-title");
			spanText.InnerHtml = Text;
			Controls.Add(spanText);
		}

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			System.Text.StringBuilder sbCssClass = new System.Text.StringBuilder();
			sbCssClass.Append("uwt-button");
			if (DropDownStyle != ButtonDropDownStyle.None && DropDownContent != null)
			{
				sbCssClass.Append(" uwt-button-hasdropdown");
			}
			if (DropDownStyle == ButtonDropDownStyle.DropDownButton)
			{
				sbCssClass.Append(" uwt-button-requiredropdown");
			}
			writer.Write("<div class=\"");
			writer.Write(sbCssClass.ToString());
			writer.Write("\">");

			base.RenderBeginTag(writer);
		}
		public override void RenderEndTag(HtmlTextWriter writer)
		{
			base.RenderEndTag(writer);
			writer.Write("<button class=\"uwt-button-dropdownbutton\"></button>");

			Popup p = new Popup();
			DropDownContent?.InstantiateIn(p);
			p.RenderControl(writer);

			writer.Write("</div>");
		}
	}
}
