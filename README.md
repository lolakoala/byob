# BYOB-Build Your Own Backend

//*****INTRO THE PROJECT!*****//

//*****INTRO THE PROJECT!*****//

//*****INTRO THE PROJECT!*****//


## Endpoints

### GET Houses

```
Get Houses
```

#### Descrition

- returns an array of all House records.

#### Example

```
'/api/v1/houses'
```

#### returns: 

```
[
  {
    "id": 17,
    "name": "DogHouse",
    "secretKey": "oiuhasrfou",
    "created_at": "2017-12-14T04:23:29.966Z",
    "updated_at": "2017-12-14T04:23:29.966Z"
  },
  {
    "id": 18,
    "name": "CatHouse",
    "secretKey": "234tewrf",
    "created_at": "2017-12-14T04:23:29.966Z",
    "updated_at": "2017-12-14T04:23:29.966Z"
  },
  {
    "id": 19,
    "name": "BirdHouse",
    "secretKey": "098ht4t",
    "created_at": "2017-12-14T04:23:29.966Z",
    "updated_at": "2017-12-14T04:23:29.966Z"
  }
]
```

### GET users

```
GET users
```

#### Descrition

- Returns an array of all user records.

#### Example

```
'/api/v1/users'
```

#### returns: 

```
  [
    {
      "name": "Lola", 
      "houseId": "1" 
    },
    { 
      "name": "Nik", 
      "houseId": "1" 
    },
    { 
      "name": "Rufus", 
      "houseId": "1" 
    }
  ]
```

### GET users by Id

```
GET users:id
```

#### Descrition

- returns a specific user.

#### Example

```
'/api/v1/users/:id'
```

#### returns: 

```
{ 
  name: 'Lola', 
  houseId: 1 
}
```
### GET users by houseId

```
GET users:houseId
```

#### Descrition

- returns an array of users belonging to a specific house.

#### Example

```
'/api/v1/houses/:id/users'
```

#### returns: 

```
[
  { 
    "name": "Lola",
    "houseId": "1" 
  },
  { 
    "name": "Nik", "houseId": "1" 
  },
  { 
    "name": "Rufus", "houseId": "1"
  },
  { 
    "name": "Adam",
    "houseId": "1" 
  },
  { 
    "name": "Alex",
    "houseId": "1"
  }
]
```

### GET bills for a specific house

```
GET bills:houseId
```

#### Descrition

- Returns an array of all bills records for a specific house.

#### Example

```
'/api/v1/houses/:houseId/bills'
```

#### returns: 

```
[
 {
    name: 'electricity',
    total: '101.23',
    dueDate: '12/31/17',
    houseId: 1
  },
  {
    name: 'water',
    total: '99.67',
    dueDate: '12/30/17',
    houseId: 2
  },
  {
    name: 'trash',
    total: '99.67',
    dueDate: '12/30/17',
    houseId: 3
  }
]
```

### GET chores for a specific house

```
GET chores:houseId
```

#### Descrition

- Returns an array of all chores records for a specific house.

#### Example

```
'/api/v1/houses/:houseId/chores'
```

#### returns: 

```
[
  {
    "name": "sweep the front deck",
    "details": "get this done today!",
    "userId": "1",
    "houseId": "1"
  },
  {
    "name": "sweep the back deck",
    "details": "get this done tomorrow!",
    "userId": "2",
    "houseId": "2"
  },
  {
    "name": "sweep the stairs",
    "details": "get this done now!æ,
    "userId": "3",
    "houseId": "3"
  },
]
```

### GET bills for a specific house

```
Get bills:houseId
```

#### Descrition

- returns an array of buelletins records for a specific house.

#### Example

```
'/api/v1/houses/:houseId/bulletins'
```

#### returns: 

```
[
  {
    "title": "May Bulletin",
    "body": "May news",
    "houseId": "1"
  },
  {
    "title": "June Bulletin",
    "body": "June news",
    "houseId": "1"
  },
]
```
### POST houses

```
POST houses
```

#### Descrition

- adds a house record to the houses table in the database.

#### Example

```
'/api/v1/houses'
```

#### returns: 

```
{
  id: 45
}
```

### POST users

```
POST users
```

#### Descrition

- adds a new user record to the users table in the database.

#### Example

```
'/api/v1/houses/:houseId/users'
```

#### returns: 

```
{
  id: 46
}

```

### POST bills

```
POST bills
```

#### Descrition

- adds a bill record to the bills table in the database.

#### Example

```
'/api/v1/houses/:houseId/bills'
```

#### returns: 

```
{
  id: 201
}
```
### POST chores

```
POST chores
```

#### Descrition

- adds a chore record to the chores table in the database.

#### Example

```
'/api/v1/houses/:houseId/chores'
```

#### returns: 

```
{
  id: 9
}

```

### POST bulletins

```
POST bulletins
```

#### Descrition

- adds a new bulletin record to the bulletins table in the database.

#### Example

```
'/api/v1/houses/:houseId/bulletins'
```

#### returns: 

```
{
  id: 204
}
```

### PATCH houses

```
PATCH houses
```

#### Descrition

- updates a house record on the houses table in the database.

#### Example

```
'/api/v1/houses/:id'
```

#### returns: 

```
returns status 204
```

### PATCH users

```
PATCH users
```

#### Descrition

- updates a user record on the users table in the database.

#### Example

```
'/api/v1/users/:id'
```

#### returns: 

```
returns status 204
```
### PATCH bills

```
PATCH bills
```

#### Descrition

- updates a bill record on the bills table in the database.

#### Example

```
'/api/v1/houses/:houseId/bills/:id'
```

#### returns: 

```
returns status 204
```

### PATCH chores

```
PATCH chores
```

#### Descrition

- updates a chore record on the chores table in the database.

#### Example

```
'/api/v1/houses/:houseId/chores/:id'
```

#### returns: 

```
returns status 204
```

### PATCH bulletins

```
PATCH bulletins
```

#### Descrition

- updates a bulletin record on the bulletins table in the database.

#### Example

```
'/api/v1/houses/:houseId/bulletins/:id'
```

#### returns: 

```
returns status 204
```

### DELETE bills

```
DELETE bills
```

#### Descrition

- removes a bill record from the bills table in the database.

#### Example

```
'/api/v1/houses/:houseId/bills/:id'
```

#### returns: 

```
returns status 204
```

### DELETE chores

```
DELTE chores
```

#### Descrition

- removes a chore record from the chores table in the database.

#### Example

```
'/api/v1/houses/:houseId/chores/:id'
```

#### returns: 

```
returns status 204
```

### DELETE bulletins

```
DELTE bulletins
```

#### Descrition

- removes a bulletin record from the bulletins table in the database.

#### Example

```
'/api/v1/houses/:id/bulletins/:id'
```

#### returns: 

```
returns status 204
```


