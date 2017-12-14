const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const checkParams = require('./checkParams.js');

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/api/v1/houses', (request, response) => {
  database('houses').select()
    .then(houses => {
      return response.status(200).json(houses);
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(users => {
      return response.status(200).json(users);
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/users/:id', (request, response) => {
  database('users').where('id', request.params.id).select()
    .then(user => {
      if (user.length) {
        return response.status(200).json(user);
      } else {
        return response.status(404).json({ error: `No user for id ${request.params.id}`});
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/houses/:id/users', (request, response) => {
  database('users').where('houseId', request.params.id).select()
    .then(users => {
      if (users.length) {
        return response.status(200).json(users);
      } else {
        return response.status(404).json({ error: `No saved users for house ${request.params.id}`});
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/houses/:houseId/bills', (request, response) => {
  const billName = request.param('name');

  database('bills').where('houseId', request.params.houseId).select()
    .then(bills => {
      if (bills.length && billName) {
        const matchingBills = bills.filter(bill => bill.name.toLowerCase() === billName.toLowerCase());
        if (matchingBills.length) {
          return response.status(200).json(matchingBills);
        } else {
          return response.status(404).json({ error: `No bills have the name ${billName}.`});
        }
      }
      if (bills.length) {
        return response.status(200).json(bills);
      } else {
        return response.status(404).json({ error: `No saved bills for house ${request.params.houseId}`});
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/houses/:houseId/chores', (request, response) => {
  database('chores').where('houseId', request.params.houseId).select()
    .then(chores => {
      if (chores.length) {
        return response.status(200).json(chores);
      } else {
        return response.status(404).json({ error: `No saved chores for house ${request.params.houseId}`});
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/houses/:houseId/bulletins', (request, response) => {
  database('bulletins').where('houseId', request.params.houseId).select()
    .then(bulletins => {
      if (bulletins.length) {
        return response.status(200).json(bulletins);
      } else {
        return response.status(404).json({ error: `No saved chores for house ${request.params.houseId}`});
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/houses', (request, response) => {
  const house = request.body;

  let approved = checkParams(['name', 'secretKey'], house, response)

  database('houses').where('secretKey', house.secretKey).select()
    .then(houses => {
      if (houses.length) {
        return response.status(422).json({
          error: 'A house with that secret key already exists.'
        });
      }
    })
    .then(() => {
      database('houses').insert(house, 'id')
        .then(house => {
          return response.status(201).json({ id: house[0] });
        })
        .catch(error => {
          return response.status(500).json({ error });
        });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/houses/:houseId/users', (request, response) => {
  const { houseId } = request.params;
  const user = Object.assign({ houseId }, request.body);

  checkParams(['name', 'houseId'], user, response);

  database('houses').where('id', houseId).select()
    .then(house => {
      if (!house) {
        response.status(422).json({
          error: 'There is no house with id specified.'
        });
      }
    })
    .then(
      database('users').where('name', user.name).where('houseId', houseId).select()
        .then(users => {
          if (users.length) {
            return response.status(422).json({
              error: 'A user with that name already exists in the house specified.'
            });
          }
        })
        .then(() => {
          database('users').insert(user, 'id')
            .then(user => {
              return response.status(201).json({ id: user[0] });
            })
            .catch(error => {
              return response.status(500).json({ error });
            });
        })
        .catch(error => {
          return response.status(500).json({ error });
        })
    )
    .catch(error => {
      return response.status(500).json({ error });
    });

});

app.post('/api/v1/houses/:houseId/bills', (request, response) => {
  const { houseId } = request.params;
  const bill = Object.assign({ houseId }, request.body);

  checkParams(['name', 'total', 'dueDate', 'houseId'], bill, response);

  database('houses').where('id', houseId).select()
    .then(house => {
      if (!house) {
        response.status(422).json({
          error: 'There is no house with id specified.'
        });
      }
    })
    .then(() => {
      database('bills').insert(bill, 'id')
        .then(bill => {
          return response.status(201).json({ id: bill[0] });
        })
        .catch(error => {
          return response.status(500).json({ error });
        });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/houses/:houseId/chores', (request, response) => {
  const { houseId } = request.params;
  const chore = Object.assign({ houseId }, request.body);

  checkParams(['name', 'details', 'userId', 'houseId'], chore, response);

  database('houses').where('id', houseId).select()
    .then(house => {
      if (!house) {
        response.status(422).json({
          error: 'There is no house with id specified.'
        });
      }
    })
    .then(() => {
      database('chores').insert(chore, 'id')
        .then(chore => {
          return response.status(201).json({ id: chore[0] });
        })
        .catch(error => {
          return response.status(500).json({ error });
        });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/houses/:houseId/bulletins', (request, response) => {
  const { houseId } = request.params;
  const bulletin = Object.assign({ houseId }, request.body);

  checkParams(['title', 'body', 'houseId'], bulletin, response);

  database('houses').where('id', houseId).select()
    .then(house => {
      if (!house) {
        response.status(422).json({
          error: 'There is no house with id specified.'
        });
      }
    })
    .then(() => {
      database('bulletins').insert(bulletin, 'id')
        .then(bulletin => {
          return response.status(201).json({ id: bulletin[0] });
        })
        .catch(error => {
          return response.status(500).json({ error });
        });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.patch('/api/v1/houses/:id', (request, response) => {
  const { id } = request.params;
  const updatedHouse = request.body;

  if (updatedHouse.id) {
    return response.status(422).json({
      error: 'You cannot change a house id.'
    });
  }

  database('houses').where('id', id).update(updatedHouse, '*')
    .then(results => {
      if (!results.length) {
        return response.status(404).json({ error: `Cannot find a house with the id of ${id}` });
      }
      return response.sendStatus(204);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const updatedUser = request.body;

  if (updatedUser.id) {
    return response.status(422).json({
      error: 'You cannot change a user id.'
    });
  }

  database('users').where('id', id).update(updatedUser, '*')
    .then(results => {
      if (!results.length) {
        return response.status(404).json({ error: `Cannot find a user with the id of ${id}` });
      }
      return response.sendStatus(204);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/houses/:houseId/bills/:id', (request, response) => {
  const { id } = request.params;
  const updatedBill = request.body;

  if (updatedBill.id) {
    return response.status(422).json({
      error: 'You cannot change a bill id.'
    });
  }

  database('bills').where('id', id).update(updatedBill, '*')
    .then(results => {
      if (!results.length) {
        return response.status(404).json({ error: `Cannot find a bill with the id of ${id}` });
      }
      return response.sendStatus(204);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/houses/:houseId/chores/:id', (request, response) => {
  const { id } = request.params;
  const updatedChore = request.body;

  if (updatedChore.id) {
    return response.status(422).json({
      error: 'You cannot change a chore id.'
    });
  }

  database('chores').where('id', id).update(updatedChore, '*')
    .then(results => {
      if (!results.length) {
        return response.status(404).json({ error: `Cannot find a chore with the id of ${id}` });
      }
      return response.sendStatus(204);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/houses/:houseId/bulletins/:id', (request, response) => {
  const { id } = request.params;
  const updatedBulletin = request.body;

  if (updatedBulletin.id) {
    return response.status(422).json({
      error: 'You cannot change a bulletin id.'
    });
  }

  database('bulletins').where('id', id).update(updatedBulletin, '*')
    .then(results => {
      if (!results.length) {
        return response.status(404).json({ error: `Cannot find a bulletin with the id of ${id}` });
      }
      return response.sendStatus(204);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/houses/:houseId/bills/:id', (request, response) => {
  database('bills').where('id', request.params.id).select()
    .then(bills => {
      if (!bills.length) {
        return response.status(422).json({
          error: `Could not find a bill with an id of ${id}.`
        });
      }
      databse('bills').where('id', request.params.id).del()
        .then(() => {
          return response.status(500).json({ error });
        });
    });
});

app.delete('/api/v1/houses/:houseId/chores/:id', (request, response) => {
  database('chores').where('id', request.params.id).select()
    .then(chores => {
      if (!chores.length) {
        return response.status(422).json({
          error: `Could not find a bill with an id of ${id}.`
        });
      }
      databse('chores').where('id', request.params.id).del()
        .then(() => {
          return response.status(500).json({ error });
        });
    });
});

app.delete('/api/v1/houses/:id/bulletins/:id', (request, response) => {
  const { id } = request.params;
  database('bulletins').where('id', id).select()
    .then(bulletins => {
      if (!bulletins.length) {
        return response.status(422).json({
          error: `Could not find a bill with an id of ${id}.`
        });
      }
      databse('bulletins').where('id', id).del()
        .then(() => {
          return response.status(500).json({ error });
        });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
