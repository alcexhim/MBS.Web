//
//  FormView.cs
//
//  Author:
//       Michael Becker <alcexhim@gmail.com>
//
//  Copyright (c) 2019 
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace MBS.Web.Controls
{
	public class FormViewItemPassword : FormViewItemText
	{
		protected override void RenderInternal(HtmlTextWriter writer)
		{
			HtmlInputPassword ctl = new HtmlInputPassword();
			ctl.Name = Name;
			ctl.ID = ID;
			ctl.Value = Value;
			ctl.RenderControl(writer);
		}
	}
	public class FormViewItemText : FormViewItem
	{
		public string Value { get; set; }

		protected override void RenderInternal(HtmlTextWriter writer)
		{
			HtmlInputText ctl = new HtmlInputText();
			ctl.Name = Name;
			ctl.ID = ID;
			ctl.Value = Value;
			ctl.RenderControl(writer);
		}
	}
	public abstract class FormViewItem
	{
		public class FormViewItemCollection
			: System.Collections.ObjectModel.Collection<FormViewItem>
		{
			private Dictionary<string, FormViewItem> _itemsById = new Dictionary<string, FormViewItem>();
			public FormViewItem this[string id]
			{
				get
				{
					if (_itemsById.ContainsKey(id))
						return _itemsById[id];
					return null;
				}
			}

			protected override void InsertItem(int index, FormViewItem item)
			{
				base.InsertItem(index, item);
				_itemsById.Add(item.ID, item);
			}
			protected override void ClearItems()
			{
				base.ClearItems();
				_itemsById.Clear();
			}
			protected override void RemoveItem(int index)
			{
				_itemsById.Remove(this[index].ID);
				base.RemoveItem(index);
			}
			protected override void SetItem(int index, FormViewItem item)
			{
				_itemsById.Remove(this[index].ID);
				base.SetItem(index, item);
				_itemsById[item.ID] = item;
			}
		}

		public string ID { get; set; } = String.Empty;
		public string Name { get; set; } = String.Empty;
		public string Title { get; set; } = String.Empty;

		protected abstract void RenderInternal(HtmlTextWriter writer);
		internal void Render(HtmlTextWriter writer)
		{
			RenderInternal(writer);
		}
	}

	[ParseChildren(true)]
	public class FormView : WebControl
	{
		public FormViewItem.FormViewItemCollection Items { get; } = new FormViewItem.FormViewItemCollection();

		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Table;

		protected override void RenderContents(HtmlTextWriter writer)
		{
			foreach (FormViewItem item in Items)
			{
				writer.Write("<tr>");
				writer.Write("<td><label for=\"" + item.Name + "\">" + item.Title + "</label></td>");
				writer.Write("<td>");
				item.Render(writer);
				writer.Write("</td>");
				writer.Write("</tr>");
			}
		}
	}
}
