create database dbnode1;

use dbnode1;

create table produtos(
id int auto_increment primary key,
nome varchar(100) not null,

valor_compra decimal(10,2) not null,
valor_venda decimal(10,2) not null,
estoque_minimo integer ,
estoque_atual integer not null,
dt_cadastro datetime

):

