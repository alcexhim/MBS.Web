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
<<<<<<< HEAD
		public System.Web.UI.HtmlControls.HtmlGenericControl DropDownContent { get; }
=======
		public ITemplate DropDownContent { get; set; }
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
		public string IconName { get; set; } = null;

		public string Text { get; set; } = null;

<<<<<<< HEAD
		public Button()
		{
			DropDownContent = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			DropDownContent.AddCssClass("uwt-popup-content");
=======
		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			System.Web.UI.HtmlControls.HtmlGenericControl spanText = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
			spanText.AddCssClass("uwt-title");
			spanText.InnerHtml = Text;
			Controls.Add(spanText);
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
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

<<<<<<< HEAD
			System.Web.UI.HtmlControls.HtmlGenericControl spanText = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
			spanText.AddCssClass("uwt-title");
			spanText.InnerHtml = Text;
			Controls.Add(spanText);

=======
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
			base.RenderBeginTag(writer);
		}
		public override void RenderEndTag(HtmlTextWriter writer)
		{
			base.RenderEndTag(writer);
			writer.Write("<button class=\"uwt-button-dropdownbutton\"></button>");

			Popup p = new Popup();
<<<<<<< HEAD
			// DropDownContent?.InstantiateIn(p);
			p.Controls.Add(DropDownContent);
=======
			DropDownContent?.InstantiateIn(p);
>>>>>>> fa6a3e5406ba9b6d2229efa45d9687501b3b2ae2
			p.RenderControl(writer);

			writer.Write("</div>");
		}
	}
}
