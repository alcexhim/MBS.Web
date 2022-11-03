using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class ButtonGroupButton : Button
	{
		public class ButtonGroupButtonCollection
			: System.Collections.ObjectModel.Collection<ButtonGroupButton>
		{

		}

		public string Description { get; set; } = null;

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			System.Web.UI.HtmlControls.HtmlGenericControl divDescrription = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
			divDescrription.AddCssClass("uwt-description");
			divDescrription.InnerHtml = Description;
			Controls.Add(divDescrription);
		}
	}

	[ParseChildren(true)]
	public class ButtonGroup : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public ButtonGroupButton.ButtonGroupButtonCollection Buttons { get; } = new ButtonGroupButton.ButtonGroupButtonCollection();
		public System.Web.UI.WebControls.Orientation Orientation { get; set; } = System.Web.UI.WebControls.Orientation.Horizontal;

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			foreach (ButtonGroupButton button in Buttons)
			{
				Controls.Add(button);
			}
		}

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-button-group");
			switch (Orientation)
			{
				case System.Web.UI.WebControls.Orientation.Horizontal: this.AddCssClass("uwt-orientation-horizontal"); break;
				case System.Web.UI.WebControls.Orientation.Vertical: this.AddCssClass("uwt-orientation-vertical"); break;
			}
			base.RenderBeginTag(writer);
		}
	}
}
