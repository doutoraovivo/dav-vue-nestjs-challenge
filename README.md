<a src="https://www.doutoraovivo.com.br">
<figure>
    <img width="200px" src="./frontend/src/assets/logo-draovivo-site.png"
         alt="Logo do Doutor ao Vivo">
<figcaption>Perto de você, à qualquer distância.</figcaption>
</figure>
</a>

## Bem vindo ao Doutor ao Vivo
### Olá, que bom que está aqui...
Se você está vendo esse README.md quer dizer que em breve vamos bate-papo para te conhecer melhor. 
Por favor, leia esse texto até o fim antes de começar sua tarefa. Até breve

<hr /> 

Estamos sempre a procura de gente boa que se interesse por nossa missão:

## Ajudar os profissionais de saúde a cuidar de vidas de forma remota, segura e eficiente." 

Isso só é possível se existir uma plataforma de telemedicina acessível aos profissionais. É aí que o seu 
trabalho começa a fazer sentido.

### Queremos no nosso time pessoas:
<ou>
    <li>Curiosas: sempre tentando descobrir como algo funciona</li>
    <li>Questionadoras: será que não tem algo novo ou um caminho melhor para se fazer isso?</li>
    <li>Inovadoras: quero aprender mais e descobrir mais</li>
    <li>Time é tudo: trabalho em equipe sempre, o fim da sprint chega todo mundo junto</li>
    <li>Responsável: entrega é tudo, menos microgerenciamento, mais liberdade (exceto as cerimônias)</li>
</ou>

### Para que serve esse repositório?

Relaxa, não é um teste... tipo, é um teste, mas não é um TEEEEESTE. Esse repositório tem um pouco 
do passado, presente e futuro código do Doutor ao Vivo que você vai trabalhar. O que queremos aqui é:

<ou>
    <li>Senso de direção: sei olhar um código já feito, e entender a arquitetura e o porquê das coisas</li>
    <li>Senso de Eficiência: sei pegar um código pronto, e ser produtivo, criando novas funcionalidades, respeitando
a arquitetura, e não propagar código desnecessário ou ruim</li>
    <li>Senso crítico: sei olhar um código e criticá-lo, identificando pontos de atenção e sugerindo 
melhorias que se tornam cards futuros, contribuindo para a inovação da plataforma</li>
</ou>

Esse código não está 100% perfeito (de propósito). Fique a vontade para seguir os requisitos acima, será
nosso guia na entrevista para conversarmos sobre sua qualidade profissional e de código.

### Estrutura do projeto
Aqui no DaV usamos uma arquitetura de micro-serviços, e frontend separados. Esse projeto do desafio é um mono-repo 
com frontend em Vue.js e backend em NestJS (como workspaces), só juntamos para simplificar... 

Aqui simplificamos a definição de versão do node usando o NVM. Após usar o node certo, <code>npm install</code>
vai instalar as dependências dos dois projetos, que pode ser executado com um comando único: <code>npm start</code>. 

Tanto front quanto back são projetos independentes e pode ser executados em separado enquanto estão
sendo desenvolvidos. Use <code>npm run serve</code> na pasta frontend e <code>npm run start:dev</code> na pasta backend.
Vai executar os projetos em separado, em modo desevolvimento.

Caso você trave no setup do projeto, fique à vontade para perguntar. Mas o ideal é que você consiga ser
funcional com o mínimo de informação.

### Tarefa
<ol>
<li>Faça o fork desse projeto para sua conta do github para um repo privado com permissão para o usuário 'doutoraovivo'</li>
<li>Montar um CRUD de profissional.Os campos de criação e edição são:
    <ol>
        <li>Nome (ex: Josué Alcantara da Costa</li>
        <li>Registro (estrutura sigla-codigo-estado) (ex: CRM 12345/SP) Registro pode ser CRM, CRO e CRP. </li>
    </ol>
</li>
<li>Adicionar o campo estado em person (Filtros, Listagem, Edição).</li>
<li>Depois de caprichar, comite para seu código para seu repo e dê permissão para o usuário 'doutoraovivo'</li>
</ol>

Quando terminar, marque sua entrevista com o link do Calendly enviado junto com o convite desse desafio.
Estamos ansiosos para ver um pouco do seu trabalho e um pouco da sua trajetória.

Grande abraço.
