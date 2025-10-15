# Sistema de Monitoramento de Chamados de TI

Este projeto é um sistema simples de monitoramento de chamados técnicos desenvolvido utilizando **HTML**, **CSS** e **JavaScript**. O sistema permite a **abertura de chamados**, **atribuição de técnicos responsáveis**, **atualização de status** e **comentários** para acompanhamento do progresso. Os dados são armazenados no **localStorage**, o que garante a persistência dos dados mesmo após o recarregamento da página.

## Funcionalidades

- **Abertura de Chamados**: O usuário pode abrir um chamado especificando título, prioridade, categoria, técnico responsável e descrição.
- **Atribuição de Técnico**: O técnico responsável é atribuído ao chamado durante a sua criação.
- **Atualização de Status**: O status dos chamados pode ser atualizado (Pendente, Em Progresso, Concluído).
- **Comentários**: O sistema pode ser expandido para permitir comentários sobre os chamados.
- **Persistência de Dados**: Os chamados são armazenados no **localStorage**, permitindo que os dados permaneçam entre recarregamentos da página.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página e formulários.
- **CSS**: Estilo básico para a interface.
- **JavaScript**: Lógica para interações com o sistema, manipulação de dados e persistência no **localStorage**.
- **IDE**: Visual Studio Code.

## Diagrama UML

O diagrama UML deste sistema pode ser visualizado na seção abaixo:

1. **Diagrama de Casos de Uso**: Define os principais atores (Usuário, Técnico, Administrador) e suas interações com o sistema.
2. **Diagrama de Classes**: Representa a estrutura do sistema, incluindo as classes `Chamado`, `Usuario`, `Tecnico`, e `Administrador`.

