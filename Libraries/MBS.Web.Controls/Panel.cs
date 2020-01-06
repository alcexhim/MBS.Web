//
//  Panel.cs
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
using System.Web.UI;

namespace MBS.Web.Controls
{
	[ParseChildren(true)]
	public class Panel : System.Web.UI.WebControls.Panel
	{
		public string Title { get; set; } = String.Empty;

		public System.Web.UI.WebControls.Panel HeaderControls { get; set; } = null;
		public System.Web.UI.WebControls.Panel ContentControls { get; set; } = null;
		public System.Web.UI.WebControls.Panel FooterControls { get; set; } = null;

		public Panel()
		{
			base.Attributes.Add("class", "Panel");

			this.HeaderControls = new System.Web.UI.WebControls.Panel();
			this.ContentControls = new System.Web.UI.WebControls.Panel();
			this.FooterControls = new System.Web.UI.WebControls.Panel();

			this.HeaderControls.Visible = true;
			this.ContentControls.Visible = true;
			this.FooterControls.Visible = true;
		}

		protected override void RenderContents(HtmlTextWriter writer)
		{
			writer.Write("<div class=\"Title\">");
			writer.Write(Title);
			writer.Write("</div>");

			writer.Write("<div class=\"Content\">");
			this.ContentControls.RenderControl(writer);
			writer.Write("</div>");

			if (this.FooterControls != null && this.FooterControls.Controls.Count > 0)
			{
				writer.Write("<div class=\"Footer\">");
				this.FooterControls.RenderControl(writer);
				writer.Write("</div>");
			}
		}
	}
}
