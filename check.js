const c = require('./src/channels');
console.log('Total channels:', c.getAllChannels().length);
console.log('Active channels:', c.getActiveChannels().length);
c.getActiveChannels().forEach(ch => {
  console.log(' ✅', ch.name, '–', ch.streams.length, 'streams');
});
