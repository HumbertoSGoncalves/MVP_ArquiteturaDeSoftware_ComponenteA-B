# MVP Frontend - Adega Virtual Para Felinos

Este projeto contempla os requisitos para a entrega do MVP da **Sprint III: Arquitetura de Software** do curso de Pós Graduação em Engenharia de Software da PUC RIO.

O objetivo é utilizar do conteúdo ensinado durante as aulas para a criação de um sistema web em que seus diferentes componentes atuem como sistemas autônomos.
Este é um projeto de uma adega virtual para felinos com uma interface web simples. Ele permite que você gerencie vinhos, adicione notas e consulte informações sobre vinhos. Também apresenta fatos e imagens engraçadas de gatos usando APIs externas.

Para os códigos aqui encaminhados, será explorado o **componente A do MVP, assim como o B1 e B2, que são as APIs externas utilizadas**.

## Componente A - Frontend
O componente A escolhido para o projeto é o frontend que consiste em arquivos HTML (index.html), CSS (styles.css), e JavaScript (scripts.js). 

Todos estes arquivos fazem parte deste mesmo repositório.

## Componentes B1 e B2 - Externos

- **The Cat API**: Oferece acesso gratuito a uma grande variedade de imagens de gatos para fins de desenvolvimento e entretenimento.
Para obter imagens aleatórias de gatos, você pode fazer uma solicitação GET para o seguinte endpoint da API:
```
https://api.thecatapi.com/v1/images/search
```
Não é necessário incluir uma chave de API na solicitação, pois este endpoint permite acesso público.
Aqui está um exemplo de como fazer uma solicitação para obter uma imagem aleatória de um gato usando a API The Cat API em Python:
```
import requests

response = requests.get("https://api.thecatapi.com/v1/images/search")

if response.status_code == 200:
    data = response.json()
    image_url = data[0]['url']
    print(f"Imagem de um gato aleatório: {image_url}")
else:
    print("Não foi possível obter a imagem do gato.")
```
Lembre-se de que, embora não seja necessário usar uma chave de API para este endpoint, você ainda deve respeitar os termos de uso da API The Cat API conforme descrito em https://thecatapi.com/terms.

Para mais informações sobre a API The Cat API, incluindo detalhes sobre outros endpoints e recursos disponíveis, consulte a documentação oficial em https://thecatapi.com/api-docs/v1.

- **Cat fact API**: Fornece gratuitamente informações divertidas e cativantes sobre gatos, tornando-a uma ótima escolha para projetos relacionados a esses adoráveis animais.
Para obter fatos sobre gatos, você pode fazer uma solicitação GET para o seguinte endpoint da API:
```
https://cat-fact.herokuapp.com/facts/
```
Este endpoint permite acesso público e não requer uma chave de API para ser incluída na solicitação.
Aqui está um exemplo de como fazer uma solicitação para obter um fato aleatório sobre gatos usando a API Cat Fact em Python:
```
import requests

response = requests.get("https://cat-fact.herokuapp.com/facts/")

if response.status_code == 200:
    data = response.json()
    random_fact = data['all'][0]['text']
    print(f"Fato aleatório sobre gatos: {random_fact}")
else:
    print("Não foi possível obter o fato sobre gatos.")
```
Certifique-se de respeitar os termos de uso da API Cat Fact conforme descrito em https://cat-fact.herokuapp.com/terms.
Para mais informações sobre a API Cat Fact, incluindo detalhes sobre outros endpoints e recursos disponíveis, consulte a documentação oficial em https://cat-fact.herokuapp.com/#/.


---
## Como executar

Basta clonar o projeto e abrir o arquivo index.html no browser de sua preferência para a execução.

## Executando com Docker

Você pode executar o projeto em um contêiner Docker. 
Certifique-se de ter o Docker instalado no seu sistema.

Clone o repositório para o seu computador (se já não o fez):

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

1. Navegue até o diretório do projeto:
```
cd nome-do-repositorio
```

2. Construa a imagem Docker (o nome da imagem é de sua escolha, utilizei "componente_a"no exemplo abaixo):
```
docker build -t nome_da_imagem .
```

3. Execute o contêiner Docker:

```
docker run -p 8080:80 nome_da_imagem
```

4. O aplicativo estará acessível no seu navegador em http://localhost:8080.


Lembre-se de que você pode personalizar o nome da imagem Docker (nome_da_imagem).

Para encerrar a execução do contêiner, você pode pressionar Ctrl+C no terminal onde o contêiner está sendo executado.

Independente do modo de execução, recomendo estar com o backend rodando para que seja possível performar os testes do frontend com maior consistência, de forma a permitir com que atualizações na página persistam os dados incluídos previamente.

Componente do backend: 
