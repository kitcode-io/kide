const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const nginx = require('./nginx');

const __dirhome = process.env.HOME;

try{
  fs.unlinkSync('/etc/nginx/sites-enabled/default');
} catch(err) {}

module.exports = [{
  method: "GET",
  path: "/{path*}",
  config: {
    handler: {
      directory: {
        path: path.join(__dirname, "../dist/kide")
      }
    }
  }
}, {
  method: "GET",
  path: "/settings",
  handler: (request, reply) => {
    fs.readFile(path.join(__dirhome, '.settings.json'), (err, data) => {
      if (err) return reply({
        port: null,
        remeberPort: false
      });
      return reply(JSON.parse(data))
    });
  }
}, {
  method: "POST",
  path: "/settings",
  handler: (request, reply) => {
    fs.writeFile(path.join(__dirhome, '.settings.json'), JSON.stringify(request.payload), err => {
      if (err) return reply(err);
      nginx.setPort(request.payload.port, err => {
        reply({
          status: 'saved'
        });
      });
    });
  }
}, {
  method: 'GET',
  path: '/setup',
  handler: (request, reply) => {
    let mosules;
    try {
      modules = fs.readFileSync(path.join(__dirname,'modules.json'));
      fs.unlinkSync(path.join(__dirname, 'modules.json'));
      return reply({ modules });
    } catch(err) {
      return reply({ status: 'done' });
    }
	  
  }
}];
