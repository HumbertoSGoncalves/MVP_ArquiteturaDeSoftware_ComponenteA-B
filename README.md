# MVP Frontend - Virtual Wine Cellar for Felines

This project encompasses the requirements for the delivery of the MVP for **Sprint III: Software Architecture** of the postgraduate program in Software Engineering at PUC RIO.

The objective is to use the content taught during the classes to create a web system where its different components function as autonomous systems. This project is a virtual wine cellar for felines with a simple web interface. It allows you to manage wines, add notes, and view information about wines. It also features fun facts and images of cats using external APIs.

For the code provided here, **Component A of the MVP will be explored, along with B1 and B2, which are the external APIs used**.

## Componente A - Frontend

The chosen Component A for the project is the frontend, which consists of HTML files (index.html), CSS files (styles.css), and JavaScript files (scripts.js).

All these files are part of the same repository.

## Componentes B1 e B2 - Externos

- **The Cat API**: Offers free access to a wide variety of cat images for development and entertainment purposes.
To get random cat images, you can make a GET request to the following API endpoint:
```
https://api.thecatapi.com/v1/images/search
```
No API key is required for the request, as this endpoint allows public access.
Here is an example of how to make a request to get a random cat image using The Cat API in Python:
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
Remember that, although an API key is not required for this endpoint, you should still adhere to the terms of use of The Cat API as described in:
https://thecatapi.com/terms.

For more information about The Cat API, including details about other endpoints and available features, refer to the official documentation at [https://thecatapi.com/api-docs/v1](https://thecatapi.com/api-docs/v1).

- **Cat fact API**: Provides free, fun, and engaging information about cats, making it a great choice for projects related to these adorable animals. To get facts about cats, you can make a GET request to the following API endpoint:
```
https://cat-fact.herokuapp.com/facts/
```
This endpoint allows public access and does not require an API key to be included in the request.
Here is an example of how to make a request to get a random cat fact using the Cat Fact API in Python:
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
Make sure to adhere to the terms of use of the Cat Fact API as described at [https://cat-fact.herokuapp.com/terms](https://cat-fact.herokuapp.com/terms). For more information about the Cat Fact API, including details about other endpoints and available features, refer to the official documentation at [https://cat-fact.herokuapp.com/#/](https://cat-fact.herokuapp.com/#/).

---
## How to Run

Simply clone the project and open the `index.html` file in your preferred browser to run it.

## Running with Docker

You can run the project in a Docker container. 
Make sure you have Docker installed on your system.

Clone the repository to your computer (if you haven’t already):

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

1. Navigate to the project directory:
```
cd nome-do-repositorio
```

2. Build the Docker image (the name of the image is up to you; I used "componente_a" in the example below):
```
docker build -t nome_da_imagem .
```

3. Run the docker container:

```
docker run -p 8080:80 nome_da_imagem
```

4. The application will be accessible in your browser at http://localhost:8080.


Remember that you can customize the Docker image name (`image_name`).

To stop the container, you can press Ctrl+C in the terminal where the container is running.

Regardless of the execution mode, I recommend having the backend running to ensure more consistent frontend testing, allowing page updates to persist previously entered data.
