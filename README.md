# BYOB-Build Your Own Backend

This API provides access to sample data for the TRIBE app.
Tribe is an communal living management app intended for a group of housemates to keep track of bulletins, bills, and chores.


## Endpoints

### POST Authentication

```
POST Authentication
```

#### Description:

- Issues the user a JWT according to the authorization level.
- User will need to submit email and application name in order to be issued a JWT.
- Only users with a valid email ending in @turing.io will be granted "Admin" privileges to be able to POST, PUT, PATCH, DELETE.
- At the root page of the application, there is a form you can submit for a JWT.

#### Example

```
fetch('/api/v1/houses', {
  method: 'POST',
  body: JSON.stringify({
    appName: 'Lola',
    email: 'lola@turing.io',
    admin: true
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
```

### GET Houses

```
Get Houses
```

#### Description

- Returns an array of all House records.

#### Example

```
fetch('./api/v1/houses');
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
fetch('./api/v1/users')
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

- Returns a specific user.

#### Example

```
fetch('./api/v1/users/:id')
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

#### Description

- Returns an array of users belonging to a specific house.

#### Example

```
fetch('./api/v1/houses/:id/users')
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

#### Description

- Returns an array of all bills records for a specific house.

#### Example

```
fetch('./api/v1/houses/:houseId/bills')
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

#### Description

- Returns an array of all chores records for a specific house.

#### Example

```
fetch('./api/v1/houses/:houseId/chores')
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

#### Description

- Returns an array of bulletins records for a specific house.

#### Example

```
fetch('./api/v1/houses/:houseId/bulletins')
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

#### Description

- Adds a house record to the houses table in the database.
- You must include your token in the body, as well as a name and secretKey property.

#### Example

```
fetch('./api/v1/houses', {
  method: 'POST',
  body: JSON.stringify({
    name: 'My House',
    secretKey: 'password'
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
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

#### Description

- Adds a new user record to the users table in the database.
- You must include your token in the body, as well as a name property.

#### Example

```
fetch('./api/v1/houses/:houseId/users', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Name',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
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

#### Description

- Adds a bill record to the bills table in the database.
- You must include your token in the body, as well as a name, total, and dueDate property.

#### Example

```
fetch('./api/v1/houses/:houseId/bills', {
  method: 'POST',
  body: JSON.stringify({
    name: 'electric',
    total: '100',
    dueDate: '12/12/17',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
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

#### Description

- Adds a chore record to the chores table in the database.
- You must include your token in the body, as well as a name, and details property.

#### Example

```
fetch('./api/v1/houses/:houseId/chores', {
  method: 'POST',
  body: JSON.stringify({
    name: 'sweep',
    details: 'the kitchen',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
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

#### Description

- Adds a new bulletin record to the bulletins table in the database.
- You must include your token in the body, as well as a body and title property.

#### Example

```
fetch('./api/v1/houses/:houseId/bulletins', {
  method: 'POST',
  body: JSON.stringify({
    title: 'News',
    body: 'more news',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
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

#### Description

- Updates a house record on the houses table in the database.
- You must include your token in the body, as well as any property you wish to change.

#### Example

```
fetch('./api/v1/houses/:id', {
  method: 'PATCH',
  body: JSON.stringify({
    name: 'My House',
    secretKey: 'password'
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
```

#### returns:

```
returns status 204
```

### PATCH users

```
PATCH users
```

#### Description

- Updates a user record on the users table in the database.
- You must include your token in the body, as well as any property you wish to change.

#### Example

```
fetch('./api/v1/users/:id', {
  method: 'PATCH',
  body: JSON.stringify({
    name: 'Name',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
```

#### returns:

```
returns status 204
```
### PATCH bills

```
PATCH bills
```

#### Description

- Updates a bill record on the bills table in the database.
- You must include your token in the body, as well as any property you wish to change.

#### Example

```
fetch('./api/v1/houses/:houseId/bills/:id', {
  method: 'PATCH',
  body: JSON.stringify({
    name: 'electric',
    total: '100',
    dueDate: '12/12/17',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

#### returns:

```
returns status 204
```

### PATCH chores

```
PATCH chores
```

#### Description

- Updates a chore record on the chores table in the database.
- You must include your token in the body, as well as any property you wish to change.

#### Example

```
fetch('./api/v1/houses/:houseId/chores/:id', {
  method: 'PATCH',
  body: JSON.stringify({
    name: 'sweep',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

#### returns:

```
returns status 204
```

### PATCH bulletins

```
PATCH bulletins
```

#### Description

- Updates a bulletin record on the bulletins table in the database.
- You must include your token in the body, as well as any property you wish to change.

#### Example

```
fetch('./api/v1/houses/:houseId/bulletins/:id', {
  method: 'PATCH',
  body: JSON.stringify({
    title: 'News',
    body: 'more news',
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

#### returns:

```
returns status 204
```

### DELETE bills

```
DELETE bills
```

#### Description

- Removes a bill record from the bills table in the database.
- You must include your token in the body.

#### Example

```
fetch('./api/v1/houses/:houseId/bills/:id', {
  method: 'DELETE',
  body: JSON.stringify({
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

#### returns:

```
returns status 204
```

### DELETE chores

```
DELTE chores
```

#### Description

- Removes a chore record from the chores table in the database.
- You must include your token in the body.

#### Example

```
fetch('./api/v1/houses/:houseId/chores/:id', {
  method: 'DELETE',
  body: JSON.stringify({
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

#### returns:

```
returns status 204
```

### DELETE bulletins

```
DELTE bulletins
```

#### Description

- Removes a bulletin record from the bulletins table in the database.
- You must include your token in the body.

#### Example

```
fetch('./api/v1/houses/:houseId/bulletins/:id', {
  method: 'DELETE',
  body: JSON.stringify({
    token: 'yourTokenHere'
    }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

#### returns:

```
returns status 204
```
