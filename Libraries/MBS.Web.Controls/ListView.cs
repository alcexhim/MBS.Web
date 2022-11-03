using System;
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class ListViewItemColumn
	{
		public class ListViewItemColumnCollection
			: System.Collections.ObjectModel.Collection<ListViewItemColumn>
		{
		}

		public System.Web.UI.AttributeCollection Attributes { get; } = new System.Web.UI.AttributeCollection(new System.Web.UI.StateBag());

		public string ColumnID { get; set; } = String.Empty;
		public string Value { get; set; } = String.Empty;

		public virtual System.Web.UI.Control RenderControl()
		{
			System.Web.UI.WebControls.Label label = new System.Web.UI.WebControls.Label();
			label.Text = System.Web.HttpUtility.HtmlEncode(Value);
			return label;
		}
	}
	public class ListViewItem
	{
		public class ListViewItemCollection
			: System.Collections.ObjectModel.Collection<ListViewItem>
		{
		}

		public System.Web.UI.AttributeCollection Attributes { get; } = new AttributeCollection(new StateBag());
		public ListViewItemColumn.ListViewItemColumnCollection Columns { get; } = new ListViewItemColumn.ListViewItemColumnCollection();
	}
	public class ListViewColumn
	{
		public class ListViewColumnCollection
			: System.Collections.ObjectModel.Collection<ListViewColumn>
		{
		}

		public System.Web.UI.AttributeCollection Attributes { get; } = new AttributeCollection(new StateBag());
		public string ID { get; set; } = String.Empty;
		public string GroupTitle { get; set; } = null;
		public string Title { get; set; }
	}
	[ParseChildren(true)]
	public class ListView : System.Web.UI.WebControls.Panel
	{
		public ListViewColumn.ListViewColumnCollection Columns { get; } = new ListViewColumn.ListViewColumnCollection();
		public ListViewItem.ListViewItemCollection Items { get; } = new ListViewItem.ListViewItemCollection();

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Table;

		public string Title { get; set; } = String.Empty;

		protected virtual System.Web.UI.Control RenderTableCaption(HtmlTextWriter writer)
		{
			System.Web.UI.HtmlControls.HtmlGenericControl caption = new System.Web.UI.HtmlControls.HtmlGenericControl("caption");
			caption.ID = this.ID + "_caption";

			System.Web.UI.WebControls.Label lblTableTitle = new System.Web.UI.WebControls.Label();
			lblTableTitle.CssClass = "uwt-listview-title";
			lblTableTitle.ID = this.ID + "_caption_title";
			lblTableTitle.Text = Title;
			caption.Controls.Add(lblTableTitle);

			System.Web.UI.WebControls.Label lblTableItemCount = new System.Web.UI.WebControls.Label();
			lblTableItemCount.CssClass = "uwt-listview-item-count";
			lblTableItemCount.ID = this.ID + "_caption_count";
			lblTableItemCount.Text = Items.Count.ToString();
			caption.Controls.Add(lblTableItemCount);

			System.Web.UI.WebControls.Label lblTableItemCountLabel = new System.Web.UI.WebControls.Label();
			lblTableItemCountLabel.CssClass = "uwt-listview-item-count-label";
			lblTableItemCountLabel.ID = this.ID + "_caption_count_label";
			lblTableItemCountLabel.Text = " items";
			caption.Controls.Add(lblTableItemCountLabel);
			return caption;
		}
		protected virtual System.Web.UI.Control RenderTableHeader(HtmlTextWriter writer)
		{
			System.Web.UI.HtmlControls.HtmlGenericControl thead = new System.Web.UI.HtmlControls.HtmlGenericControl("thead");
			thead.ID = this.ID + "_thead";

			System.Web.UI.WebControls.TableHeaderRow rowHeaderGroup = new System.Web.UI.WebControls.TableHeaderRow();
			rowHeaderGroup.AddCssClass("uwt-listview-row-group");
			rowHeaderGroup.ID = this.ID + "_thead_tr_grp";
			thead.Controls.Add(rowHeaderGroup);

			System.Web.UI.WebControls.TableHeaderRow rowHeader = new System.Web.UI.WebControls.TableHeaderRow();
			rowHeader.ID = this.ID + "_thead_tr";

			string lastGroupTitle = null;
			int lastGroupColumnCount = 0;
			System.Web.UI.WebControls.TableHeaderCell cellHeader = null;

			foreach (ListViewColumn col in Columns)
			{
				if (col.GroupTitle != null)
				{
					if (lastGroupTitle != col.GroupTitle)
					{
						cellHeader = new System.Web.UI.WebControls.TableHeaderCell();
						rowHeaderGroup.Cells.Add(cellHeader);

						System.Web.UI.HtmlControls.HtmlAnchor cellHeaderA = new System.Web.UI.HtmlControls.HtmlAnchor();
						cellHeaderA.HRef = "#";
						cellHeaderA.InnerHtml = col.GroupTitle;
						cellHeader.Controls.Add(cellHeaderA);

						lastGroupColumnCount = 0;
					}
					lastGroupTitle = col.GroupTitle;
					lastGroupColumnCount++;
					cellHeader.ColumnSpan = lastGroupColumnCount;
				}

				System.Web.UI.WebControls.TableHeaderCell cell = new System.Web.UI.WebControls.TableHeaderCell();
				cell.ID = this.ID + "_thead_tr_td" + Columns.IndexOf(col).ToString();
				foreach (string key in col.Attributes.Keys)
				{
					cell.Attributes.Add(key, col.Attributes[key]);
				}
				if (col.GroupTitle == null)
				{
					cell.RowSpan = 2;
				}

				System.Web.UI.HtmlControls.HtmlAnchor a = new System.Web.UI.HtmlControls.HtmlAnchor();
				a.HRef = "#";
				a.InnerHtml = col.Title;
				cell.Controls.Add(a);

				if (col.GroupTitle != null)
				{
					rowHeader.Cells.Add(cell);
				}
				else
				{
					rowHeaderGroup.Cells.Add(cell);
				}
			}
			thead.Controls.Add(rowHeader);
			return thead;
		}
		protected virtual System.Web.UI.Control RenderTableBody(HtmlTextWriter writer)
		{
			System.Web.UI.HtmlControls.HtmlGenericControl tbody = new System.Web.UI.HtmlControls.HtmlGenericControl("tbody");
			foreach (ListViewItem lvi in Items)
			{
				System.Web.UI.WebControls.TableRow tr = new System.Web.UI.WebControls.TableRow();
				foreach (string key in lvi.Attributes.Keys)
				{
					tr.Attributes.Add(key, lvi.Attributes[key]);
				}

				int columnIndex = 0;
				for (int icol = 0; icol < Columns.Count; icol++)
				{
					System.Web.UI.WebControls.TableCell td = new System.Web.UI.WebControls.TableCell();
					if (columnIndex < lvi.Columns.Count && Columns[icol].ID == lvi.Columns[columnIndex].ColumnID)
					{
						foreach (string key in lvi.Columns[columnIndex].Attributes.Keys)
						{
							td.Attributes.Add(key, lvi.Columns[columnIndex].Attributes[key]);
						}
						System.Web.UI.Control ctl = lvi.Columns[columnIndex].RenderControl();
						td.Controls.Add(ctl);
						columnIndex++;
					}
					else
					{
						td.Text = "&nbsp;";
					}
					tr.Cells.Add(td);
				}
				tbody.Controls.Add(tr);
			}
			return tbody;
		}

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-listview");

			this.Controls.Clear();

			System.Web.UI.Control caption = RenderTableCaption(writer);
			if (caption != null) this.Controls.Add(caption);
			System.Web.UI.Control thead = RenderTableHeader(writer);
			if (thead != null) this.Controls.Add(thead);
			System.Web.UI.Control tbody = RenderTableBody(writer);
			if (tbody != null) this.Controls.Add(tbody);

			base.RenderBeginTag(writer);
		}
	}
}
