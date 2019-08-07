// TODO: handle multi line single line comments
import {readFileSync, readdirSync, statSync} from 'fs';
import {join} from 'path';

type Todo = {
   path: string,
   text: string,
   line: number
};

const ignore = ['node_modules', 'build', 'dist', '.git', '.DS_Store'];
const regex = [
   {  
      type: 'HTML',
      comment: /(<!--)(.|\n){0,200}?(-->)/gm,
      todo: /(?<=(<!--)((.|\n)*?)TODO(:|\s))((?:(?!(-->))(.|\n)*?))*/gm
   }, {
      type: 'JS_LINE',
      comment: /\/\/\s+.{0,200}/g,
      todo: /(?<=(\/\/)\s+TODO(:|\s)).*/g
   }, {
      type: 'JS_BLOCK',
      comment: /(\/\*)(.|\n){0,200}?(\*\/)/gm,
      todo: /(?<=(\/\*)((.|\n)*?)TODO(:|\s))((?:(?!(\*\/))(.|\n)*?))*/gm
   }
];

const cleanTodos = (todos: Todo[]) => {
   todos.forEach(todo => {
      todo.text.trim()
         .replace(/\n|\r/g, " ")
         .replace(/\s{2,}/g, " ");
   });
};

const parseFile = (path: string, todos: Todo[]) => {
   const text = readFileSync(path, 'utf-8');
   regex.forEach(re => {
      let comment;
      while ((comment = re.comment.exec(text)) != null) {
         const chars = text.substr(0, comment.index);
         const line = chars.split('\n').length;
         const matches = comment[0].match(re.todo) || [];
         matches.forEach(text => todos.push({path, text, line}));
      }
   });
};

const collectTodos = (path: string, todos: Todo[]) => {
   if (statSync(path).isFile()) {
      parseFile(path, todos);
   }
   if (statSync(path).isDirectory()) {
      const files = readdirSync(path);
      files.forEach(file => {
         if (ignore.includes(file)) {
            return;
         }
         const filePath = join(path, file);
         collectTodos(filePath, todos);
      });
   }
};

const parseProject = (path: string) => {
   let todos = [];
   collectTodos(path, todos);
   cleanTodos(todos);
   return { path, todos };
};

export default parseProject;
