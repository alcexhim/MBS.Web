using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class FormViewItemPassword : FormViewItem
	{
		protected override Control RenderInternal()
		{
			System.Web.UI.WebControls.TextBox txt = new System.Web.UI.WebControls.TextBox();
			txt.TextMode = System.Web.UI.WebControls.TextBoxMode.Password;
			txt.Text = Value;
			return txt;
		}
	}
	public class FormViewItemText : FormViewItem
	{
		protected override Control RenderInternal()
		{
			if (ReadOnly)
			{
				System.Web.UI.WebControls.Label txt = new System.Web.UI.WebControls.Label();
				txt.Text = Value;
				return txt;
			}
			else
			{
				System.Web.UI.WebControls.TextBox txt = new System.Web.UI.WebControls.TextBox();
				txt.Text = Value;
				return txt;
			}
		}
	}
	public abstract class FormViewItem
	{
		public class FormViewItemCollection
			: System.Collections.ObjectModel.Collection<FormViewItem>
		{
		}

		public string Name { get; set; } = String.Empty;
		public string Title { get; set; } = String.Empty;
		public string Value { get; set; } = String.Empty;
		public bool ReadOnly { get; set; } = false;

		protected abstract Control RenderInternal();
		internal Control Render()
		{
			Control ctl = RenderInternal();
			ctl.ID = Name;
			return ctl;
		}
	}

	[ParseChildren(true, DefaultProperty = "Items")]
	public class FormView : System.Web.UI.WebControls.Table
	{
		public FormViewItem.FormViewItemCollection Items { get; } = new FormViewItem.FormViewItemCollection();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-formview");

			base.RenderBeginTag(writer);
		}

		protected override void RenderContents(HtmlTextWriter writer)
		{
			foreach (FormViewItem item in Items)
			{
				System.Web.UI.WebControls.TableRow tr = new System.Web.UI.WebControls.TableRow();
				System.Web.UI.WebControls.TableCell tdLabel = new System.Web.UI.WebControls.TableCell();

				System.Web.UI.WebControls.Label lbl = new System.Web.UI.WebControls.Label();
				lbl.Text = item.Title;
				tdLabel.Controls.Add(lbl);

				System.Web.UI.WebControls.TableCell tdContent = new System.Web.UI.WebControls.TableCell();

				Control ctl = item.Render();
				tdContent.Controls.Add(ctl);

				tr.Cells.Add(tdLabel);
				tr.Cells.Add(tdContent);

				tr.RenderControl(writer);
			}
		}
	}
}