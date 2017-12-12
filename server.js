const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const checkParams = require('./checkParams');

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    //had to add a second '=' above because of linter
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
      }else {
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
  database('bills').where('houseId', request.params.houseId).select()
    .then(bills => {
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

  checkParams(['name'], house, response);

  database('houses').where('name', house.name).select()
    .then(houses => {
      if (houses.length) {
        return response.status(422).json({
          error: 'A house with that name already exists.'
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
