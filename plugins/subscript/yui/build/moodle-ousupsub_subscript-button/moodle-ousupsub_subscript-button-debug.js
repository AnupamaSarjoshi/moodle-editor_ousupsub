YUI.add('moodle-ousupsub_subscript-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    ousupsub_subscript
 * @copyright  2014 Rosiana Wijaya <rwijaya@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-ousupsub_subscript-button
 */

/**
 * ousupsub text editor subscript plugin.
 *
 * @namespace M.ousupsub_subscript
 * @class button
 * @extends M.editor_ousupsub.EditorPlugin
 */

Y.namespace('M.ousupsub_subscript').Button = Y.Base.create('button', Y.M.editor_ousupsub.EditorPlugin, [], {
    initializer: function() {
        this._config = {
            exec: 'subscript',

            // Watch the following tags and add/remove highlighting as appropriate:
            tags: 'sub',

            // Key codes (down-arrow, underscore) for the keyboard shortcut which triggers this button:
            keys: ['95', '40'],

            icon: 'e/subscript',
            callback: this._applyTextCommand
        };
        this.addButton(this._config);
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_ousupsub-plugin"]});
