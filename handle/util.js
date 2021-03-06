const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

class Util {
  
  static userResolvable(input, message){
	const userPatern = /^(?:<@!?)?([0-9]+)>?$/;
	if(userPatern.test(input)) input = input.replace(userPatern, '$1');
	let members = message.guild.members;
	const filter = member => member.user.id === input
		|| member.displayName.toLowerCase() === input.toLowerCase()
		|| member.user.username.toLowerCase() === input.toLowerCase()
		|| member.user.tag.toLowerCase() === input.toLowerCase();
	return members.filter(filter).first();
}
  
  static delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
  static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
  static shuffle (array){
    const arr = array.slice(0);
    for(let i = arr.length -1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  static async hastebin(text){
    const { body } = await snek.post('https://k-hastebin.glitch.me/documents')
    .send(text);
    return `https://k-hastebin.glitch.me/${body.key}`;
  }
  static chunk (array, chunkSize){
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }
  static parseDur(ms){
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    
    if (days) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    else if (hours) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    else if (minutes) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }
  static trimArray (array, length = 10){
    const len = array.length - length;
    const temp = array.slice(0, length);
    temp.push(`...${len} more.`);
    return temp;
  }
  static async verify(user, msg, time = 30000){
    await msg.react('🇾');
    await msg.react('🇳');
    const data = await msg.awaitReactions(reaction => reaction.users.has(user.id), { time: time, max: 1});
    if(data.firstKey() === '🇾') return true;
    return false;
  }
  static codeblock (string, code){
    return `\`\`\`${code}\n${string}\`\`\``;
  }
  static decodeHtmlEntities (text){
    return text.replace(/&#(\d+);/g, (rep, code) => {
      return String.fromCharCode(code)
    });
  }
  static async scrapeSubreddit(subreddit){
    subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
    const { body } = await snek.get(`https://imgur.com/r/${subreddit}/hot.json`);
    if(!body.data) return undefined;
    const img = body.data[Math.floor(Math.random() * body.data.length)];
    return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
  }
  static promisify(fn){
  	if(nodeVersion >= 8) return require('util').promisify(fn);
  	let name = fn.name;
	  name = (name || '').replace(/\s|bound(?!$)/g, '');
	  function newFunction(...args) {
		const arg = [];
		for (const key of Object.keys(args)) arg.push(args[key]);
		return new Promise((resolve, reject) =>
			fn.apply(this, [...args, (err, res) => {
				if (err) return reject(err);
				return resolve(res);
			}]));
	  }
	Object.defineProperty(newFunction, 'name', { value: name });
	return newFunction;
  }
  static promisifyAll(obj, suffix = 'Async'){
  	const newObj = Object.getPrototypeOf(obj);
	  for (const key of Object.keys(obj).concat(Object.keys(newObj))) {
		if (typeof obj[key] !== 'function') continue;
		obj[`${key}${suffix}`] = this.promisify(obj[key]);
	}
	return obj;
  }
  
  static nFormatter(number) {
      const tier = Math.log10(number) / 3 | 0;
      if(!tier) return number.toString();
      const suffix = SI_SYMBOL[tier]
      const scale = Math.pow(10, tier*3);
      const scaled = number / scale
      return `${scaled.toFixed(2)}${suffix}`
  }
  
  static toPlural (str){
    let arr = str.toLowerCase().split('');
    arr[0] = arr[0].toUpperCase();
      return arr.join('');
  }
  
}


module.exports = Util;