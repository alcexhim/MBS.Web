<%@ Page Language="C#" Inherits="MBS.Web.TestProject.Default" %>
<%@ Register TagPrefix="wcx" Namespace="MBS.Web.Controls" Assembly="MBS.Web.Controls" %>
<%@ Register TagPrefix="uwt" Namespace="MBS.Framework" Assembly="MBS.Framework" %>

<!DOCTYPE html>
<html>
<head runat="server">
	<title>Default</title>
	<!-- oh -->
	<link rel="manifest" href="manifest.json" />
</head>
<body class="uwt-ribbon-visible uwt-header-visible uwt-loading">
	<div class="uwt-splashscreen">
		&nbsp;
	</div>
	<form id="form1" runat="server">
		<!-- Standard Layout : Header with Top Toolbar -->
		<div class="uwt-page-header">
			<div class="uwt-title"><asp:Label runat="server" ID="lblApplicationTitle" /></div>
			<input class="uwt-textbox uwt-searchbox" type="text" placeholder="Type to search (Ctrl+F)" />
			<a href="#" class="uwt-button">Send Feedback...</a>
		</div>
			
		<div class="uwt-layout uwt-layout-box uwt-orientation-vertical">
			
			<div class="uwt-layout-box-child">
					
				<wcx:Ribbon runat="server">
					<Tabs>
						<wcx:RibbonTab runat="server" Text="Home" Selected="True">
							<Groups>
								<wcx:RibbonTabGroup runat="server" Text="Clipboard">
									<Items>
										<wcx:RibbonSplitButton runat="server" Text="Paste">
											<Items>
												<wcx:RibbonButton runat="server" Text="Paste Special" />
											</Items>
										</wcx:RibbonSplitButton>
										<wcx:RibbonItemContainer Orientation="Vertical">
											<Items>
												<wcx:RibbonButton runat="server" Text="Cut" />
												<wcx:RibbonButton runat="server" Text="Copy" />
												<wcx:RibbonButton runat="server" Text="Delete" />
											</Items>
										</wcx:RibbonItemContainer>
									</Items>
								</wcx:RibbonTabGroup>
								<wcx:RibbonTabGroup runat="server" Text="Font">
									<Items>
										<wcx:RibbonLiteral runat="server">
											
											<div class="uwt-ribbon-listview" id="lv1" style="width: 400px;">
												<div class="uwt-content">
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Normal</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Title</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Subtitle</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Heading 1</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Heading 2</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Heading 3</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Heading 4</span>
													</div>
													<div class="uwt-listview-item">
														<img class="uwt-listview-item-icon" />
														<span class="uwt-title">Heading 5</span>
													</div>
												</div>
												<div class="uwt-scrollbar">
													<a href="#" class="uwt-scrollbar-button uwt-scrollbar-button-up">&nbsp;</a>
													<a href="#" class="uwt-scrollbar-button uwt-scrollbar-button-down">&nbsp;</a>
													<a href="#" class="uwt-scrollbar-button uwt-scrollbar-button-expand">&nbsp;</a>
												</div>
											</div>	
											
										</wcx:RibbonLiteral>
									</Items>
								</wcx:RibbonTabGroup>
							</Groups>
						</wcx:RibbonTab>
						<wcx:RibbonTab runat="server" Text="Insert">
							<Groups>
								<wcx:RibbonTabGroup runat="server" Text="Comments">
									<Items>
										<wcx:RibbonButton Text="New Comment" />
									</Items>
								</wcx:RibbonTabGroup>
							</Groups>
						</wcx:RibbonTab>
						<wcx:RibbonTab runat="server" Text="Developer">
							
						</wcx:RibbonTab>
					</Tabs>
				</wcx:Ribbon>
				
			</div>
				
			<div class="uwt-layout-box-child">
				
				<wcx:Toolbar runat="server">
					<Items>
						<uwt:CommandReferenceCommandItem CommandID="CreateObject" />
						<uwt:SeparatorCommandItem />
						<uwt:CommandReferenceCommandItem CommandID="HelpAbout" />
					</Items>
				</wcx:Toolbar>
				
			</div>
				
			<div class="uwt-layout-box-child uwt-layout-box-expand">
				
			</div>
				
		</div>
		
			
			<div class="uwt-page">
				<div class="uwt-content">
					
					<asp:Panel runat="server" ID="Documentpanel" Visible="false">
							
						<div class="uwt-sidebar" style="top: 260px; bottom: 46px">
						
							<wcx:Wunderbar runat="server" ID="wunderbar">
							
								<Items>
									<wcx:WunderbarPanel Title="Application" Selected="True">
										<wcx:TreeView runat="server">
											<Items>
												<wcx:TreeViewItem runat="server" Text="Root item 1">
													<Items>
														<wcx:TreeViewItem runat="server" Text="Child item 1" />
														<wcx:TreeViewItem runat="server" Text="Child item 2" />
														<wcx:TreeViewItem runat="server" Text="Child item 3">
															<Items>
																<wcx:TreeViewItem runat="server" Text="Nested child item" />
															</Items>
														</wcx:TreeViewItem>
													</Items>
												</wcx:TreeViewItem>
												<wcx:TreeViewItem runat="server" Text="Root item 2" />
											</Items>
										</wcx:TreeView>
									</wcx:WunderbarPanel>
									<wcx:WunderbarPanel Title="Tasks">
										another one
									</wcx:WunderbarPanel>
									<wcx:WunderbarPanel Title="Reports">
										yet another
									</wcx:WunderbarPanel>
									<wcx:WunderbarPanel Title="Users">
										yet another
									</wcx:WunderbarPanel>
								</Items>
							</wcx:Wunderbar>
						</div>
						<wcx:StackContainer ID="stack" runat="server" Width="100%" SelectedItemID="tabApplication">
							<Items>
								<wcx:StackPage runat="server" ID="tabApplication">
									
									<wcx:TabContainer runat="server" Width="100%">
										
										<TabPages>
											
											<wcx:TabPage runat="server" Title="Active Only">
												<wcx:FormView runat="server">
													<Items>
														<wcx:FormViewItemText runat="server" Title="Text Box" />
													</Items>
												</wcx:FormView>
											</wcx:TabPage>
											
											<wcx:TabPage runat="server" Title="Active and Inactive">
												another test
											</wcx:TabPage>
											
										</TabPages>
										
										<HeaderControls>
											<span style="display: inline-block;">Sort by: </span>
											<select class="uwt-system-control" style="display: inline-block;">
												<option>Name</option>
												<option>Date</option>
												<option>Owner</option>
											</select>
										</HeaderControls>
										
									</wcx:TabContainer>
									
								</wcx:StackPage>
								<wcx:StackPage runat="server" ID="tabTasks">
									
								</wcx:StackPage>
								<wcx:StackPage runat="server" ID="tabReports">
									
								</wcx:StackPage>
								<wcx:StackPage runat="server" ID="tabUsers">
									
								</wcx:StackPage>
							</Items>
						</wcx:StackContainer>
						
					</asp:Panel>
					
					<asp:Panel runat="server" id="StartPagePanel">
						
						<h1>Start here</h1>
						
						<wcx:ButtonGroup runat="server" Orientation="Vertical">
							
							<Buttons>
								
								<wcx:ButtonGroupButton runat="server" ID="btn1" Text="Businesses" Description="View a list of all businesses" />
								
								<wcx:ButtonGroupButton runat="server" ID="btn2" Text="Drivers" Description="View a list of all drivers" />
								
								<wcx:ButtonGroupButton runat="server" ID="btn3" Text="Vehicles" Description="View a list of all vehicles" />
								
							</Buttons>
							
						</wcx:ButtonGroup>
						
					</asp:Panel>
				</div>
			</div>
		
			<div class="uwt-footer">
				Copyright &copy; 2021 MBS Business Solutions
			</div>
			
			<wcx:Window runat="server" id="Window1" Title="Test Window">
				<ContentControls>
					
				</ContentControls>
				<FooterControls>
					<asp:Button id="button1" runat="server" Text="Click me!" OnClick="button1Clicked" />
				</FooterControls>
			</wcx:Window>
			
			<wcx:Popup runat="server" id="cmnu1_popup">
				<wcx:Menu runat="server" id="cmnu1">
					<Items>
						<wcx:MenuItem TargetURL="~/" Text="Cut" />
						<wcx:MenuItem TargetURL="~/" Text="Copy" />
						<wcx:MenuItem TargetURL="~/" Text="Paste" />
						<wcx:MenuItem TargetURL="~/" Text="Delete" />
						<wcx:SeparatorMenuItem />
						<wcx:MenuItem id="cmnu1_1" TargetURL="~/" Text="Properties..." />
					</Items>
				</wcx:Menu>
			</wcx:Popup>
		</form>
	</body>
</html>
