import {window, ViewColumn, Uri, ExtensionContext} from 'vscode';
import { sep, join } from 'path';
import { watch } from './watcher';
import parseProject from './parser';

const init = (event: Uri, context: ExtensionContext) => {
	const path = event.fsPath;
	const name = path.split(sep).pop();

	const panel = window.createWebviewPanel('todos', name, {
		preserveFocus: true,
		viewColumn: ViewColumn.Beside
	}, {
		enableScripts: true,
		localResourceRoots: [Uri.file(join(context.extensionPath, 'build'))]
	});

	const baseUri = Uri.file(join(context.extensionPath, 'build'))
							.with({scheme: 'vscode-resource'});
	const scriptUri = Uri.file(join(context.extensionPath, 'build', 'bundle.js'))
							.with({scheme: 'vscode-resource'});
	const styleUri = Uri.file(join(context.extensionPath, 'build', 'main.css'))
							.with({scheme: 'vscode-resource'});

	panel.webview.html = `<!DOCTYPE html>
	<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta charset="utf-8">
			<title>vs-todo</title>
			<link href="${styleUri}" rel="stylesheet">
			<base href="${baseUri}/" />
		</head>
		<body>
			<div id="root"></div>
			<script type="text/javascript" src="${scriptUri}"></script>
		</body>
	</html>`;

	const updateView = () => {
		const project = parseProject(path);
		panel.webview.postMessage({project});
	};

	watch(path, updateView);
	panel.webview.onDidReceiveMessage(updateView, null, context.subscriptions);
};

export default init;