// require('style/app.scss');

import "./style/app.scss";

import { debounce } from 'lodash';
import marked from 'marked';
import FileSaver from 'file-saver';

import demoTxt from './demo';

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});//基本设置

const q = document.querySelector;

const editor = q('#editor');
const preview = q('.preview');

const parser = (source) => {

    return marked(source);
}

const updatePreview = (html) => {
    preview.innerHTML = html;
}

editor.innerText = demoTxt;
updatePreview(marked(demoTxt));


editor.addEventListener('input', debounce(() => {
    console.log(editor);
    updatePreview(parser(editor.innerText));
}, 500));


const exportBtn = q('#export');
const title = q('input.title');

const exportAsHtml = (html) => {
    if(title.value === ''){
        alert('Please input title~~');
        title.focus();
        return;
    }
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    FileSaver.saveAs(blob, `${title.value}.html`);
}

exportBtn.addEventListener('click', () => {
    exportAsHtml(parser(editor.innerText));
});


