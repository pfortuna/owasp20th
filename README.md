# OWASP 20th Anniversary talk - Achieving Web Isolation Nirvana
## Configuration
### Setup
Add the following to your /etc/hosts
```
127.0.0.1    virtualbank.com chatbot.com chatbot.virtualbank.com
```

### Config
You can set three properties in the `config` object in `index.js`
- agent - if true, the monitoring agent is added
- thirdPartyiframed - if true, the 3rd party is jailed inside a cross-origin iframe
- thirdPartyCompromised - if true, the 3rd party contains a malicious payload (instead of the legitimate one)

## Running
To run, type `npm run watch`
Open `http://virtualbank.com:3000`

### ToDo List
- adding agent to iframe domain
- caja part
- nice to haves
  - moving everything to ssl port 443