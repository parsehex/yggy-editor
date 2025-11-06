import html from 'nanohtml';
import morph from 'nanomorph';

import { Dialogue } from 'game/types';
import data from 'game/data';
import editorElements from 'editor-elements';
import { disabled } from 'dom-util';
import getData from 'game/data/get';
import gameState from 'game/state';
import editorState from 'state';
import createButton from 'update-tab/common/button';

const title = 'Click to toggle collapse';

export default function updateTreeTab() {
	const root = data.dialogue[0]; // TODO: pick “first” dialogue explicitly
	const seen = new Set<number>();

	const view = html`<ul class="tree ml-2">
		${DialogueNode(root, seen)}
	</ul>`;

	// morph existing list to new view
	morph(editorElements.tree.list, view);

	// enable undo only if finalized and dialogue/choice ids are set
	disabled(
		editorElements.tree.btnUndo,
		!editorState.tree.linking.finalized ||
			editorState.tree.linking.dialogueID === null ||
			editorState.tree.linking.choiceID === null
	);
}

function DialogueNode(d: Dialogue, seen: Set<number>) {
	const isReference = seen.has(d.id);
	seen.add(d.id);

	const classes = [
		'dialogue',
		isReference ? 'reference' : '',
		gameState.currentDialogueID === d.id && !isReference ? 'active' : '',
		editorState.tree.collapsed.dialogue.includes(d.id) ? 'collapsed' : '',
	]
		.filter(Boolean)
		.join(' ');

	return html`
		<li id=${`dialogue-${d.id}`} class=${classes} data-id=${d.id}>
			<div class="content">
				<span class="text" title=${title}>${d.text}</span>
				${CharacterSpan(d.character1ID)} ${CharacterSpan(d.character2ID)}
				${!isReference ? html` ${BtnGo()} ${BtnLinkDialogue(d.id)} ` : ''}
			</div>

			${!isReference && d.choices.length
				? html`
						<ul class="choices">
							${d.choices.map((cId) =>
								ChoiceNode(getData('choices', cId), seen)
							)}
						</ul>
				  `
				: ''}
		</li>
	`;
}

function CharacterSpan(charId: number | null) {
	if (charId === null) return '';
	const ch = getData('characters', charId);
	return html`<span class="character">${ch.name}</span>`;
}

function ChoiceNode(c: any, seen: Set<number>) {
	const cText = c.text.length ? c.text : '(cycle dialogue)';
	const classes = [
		'choice',
		editorState.tree.collapsed.choices.includes(c.id) ? 'collapsed' : '',
		c.text.length === 0 ? 'cycle-dialogue' : '',
	]
		.filter(Boolean)
		.join(' ');

	return html`
		<li id=${`choice-${c.id}`} class=${classes} data-id=${c.id}>
			<div class="content">
				<span class="text" title=${title}>${cText}</span>
				${BtnLinkChoice(c.id)}
				${c.targetDialogueID === null
					? Btn('create-dialogue', '+ Dialogue')
					: Btn('unlink', 'Unlink', 'Remove dialogue link')}
			</div>

			${c.targetDialogueID !== null
				? html`
						<ul>
							${DialogueNode(getData('dialogue', c.targetDialogueID), seen)}
						</ul>
				  `
				: ''}
		</li>
	`;
}

// Button helpers: keep your existing utility to preserve behavior/styles
function Btn(kind: string, text: string, title?: string) {
	const el = createButton(kind, text);
	if (title) el.title = title;
	return el;
}

function BtnGo() {
	const el = createButton('go-to', 'Go');
	el.title = 'Go to dialogue in preview';
	return el;
}

function BtnLinkDialogue(dialogueID: number) {
	const el = createButton('link', 'Link');
	el.title = 'Link dialogue to choice';
	if (
		!editorState.tree.linking.finalized &&
		editorState.tree.linking.dialogueID === dialogueID
	) {
		el.classList.add('active');
	}
	return el;
}

function BtnLinkChoice(choiceID: number) {
	const el = createButton('link', 'Link');
	el.title = 'Link choice to dialogue';
	if (
		!editorState.tree.linking.finalized &&
		editorState.tree.linking.choiceID === choiceID
	) {
		el.classList.add('active');
	}
	return el;
}
