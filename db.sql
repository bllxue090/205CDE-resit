create table user (
	ID int(11) auto_increment not null,
    Username varchar(32) not null,
    Password varchar(32)  not null,
    Name varchar(255)  not null,
    Email varchar(255)  not null,
    Access int(11)  not null,
    Created timestamp  not null DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`)
);

$db->exec("create table user (
	ID integer(4) PRIMARY KEY autoincrement,
    Username varchar(32) not null,
    Password varchar(32)  not null,
    Name varchar(255)  not null,
    Email varchar(255)  not null,
    Access integer(11)  not null,
    Created timestamp  not null DEFAULT CURRENT_TIMESTAMP
)");

$db->exec("create table user (
	ID integer(4) PRIMARY KEY,
    Username varchar(32) not null,
    Password varchar(32)  not null,
    Name varchar(255)  not null,
    Email varchar(255)  not null,
    Access integer(11)  not null,
    Created timestamp  not null DEFAULT CURRENT_TIMESTAMP
)");

insert into course
(name, start, end, totalnumber, currentnumber, decription,creater,created)
values
('maths', CURRENT_TIMESTAMP,'2017/09/01 00:00:00',50,0,'maths in summer', 4, CURRENT_TIMESTAMP)

insert into user
(ID, Username, Password, Name, Email, Access)
values
(null, 'admin','1','admin','admin@admin.com', 3)

drop table answer;

drop table course;

drop table courseapply;

drop table discussion;

drop table question;

drop table reply;

drop table "user";

create table "user" (
ID                   INTEGER                        not null,
Username             VARCHAR(32),
Password             VARCHAR(32),
Name                 VARCHAR(255),
Email                VARCHAR(255),
Access               INTEGER,
Created              TIMESTAMP,
primary key (ID)
);

create table course (
ID                   integer PRIMARY KEY autoincrement,
name                 VARCHAR(100),
start                TIMESTAMP,
end                  TIMESTAMP,
totalnumber          INTEGER,
currentnumber        INTEGER,
decription           LONG VARBINARY,
creater              INTEGER,
created              TIMESTAMP,
foreign key (creater)
      references "user" (ID)
);

create table question (
ID                   integer PRIMARY KEY autoincrement,
content              LONG VARBINARY,
"From"               INTEGER,
time                 TIMESTAMP,
course               INTEGER,
foreign key (course)
      references course (ID)
);

create table answer (
question             INTEGER,
answer               LONG VARBINARY,
createtime           TIMESTAMP,
foreign key (question)
      references question (ID)
);

create table courseapply (
"user"               INTEGER,
course               INTEGER,
foreign key ("user")
      references "user" (ID),
foreign key (course)
      references course (ID)
);

create table discussion (
discussionid         integer PRIMARY KEY autoincrement,
course               INTEGER,
title                LONG VARBINARY,
createtime           TIMESTAMP,
foreign key (course)
      references course (ID)
);

create table reply (
discussionID         INTEGER,
content              LONG VARBINARY,
creater              INTEGER,
createtime           TIMESTAMP,
foreign key (discussionID)
      references discussion (discussionid)
);
