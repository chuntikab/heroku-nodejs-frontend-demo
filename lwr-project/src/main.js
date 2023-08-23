import { createElement } from 'lwc';
import App from 'example/app';

const elm = createElement('x-app', { is: App });
document.body.appendChild(elm);