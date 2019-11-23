const Horikita = require('./handle/Horikita');
const client = new Horikita({
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
  disableEveryone: true
});

require('./handle/events')(client);
require('./handle/module')(client);

client.login("NjQzNzQ4MzcwMzU1MTkxODE5.Xc_kGQ.hl2tNV7YHUPfXImGR_VXvZ5hPAI");