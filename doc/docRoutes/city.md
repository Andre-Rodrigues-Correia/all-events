# City route

### Return all states

```http
  GET /city
```
*Response body*
    
    [
        {
         "name": "city",
         "state": "638142111f25c590d2805a55",
         "_id": "6381560d2c1761b495c53d4d",
         "createdAt": "2022-11-25T23:55:57.822Z",
         "updatedAt": "2022-11-25T23:55:57.822Z",
         "__v": 0
        }

    ]
---
#### Return a city

```http
  GET /city/${id}
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. the id of the city you want |

*Response body*

    {
         "name": "city",
         "state": "638142111f25c590d2805a55",
         "_id": "6381560d2c1761b495c53d4d",
         "createdAt": "2022-11-25T23:55:57.822Z",
         "updatedAt": "2022-11-25T23:55:57.822Z",
         "__v": 0
    }

---

#### send a state

```http
  POST /state/
```

*Request body*

    {
         "name": "city",
         "state": "638142111f25c590d2805a55"
    }

*Response*

    {
         "name": "city",
         "state": "638142111f25c590d2805a55",
         "_id": "6381560d2c1761b495c53d4d",
         "createdAt": "2022-11-25T23:55:57.822Z",
         "updatedAt": "2022-11-25T23:55:57.822Z",
         "__v": 0
    }

---
#### update a city

```http
  PATCH /city/${id}
```

*Request body*

    {
         "Name": "other name",
    }

*Response*

    {
        message: "City update with sucess"
    }


#### delete a city

```http
  DELETE /city/${id}
```
*Response*

    {
        message: "City deleted with sucess"
    }


