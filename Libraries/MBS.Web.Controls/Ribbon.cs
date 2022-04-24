using System;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MBS.Web.Controls
{
	[ParseChildren(false)]
	public class RibbonLiteral : RibbonItem
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-ribbon-literal");

			base.RenderBeginTag(writer);
		}
	}

	public class RibbonItemContainer : RibbonItem
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		public RibbonItem.RibbonItemCollection Items { get; } = new RibbonItemCollection();
		public Orientation Orientation { get; set; } = Orientation.Horizontal;

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			foreach (RibbonItem item in Items)
			{
				this.Controls.Add(item);
			}
		}
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-ribbon-command-container");
			switch (Orientation)
			{
				case Orientation.Horizontal: this.AddCssClass("uwt-orientation-horizontal"); break;
				case Orientation.Vertical: this.AddCssClass("uwt-orientation-vertical"); break;
			}
			base.RenderBeginTag(writer);
		}
	}

	public class RibbonDropDownButton : RibbonItem
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-dropdown-button");

			base.RenderBeginTag(writer);
		}
	}

	public class RibbonSplitButton : RibbonItem
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		public RibbonItem.RibbonItemCollection Items { get; } = new RibbonItemCollection();

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			RibbonButton btn = new RibbonButton();
			Controls.Add(btn);

			RibbonDropDownButton btnDropDown = new RibbonDropDownButton();
			System.Web.UI.HtmlControls.HtmlGenericControl divTitle = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			divTitle.AddCssClass("uwt-title");
			divTitle.InnerHtml = Text;
			btnDropDown.Controls.Add(divTitle);
			Controls.Add(btnDropDown);
		}
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-ribbon-command");
			this.AddCssClass("uwt-splitbutton");

			base.RenderBeginTag(writer);
		}
	}

	public class RibbonButton : RibbonItem
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			System.Web.UI.HtmlControls.HtmlImage imgIcon = new System.Web.UI.HtmlControls.HtmlImage();
			imgIcon.Src = "#";
			this.Controls.Add(imgIcon);

			System.Web.UI.HtmlControls.HtmlGenericControl divTitle = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			divTitle.AddCssClass("uwt-title");
			divTitle.InnerHtml = Text;
			this.Controls.Add(divTitle);
		}
		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-ribbon-command");
			this.AddCssClass("uwt-button");

			base.RenderBeginTag(writer);
		}
	}

	public abstract class RibbonItem : System.Web.UI.WebControls.WebControl
	{
		public class RibbonItemCollection
			: System.Collections.ObjectModel.Collection<RibbonItem>
		{

		}
		public string Text { get; set; } = null;
	}

	public class RibbonTabGroup : System.Web.UI.WebControls.WebControl
	{
		public class RibbonTabGroupCollection
			: System.Collections.ObjectModel.Collection<RibbonTabGroup>
		{

		}

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		public string Text { get; set; } = null;
		public RibbonItem.RibbonItemCollection Items { get; } = new RibbonItem.RibbonItemCollection();
	}

	public class RibbonTab : System.Web.UI.WebControls.WebControl
	{
		public class RibbonTabCollection
			: System.Collections.ObjectModel.Collection<RibbonTab>
		{

		}

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public string Text { get; set; } = null;
		public bool Selected { get; set; } = false;
		public RibbonTabGroup.RibbonTabGroupCollection Groups { get; } = new RibbonTabGroup.RibbonTabGroupCollection();
	}

	[ParseChildren(true)]
	public class Ribbon : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public new bool Visible { get; set; } = true;
		public bool Rendered {  get { return base.Visible; } set { base.Visible = value; } }
		public bool Collapsed { get; set; } = false;

		public RibbonTab.RibbonTabCollection Tabs { get; } = new RibbonTab.RibbonTabCollection();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-ribbon");
			if (Visible)
			{
				this.AddCssClass("uwt-visible");
			}
			if (Collapsed)
			{
				this.AddCssClass("uwt-ribbon-collapsed");
			}

			base.RenderBeginTag(writer);
		}

		protected override void CreateChildControls()
		{
			base.CreateChildControls();

			System.Web.UI.HtmlControls.HtmlGenericControl ulButtons = new System.Web.UI.HtmlControls.HtmlGenericControl("ul");
			ulButtons.AddCssClass("uwt-ribbon-tab-buttons");

			System.Web.UI.HtmlControls.HtmlGenericControl divRibbonTabContents = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			divRibbonTabContents.AddCssClass("uwt-ribbon-tab-contents");

			System.Web.UI.HtmlControls.HtmlGenericControl divRibbonApplicationButton = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
			divRibbonApplicationButton.AddCssClass("uwt-ribbon-application-button");

			System.Web.UI.HtmlControls.HtmlAnchor aRibbonApplicationButton = new System.Web.UI.HtmlControls.HtmlAnchor();
			{
				System.Web.UI.HtmlControls.HtmlGenericControl spanText = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
				spanText.AddCssClass("uwt-title");
				spanText.InnerHtml = "&nbsp;";
				aRibbonApplicationButton.Controls.Add(spanText);
				divRibbonApplicationButton.Controls.Add(aRibbonApplicationButton);
			}
			Controls.Add(divRibbonApplicationButton);

			foreach (RibbonTab tab in Tabs)
			{
				System.Web.UI.HtmlControls.HtmlGenericControl liButton = new System.Web.UI.HtmlControls.HtmlGenericControl("li");
				if (tab.Visible)
				{
					liButton.AddCssClass("uwt-visible");
				}
				if (tab.Selected)
				{
					liButton.AddCssClass("uwt-selected");
				}

				System.Web.UI.HtmlControls.HtmlGenericControl spanText = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
				spanText.AddCssClass("uwt-title");
				spanText.InnerHtml = tab.Text;
				liButton.Controls.Add(spanText);

				ulButtons.Controls.Add(liButton);

				System.Web.UI.HtmlControls.HtmlGenericControl divRibbonTabContent = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
				divRibbonTabContent.AddCssClass("uwt-ribbon-tab-content");
				if (tab.Visible && tab.Selected)
				{
					divRibbonTabContent.AddCssClass("uwt-visible");
				}

				foreach (RibbonTabGroup group in tab.Groups)
				{
					System.Web.UI.HtmlControls.HtmlGenericControl divRibbonTabGroup = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
					divRibbonTabGroup.AddCssClass("uwt-ribbon-tab-group");

					System.Web.UI.HtmlControls.HtmlGenericControl divRibbonTabGroupContent = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
					divRibbonTabGroupContent.AddCssClass("uwt-content");

					foreach (RibbonItem item in group.Items)
					{
						divRibbonTabGroupContent.Controls.Add(item);
					}

					divRibbonTabGroup.Controls.Add(divRibbonTabGroupContent);

					System.Web.UI.HtmlControls.HtmlGenericControl divRibbonTabGroupText = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
					divRibbonTabGroupText.AddCssClass("uwt-title");
					divRibbonTabGroupText.InnerHtml = group.Text;
					divRibbonTabGroup.Controls.Add(divRibbonTabGroupText);

					System.Web.UI.HtmlControls.HtmlAnchor aRibbonTabGroupDialog = new System.Web.UI.HtmlControls.HtmlAnchor();
					aRibbonTabGroupDialog.AddCssClass("uwt-ribbon-tab-group-dialog");
					aRibbonTabGroupDialog.InnerHtml = "&nbsp;";
					divRibbonTabGroup.Controls.Add(aRibbonTabGroupDialog);

					divRibbonTabContent.Controls.Add(divRibbonTabGroup);
				}

				divRibbonTabContents.Controls.Add(divRibbonTabContent);
			}

			this.Controls.Add(ulButtons);
			this.Controls.Add(divRibbonTabContents);
		}
	}
}
