# Country route

### Return all states

```http
  GET /state
```
*Response body*
    
    [
        {
         "name": "Espírito Santo",
         "initials": "ES",
         "country": "638142111f25c590d2805a55",
         "_id": "638147602c1761b495c53d4a",
         "createdAt": "2022-11-25T22:53:20.196Z",
         "updatedAt": "2022-11-25T22:53:20.196Z",
         "__v": 0
        }

    ]
---
#### Return a state

```http
  GET /state/${id}
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. the id of the state you want |

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

#### send a state

```http
  POST /state/
```

*Request body*

    {
         "name": "Espírito Santo",
         "initials": "ES",
         "country": "638142111f25c590d2805a55"
    }

*Response*

    {
         "name": "Espírito Santo",
         "initials": "ES",
         "country": "638142111f25c590d2805a55",
         "_id": "638147602c1761b495c53d4a",
         "createdAt": "2022-11-25T22:53:20.196Z",
         "updatedAt": "2022-11-25T22:53:20.196Z",
         "__v": 0
    }

---
#### update a state

```http
  PATCH /state/${id}
```

*Request body*

    {
         "Name": "other name",
    }

*Response*

    {
        message: "State update with sucess"
    }


#### delete a state

```http
  DELETE /state/${id}
```
*Response*

    {
        message: "State deleted with sucess"
    }


