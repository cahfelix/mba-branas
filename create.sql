-- Habilita a extensão para usar uuid_generate_v4()
create extension if not exists "uuid-ossp";

-- comecar dropando o schema (cascade ja apaga tudo)
drop schema if exists branas cascade;

-- esse schema tera 3 tabelas mais 2 tabelas mais relevantes 
create schema branas;

-- o servico q estou tomando, que vou emitir notas fiscais, ou seja o contato que tenho com uma faculdade, com alguma empreteira
create table branas.contract (
    id_contract uuid not null default uuid_generate_v4() primary key,
    description text,
    amount numeric,
    periods integer,
    date timestamp
);

-- pagamento
create table branas.payment (
    id_payment uuid not null default uuid_generate_v4() primary key,
    id_contract uuid references branas.contract(id_contract),
    amount numeric,
    date timestamp
);


-- Inserção de dados
insert into branas.contract values(
  '1db48784-72ee-4f61-8be6-40df598b57ca',
  'Prestação de serviços escolares',
  6000,
  12,
  '2022-01-01 10:00:00'
);

insert into branas.payment values(
  'cfdde706-4bc0-46e5-b52c-a73b4e8b7294',
  '1db48784-72ee-4f61-8be6-40df598b57ca',
  6000,
  '2022-01-05 10:00:00'
);


-- no terminal
-- node
-- require("crypto").randomUUID() 
-- 1db48784-72ee-4f61-8be6-40df598b57ca
-- cfdde706-4bc0-46e5-b52c-a73b4e8b7294


-- psql -d app -f create.sql 
-- brew services start postgresql (caso postgree nao este startado)
-- psql -d app entrar no banco
-- select * from branas.contract;