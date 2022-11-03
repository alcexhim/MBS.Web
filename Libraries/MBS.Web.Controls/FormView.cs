using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class FormViewItemChoiceValue
	{
		public class FormViewItemChoiceValueCollection
			: System.Collections.ObjectModel.Collection<FormViewItemChoiceValue>
		{

		}

		public string Title { get; set; } = null;
		public string Value { get; set; } = null;
	}
	public class FormViewItemChoice : FormViewItem
	{
		public FormViewItemChoiceValue.FormViewItemChoiceValueCollection ValidValues { get; } = new FormViewItemChoiceValue.FormViewItemChoiceValueCollection();

		protected override Control RenderInternal()
		{
			System.Web.UI.WebControls.DropDownList cbo = new System.Web.UI.WebControls.DropDownList();
			foreach (FormViewItemChoiceValue value in ValidValues)
			{
				if (value.Value == null)
				{
					cbo.Items.Add(new System.Web.UI.WebControls.ListItem(value.Title));
				}
				else
				{
					cbo.Items.Add(new System.Web.UI.WebControls.ListItem(value.Title, value.Value));
				}
			}
			return cbo;
		}
	}
	public class FormViewItemDateTime : FormViewItem
	{
		public DateTimePickerMode Mode { get; set; }
		public DateTime? SelectedDateTime { get; set; } = null;
		public string Text { get; set; } = null;

		protected override Control RenderInternal()
		{
			DateTimePicker ctl = new DateTimePicker();
			ctl.Mode = Mode;
			ctl.Text = Text;
			if (SelectedDateTime != null)
			{
				ctl.SelectedDateTime = SelectedDateTime;
			}
			return ctl;
		}
	}
	public class FormViewItemBoolean : FormViewItem
	{
		protected override Control RenderInternal()
		{
			System.Web.UI.WebControls.CheckBox chk = new System.Web.UI.WebControls.CheckBox();
			chk.Checked = (Value == "True" ? true : false);
			return chk;
		}
	}
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
			public FormViewItem this[string name]
			{
				get
				{
					for (int i = 0; i < Count; i++)
					{
						if (this[i].Name == name)
							return this[i];
					}
					return null;
				}
			}
		}

		public System.Collections.Generic.Dictionary<string, string> Attributes { get; } = new System.Collections.Generic.Dictionary<string, string>();

		public string Name { get; set; } = String.Empty;
		public string Title { get; set; } = String.Empty;
		public string Value { get; set; } = String.Empty;
		public bool ReadOnly { get; set; } = false;
		public string CssClass { get; set; } = null;

		protected abstract Control RenderInternal();
		internal Control Render()
		{
			Control ctl = RenderInternal();
			if (CssClass != null)
			{
				if (ctl is System.Web.UI.HtmlControls.HtmlControl)
				{
					// eww
					((System.Web.UI.HtmlControls.HtmlControl)ctl).AddCssClass(CssClass);
				}
				else if (ctl is System.Web.UI.WebControls.WebControl)
				{
					// eww
					((System.Web.UI.WebControls.WebControl)ctl).AddCssClass(CssClass);
				}
			}
			ctl.ID = Name;
			return ctl;
		}
	}

	[ParseChildren(true, DefaultProperty = "Items")]
	public class FormView : System.Web.UI.WebControls.Table
	{
		public bool ReadOnly { get; set; } = false;
		public FormViewItem.FormViewItemCollection Items { get; } = new FormViewItem.FormViewItemCollection();

		private static Random rnd = new Random();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-formview");

			Rows.Clear();
			foreach (FormViewItem item in Items)
			{

				bool oldreadonly = item.ReadOnly;
				if (ReadOnly)
				{
					item.ReadOnly = ReadOnly;
				}

				Control ctl = item.Render();
				ctl.ID = item.Name;

				if (ReadOnly)
				{
					item.ReadOnly = oldreadonly;
				}

				if (ctl.ID == null)
				{
					ctl.ID = "uwt-" + rnd.Next();
				}

				System.Web.UI.WebControls.TableRow tr = new System.Web.UI.WebControls.TableRow();
				foreach (System.Collections.Generic.KeyValuePair<string, string> kvp in item.Attributes)
				{
					tr.Attributes[kvp.Key] = kvp.Value;
				}
				System.Web.UI.WebControls.TableCell tdLabel = new System.Web.UI.WebControls.TableCell();

				System.Web.UI.HtmlControls.HtmlGenericControl lbl = new System.Web.UI.HtmlControls.HtmlGenericControl("label");
				lbl.Attributes.Add("for", ctl.ID);
				lbl.InnerHtml = item.Title;
				tdLabel.Controls.Add(lbl);

				System.Web.UI.WebControls.TableCell tdContent = new System.Web.UI.WebControls.TableCell();

				tdContent.Controls.Add(ctl);

				tr.Cells.Add(tdLabel);
				tr.Cells.Add(tdContent);

				Rows.Add(tr);
			}

			base.RenderBeginTag(writer);
		}

		protected override void LoadControlState(object savedState)
		{
			base.LoadControlState(savedState);

			System.Collections.Generic.Dictionary<string, object> values = (savedState as System.Collections.Generic.Dictionary<string, object>);
			if (values == null)
				return;

			foreach (System.Web.UI.WebControls.TableRow row in Rows)
			{
				Control ctl = row.Cells[1].Controls[0];
				if (ctl is TextBox)
				{
					(ctl as TextBox).Text = (string) values[ctl.ID];
				}
			}
		}
		protected override object SaveControlState()
		{
			System.Collections.Generic.Dictionary<string, object> values = new System.Collections.Generic.Dictionary<string, object>();
			foreach (System.Web.UI.WebControls.TableRow row in Rows)
			{
				Control ctl = row.Cells[1].Controls[0];
				if (ctl is TextBox)
				{
					values[ctl.ID] = (ctl as TextBox).Text;
				}
			}
			return values;
		}
	}
}