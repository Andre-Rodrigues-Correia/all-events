# Country route

### Return all countries

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

#### send a country

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


#### delete a country

```http
  DELETE /country/${id}
```
*Response*

    {
        message: "Country deleted with sucess"
    }


