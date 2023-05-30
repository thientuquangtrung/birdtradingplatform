raiserror('Creating BTP database....',0,1)
SET NOCOUNT ON
GO

USE [master]
GO

DROP DATABASE IF EXISTS [BTP]
GO

CREATE DATABASE [BTP]
GO

USE [BTP]
GO

CREATE TABLE [dbo].[Category](
	[id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[name] [nvarchar](50) NOT NULL
)
GO

CREATE TABLE [dbo].[Account](
	[id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT	NEWID(),
	[name] [nvarchar](50) NOT NULL,
	[phone] [varchar](12) NOT NULL,
	[email] [varchar](30) NOT NULL,
	[image] [varchar](50) NULL,
	--password: default = 1
	[password] [char](60) NOT NULL default('$2b$10$ylq7uAkc3MUJipxNmfNkPOWDsmgkepuhTLPcT0LERVGrc2p.yjg8G'),
	[enabled] [bit] NOT NULL default(1),
	[role] [varchar](255) NOT NULL
)
GO

CREATE TABLE [dbo].[Seller](
	[id] [UNIQUEIDENTIFIER] PRIMARY KEY references [Account](id) NOT NULL,
	[pickUpAddress] [nvarchar](500) NOT NULL,
	[description] [nvarchar](max) NULL
)
GO

CREATE TABLE [dbo].[Customer](
	[id] [UNIQUEIDENTIFIER] PRIMARY KEY references [Account](id) NOT NULL,
	[category] varchar(50) NOT NULL CHECK([category] IN ('Gold','Silver','Copper')),
	[shipToAddress] [nvarchar](500) NOT NULL
)
GO

CREATE TABLE [dbo].[Product](
	[id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[shopId] [UNIQUEIDENTIFIER] references [Seller](id) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[price] [float] NOT NULL,
	[image] [varchar](50) NOT NULL,
	[categoryId] [int] references Category(id) NOT NULL,
	[enabled] [bit] default (1)
)
GO

CREATE TABLE [dbo].[OrderHeader](
	[id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[date] [datetime] NOT NULL,
	[status] [varchar](30) NULL,
	[customerId] [UNIQUEIDENTIFIER] references Customer(id) NOT NULL,
	[shopId] [UNIQUEIDENTIFIER] references Seller(id) NOT NULL
)
GO
CREATE TABLE [dbo].[OrderDetail](
	[id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[orderHeaderId] [int] references OrderHeader(id) NOT NULL,
	[productId] [int] references Product(id) NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [float] NOT NULL
)
GO

CREATE TABLE [dbo].[Feedback](
	[id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[customerId] [UNIQUEIDENTIFIER] references Customer(id) NOT NULL,
	[shopId] [UNIQUEIDENTIFIER] references Seller(id) NOT NULL,
	[productId] [int] references Product(id) NOT NULL,
	[image] [varchar](50) NOT NULL,
	[content] [nvarchar](max) NOT NULL,
)
GO

SET IDENTITY_INSERT [dbo].[Category] ON
INSERT [dbo].[Category] ([id], [name]) VALUES (1, N'Chim cảnh')
INSERT [dbo].[Category] ([id], [name]) VALUES (2, N'Thức ăn')
INSERT [dbo].[Category] ([id], [name]) VALUES (3, N'Phụ kiện')
SET IDENTITY_INSERT [dbo].[Category] OFF

SET NOCOUNT OFF
raiserror('The BTP database in now ready for use.',0,1)
GO

