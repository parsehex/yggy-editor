import html from 'nanohtml';
import morph from 'nanomorph';

import { Choice, Dialogue } from 'game/types';
import data from 'game/data';
import editorElements from 'editor-elements';
import { disabled } from 'dom-util';
import getData from 'game/data/get';
import gameState from 'game/state';
import editorState from 'state';
import Btn from 'update-tab/common/button';

const title = 'Click to toggle collapse';

export default function updateTreeTab() {
	const root = data.dialogue[0]; // TODO: pick “first” dialogue explicitly
	const seen = new Set<number>();

	const view = html`<ul class="tree font-sans">
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
	const isActive = gameState.currentDialogueID === d.id;
	const isCollapsed = editorState.tree.collapsed.dialogue.includes(d.id);

	const classes = [
		'dialogue',
		isReference ? 'reference' : '',
		isActive ? 'active' : '',
		isCollapsed ? 'collapsed' : '',
	]
		.filter(Boolean)
		.join(' ');

	const textClass = [
		'text',
		isActive ? 'font-bold' : '',
		isReference ? 'italic' : '',
	]
		.filter(Boolean)
		.join(' ');

	return html`
		<li id=${`dialogue-${d.id}`} class=${classes} data-id=${d.id}>
			<div class="content flex items-center">
				<span class=${textClass} title=${title}>${d.text}</span>
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

function ChoiceNode(c: Choice, seen: Set<number>) {
	const isCycle = c.text.length === 0;
	const cText = !isCycle ? c.text : '(cycle dialogue)';
	const classes = [
		'choice',
		editorState.tree.collapsed.choices.includes(c.id) ? 'collapsed' : '',
		isCycle ? 'cycle-dialogue' : '',
	]
		.filter(Boolean)
		.join(' ');

	const textClass = ['text', isCycle ? 'italic text-gray-700' : '']
		.filter(Boolean)
		.join(' ');

	return html`
		<li id=${`choice-${c.id}`} class=${classes} data-id=${c.id}>
			<div class="content flex items-center">
				<span class=${textClass} title=${title}>${cText}</span>
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

function BtnGo() {
	return Btn('go-to', 'Go', 'Go to dialogue in preview');
}

function BtnLinkDialogue(dialogueID: number) {
	const el = Btn('link', 'Link', 'Link dialogue to choice');
	if (
		!editorState.tree.linking.finalized &&
		editorState.tree.linking.dialogueID === dialogueID
	) {
		el.classList.add('active');
	}
	return el;
}

function BtnLinkChoice(choiceID: number) {
	const el = Btn('link', 'Link', 'Link choice to dialogue');
	if (
		!editorState.tree.linking.finalized &&
		editorState.tree.linking.choiceID === choiceID
	) {
		el.classList.add('active');
	}
	return el;
}
