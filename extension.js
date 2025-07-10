const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

function stripHtml(html) {
	if (typeof html !== 'string') {
		if (typeof html === 'object' && html['#text']) {
			html = html['#text'];
		} else {
			return '';
		}
	}
	return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('blogs.searchTechNews', async () => {
		vscode.window.showInformationMessage('Fetching tech news from The Verge...');

		try {
			const response = await axios.get('https://www.theverge.com/rss/index.xml');

			const parser = new XMLParser({
				ignoreAttributes: false
			});
			const parsed = parser.parse(response.data);

			let entries = parsed.feed?.entry;

			if (!entries) {
				throw new Error('No entries found in feed.');
			}

			if (!Array.isArray(entries)) {
				entries = [entries];
			}

			const items = entries.map((entry, i) => {
				const title = typeof entry.title === 'string'
					? entry.title
					: `Article ${i + 1}`;

				let summary = entry.summary;
				if (summary && typeof summary === 'object' && summary['#text']) {
					summary = summary['#text'];
				}
				if (typeof summary !== 'string') {
					summary = '';
				}

				let link = '';
				if (Array.isArray(entry.link)) {
					const altLink = entry.link.find(l => l['@_rel'] === 'alternate');
					link = altLink?.['@_href'] || '';
				} else if (entry.link && typeof entry.link === 'object') {
					link = entry.link['@_href'] || '';
				}

				const item = {
					label: title.trim(),
					detail: stripHtml(summary).slice(0, 200) + '...',
					link: link || entry.id || ''
				};

				console.log('Parsed item:', item);
				return item;
			});

			if (!items.length) {
				vscode.window.showWarningMessage('No news articles available.');
				return;
			}

			const selected = await vscode.window.showQuickPick(items, {
				matchOnDetail: true,
				placeHolder: 'Select a Verge article to read'
			});

			if (selected?.link) {
				vscode.env.openExternal(vscode.Uri.parse(selected.link));
			}
		} catch (err) {
			vscode.window.showErrorMessage('Failed to fetch news: ' + err.message);
			console.error(err);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
