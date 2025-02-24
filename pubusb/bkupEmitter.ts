import EventEmitter from "events";
import * as fs from 'fs';

const bkupEmitter = new EventEmitter();

bkupEmitter.on('bkup', (users: Object[], path: fs.PathOrFileDescriptor) => {
    fs.writeFile(path, JSON.stringify(users), (err) => {
        if (err) console.log('Backup failed');
        else console.log('Backup succeded');
      });
})

export default bkupEmitter;