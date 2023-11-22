const hero = require('./hero');
const tag = require('./tag');
const button = require('./button');
const menu = require('./menu');
const tab = require('./tab');
const tooltip = require('./tooltip');
const page_control = require('./page-control');
const card = require('./card');
const price = require('./price');

const global = require('./global');

const theme = require('../theme');
const profile = require('./profile');
module.exports = [tooltip, theme, hero, tag, button, menu, tab, page_control, card, price, global, profile];
