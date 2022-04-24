using System;
using System.Web.UI;
using MBS.Framework;

namespace MBS.Web.Controls
{
	[ParseChildren(true)]
	public class Toolbar : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;

		public CommandItem.CommandItemCollection Items { get; } = new CommandItem.CommandItemCollection();

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-toolbar");

			base.RenderBeginTag(writer);
		}
		protected override void RenderContents(HtmlTextWriter writer)
		{
			foreach (CommandItem ci in Items)
			{
				if (ci is CommandReferenceCommandItem)
				{
					string commandID = (ci as CommandReferenceCommandItem).CommandID;
					Command cmd = Application.Instance.FindCommand(commandID);
					if (cmd == null)
					{
						throw new ApplicationException(String.Format("command not found : {0}", commandID));
					}

					writer.Write("<a class=\"uwt-button\">");

					if (!String.IsNullOrEmpty(cmd.ImageFileName))
					{
						writer.Write("<span class=\"uwt-icon\">");
						writer.Write("<img src=\"");
						writer.Write(Page.ExpandRelativePath(cmd.ImageFileName));
						writer.Write("\" />");
						writer.Write("</span>");
					}

					writer.Write("<span class=\"uwt-title\">");

					writer.Write(cmd.Title);
					writer.Write("</span>");
					writer.Write("</a>");
				}
				else if (ci is SeparatorCommandItem)
				{
					writer.Write("<span class=\"uwt-separator\">&nbsp;</span>");
				}
			}
		}
		public override void RenderEndTag(HtmlTextWriter writer)
		{
			base.RenderEndTag(writer);
		}
	}
}
