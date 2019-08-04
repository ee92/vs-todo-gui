import * as chokidar from 'chokidar';

let watcher;

export const close = () => {
   if (watcher) {
      watcher.close();
   }
};

export const watch = (path: string, callback: Function) => {
   close();
   watcher = chokidar.watch(path, {ignoreInitial: true});
   watcher.on('all', callback);
};