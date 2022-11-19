# ALL EVENTS API

Rest API with typescript that returns all events of a given city, whether seasonal or not


## Stack used

**Back-end:** Node.JS, Express, typescript and mongoDB.

**Tests:** Jest.

## Technique used

* Test-driven development (TDD)

![TDD](https://miro.medium.com/max/475/0*DiQd7JoB2X5C_Bng.png)






## Autor

- [@Andre-Rodrigues-Correia](https://github.com/Andre-Rodrigues-Correia)
## Instalação

Install all-events whith npm

```bash
  git clone https://github.com/Andre-Rodrigues-Correia/all-events.git
```
```bash
  cd all-events
```

```bash
  npm install
```

```bash
  npm start
```

***
***
***
# API documentation


**Country route**

*Return all countries*

```http
  GET /country
```
*Response body*
    
    [
        {
             "_id": "63793ae08978440b7897f462",
             "name": "Brasil",
             "coin": "R$",
             "createdAt": "2022-11-19T20:21:52.638Z",
             "updatedAt": "2022-11-19T20:21:52.638Z",
             "__v": 0
        },
        {
             "_id": "63793ae08978440b7897f81vf",
             "name": "Estados unidos",
             "coin": "$",
             "createdAt": "2022-11-19T20:21:52.638Z",
             "updatedAt": "2022-11-19T20:21:52.638Z",
             "__v": 0
        },

    ]
---
#### Return a country

```http
  GET /country/${id}
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. the id of the country you want |

*Response body*

    {
         "_id": "63793ae08978440b7897f462",
         "name": "Brasil",
         "coin": "R$",
         "createdAt": "2022-11-19T20:21:52.638Z",
         "updatedAt": "2022-11-19T20:21:52.638Z",
         "__v": 0
    }

---

#### Create a country

```http
  POST /country/
```

*Request body*

    {
         "name": "Brasil",
         "coin": "R$",
    }

*Response*

    {
         "_id": "63793ae08978440b7897f462",
         "name": "Brasil",
         "coin": "R$",
         "createdAt": "2022-11-19T20:21:52.638Z",
         "updatedAt": "2022-11-19T20:21:52.638Z",
         "__v": 0
    }

---
#### update a country

```http
  PATCH /country/${id}
```

*Request body*

    {
         "coin": "$",
    }

*Response*

    {
        message: "Country update with sucess"
    }

---
#### delete a country

```http
  DELETE /country/${id}
```
*Response*

    {
        message: "Country deleted with sucess"
    }


### **State route**

