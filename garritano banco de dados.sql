DROP DATABASE IF EXISTS garritano_database;

CREATE DATABASE garritano_database;

USE garritano_database;

CREATE TABLE `cargos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `data_criacao` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `setores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `data_criacao` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  `codigo_barras` varchar(100) DEFAULT NULL,
  `preco_venda` decimal(10,2) NOT NULL,
  `data_criacao` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `data_cadastro` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `funcionarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_completo` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cargo_id` int NOT NULL,
  `setor_id` int NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `data_cadastro` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  CONSTRAINT `fk_funcionarios_cargos` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`),
  CONSTRAINT `fk_funcionarios_setores` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cargos` (`id`, `nome`, `descricao`, `data_criacao`) VALUES
(1, 'Administrador', 'Acesso total ao sistema.', NOW()),
(2, 'Gerente', 'Gerencia equipes e processos específicos.', NOW()),
(3, 'Vendedor', 'Realiza vendas e interage com clientes.', NOW());

INSERT INTO `setores` (`id`, `nome`, `descricao`, `data_criacao`) VALUES
(1, 'Administrativo', 'Setor responsável pela gestão geral da empresa.', NOW()),
(2, 'Vendas', 'Setor responsável pelas vendas e relacionamento com clientes.', NOW()),
(3, 'Depósito', 'Setor responsável pelo armazenamento e controle de estoque.', NOW());

INSERT INTO `produtos` (`id`, `nome`, `descricao`, `codigo_barras`, `preco_venda`, `data_criacao`) VALUES
(1, 'Arroz Branco Tipo 1 (5kg)', 'Pacote de Arroz de grão longo e fino.', '7891234500010', 28.99, NOW()),
(2, 'Leite Integral (1L)', 'Caixa de Leite Integral, longa vida.', '7891234500027', 5.50, NOW()),
(3, 'Café Torrado e Moído (500g)', 'Café forte e encorpado para coador.', '7891234500034', 15.90, NOW()),
(4, 'Óleo de Soja (900ml)', 'Óleo vegetal para cozinha.', '7891234500041', 7.85, NOW());