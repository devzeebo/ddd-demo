insert into [todo-list].[dbo].[TodoBoard] (id, name) values ('0a91e0b8-f2b8-4a0a-8b41-b77cef1f5cd5', 'DDD Presentation');

insert into [todo-list].[dbo].[TodoGroup] (id, name, todoBoardId) values ('aab496df-d44c-41ef-b164-48a3354bfd5e', 'Todo', '0a91e0b8-f2b8-4a0a-8b41-b77cef1f5cd5');
insert into [todo-list].[dbo].[TodoGroup] (id, name, todoBoardId) values ('1bee1f3e-1d98-49c4-8451-48b71f1abbd8', 'In Progress', '0a91e0b8-f2b8-4a0a-8b41-b77cef1f5cd5');
insert into [todo-list].[dbo].[TodoGroup] (id, name, todoBoardId) values ('4f57167a-5ee4-44e0-a783-522fbcf54963', 'Done', '0a91e0b8-f2b8-4a0a-8b41-b77cef1f5cd5');

insert into [todo-list].[dbo].[Todo] (id, title, completed, todoGroupId) values ('3dd8ed8e-2aae-4b55-805b-1adbf17498b6', 'Create Front End', 0, '1bee1f3e-1d98-49c4-8451-48b71f1abbd8');
insert into [todo-list].[dbo].[Todo] (id, title, completed, todoGroupId) values ('28b7a86d-1dd1-4f22-a1c5-295e7e4849ff', 'Create Back End', 0, '1bee1f3e-1d98-49c4-8451-48b71f1abbd8');
insert into [todo-list].[dbo].[Todo] (id, title, completed, todoGroupId) values ('685c5b96-e603-4450-a629-055aece78eed', 'Create Powerpoint', 0, 'aab496df-d44c-41ef-b164-48a3354bfd5e');
