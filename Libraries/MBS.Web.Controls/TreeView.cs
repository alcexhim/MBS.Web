using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MBS.Web.Controls
{
	public class TreeViewItem
	{
		public TreeViewItem.TreeViewItemCollection Items { get; } = new TreeViewItemCollection();
		public string Text { get; set; } = null;

		public class TreeViewItemCollection
			: System.Collections.ObjectModel.Collection<TreeViewItem>
		{

		}
	}
	[ParseChildren(true)]
	public class TreeView : WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Ul;

		public TreeViewItem.TreeViewItemCollection Items { get; } = new TreeViewItem.TreeViewItemCollection();

		protected override void OnInit(EventArgs e)
		{
			base.OnInit(e);

			this.AddCssClass("uwt-treeview");

			foreach (TreeViewItem tvi in Items)
			{
				HtmlGenericControl li = CreateListItemForTreeNodeRecursive(tvi);
				if (li == null) continue;

				Controls.Add(li);
			}
		}

		private HtmlGenericControl CreateListItemForTreeNodeRecursive(TreeViewItem tvi)
		{
			HtmlGenericControl li = new HtmlGenericControl("li");
			li.AddCssClass("uwt-visible");

			HtmlGenericControl span = new HtmlGenericControl("span");
			span.AddCssClass("uwt-treeview-item");

			HtmlGenericControl spanToggler = new HtmlGenericControl("span");
			spanToggler.AddCssClass("uwt-treeview-toggler");
			spanToggler.InnerHtml = "+";
			span.Controls.Add(spanToggler);

			HtmlGenericControl spanText = new HtmlGenericControl("span");
			spanText.AddCssClass("uwt-title");
			spanText.InnerHtml = tvi.Text;

			span.Controls.Add(spanText);

			li.Controls.Add(span);

			HtmlGenericControl ul = new HtmlGenericControl("ul");
			foreach (TreeViewItem tvi1 in tvi.Items)
			{
				HtmlGenericControl li1 = CreateListItemForTreeNodeRecursive(tvi1);
				if (li1 == null) continue;

				ul.Controls.Add(li1);
			}
			li.Controls.Add(ul);
			return li;
		}
	}
}
