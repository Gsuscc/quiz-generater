create table if not exists questions
(
	id serial not null
		constraint questions_pk
			primary key,
	question varchar
);

create unique index if not exists questions_id_uindex
	on questions (id);