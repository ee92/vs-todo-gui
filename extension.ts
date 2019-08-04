import * as vscode from 'vscode';
import init from './src/extension';

export const activate = (context: vscode.ExtensionContext) => {
	let command = vscode.commands.registerCommand(
		'extension.showTodos', 
		(event: vscode.Uri) => {
			init(event, context);
		}
	);
	context.subscriptions.push(command);
};

export const deactivate = () => {};