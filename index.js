'use strict';

(() => {
    class Modal {
        constructor(el) {
            this.selectors = {
                open: 'js-modal-open',
                close: 'js-modal-close',
                dialog: 'js-modal-dialog'
            }

            //DOM node that will open the modal.
            this.el = el;

            // Get the target modal node.
            const modal = document.getElementById(this.el.hash.substr(1));

            if(!modal) {
                console.error('No modal element found with id: ' + this.el.hash);
                return;
            }

            this.modal = modal;

            // Create a collection of all modal nodes on the page.
            this.targets = this.getAllTargets();

            // Cache some nodes.
            this.closeNodes = this.modal.getElementsByClassName(this.selectors.close);
            this.dialog = this.modal.getElementsByClassName(this.selectors.dialog)[0];

            // Attach DOM events.
            this.attachEvents();

            // Store the last focused element so we can be sent back there
            // when the modal closes.
            this.lastFocused = null;
        }

        /**
         * Get all target modal elements using the hash attr of the
         * trigger element(s).
         *
         * @return {array} [array of hash strings]
         */
        getAllTargets() {
            const trigger = document.getElementsByClassName(this.selectors.open);

            let targets = [];

            [].forEach.call(trigger, (el) => {
                targets.push(el.hash);
            });

            return targets;
        }

        /**
         * 1. Click event for node that will launch the modal.
         * 2. Click event for the close button(s).
         * 3. Overlay click event to close.
         */
        attachEvents() {
            // [1]
            this.el.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });

            // [2]
            [].forEach.call(this.closeNodes, (el) => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.close();
                });
            });

            // [3]
            this.modal.addEventListener('click', (e) => {
                if(e.target === this.modal) {
                    this.close();
                }
            });
        }

        /**
         * Open/show the modal dialog node.
         */
        open() {
            this.lastFocused = document.activeElement;

            this.closeAll();

            this.modal.setAttribute('aria-hidden', false);

            // Shift the focus to the modal dialog.
            this.dialog.setAttribute('tabindex', 0);
            this.dialog.focus();
        }

        /**
         * Close a modal dialog node.
         * Allowing a node to be passed to this function so that
         * we can use it to close all other instances.
         *
         * @param  {DOM Node} target [Node to close]
         */
        close(target) {
            target = target || this.modal;
            target.setAttribute('aria-hidden', true);

            this.lastFocused.focus();
        }

        /**
         * Loop through all the target hashes we have to get the DOM node
         * for each target modal. Pass each one to close().
         */
        closeAll() {
            this.targets.forEach(hash => {
                const target = document.getElementById(hash.substr(1));

                this.close(target);
            });
        }
    }

    // Initialise.
    let els = document.getElementsByClassName('js-modal-open');

    for(let i = 0; i <= els.length - 1; i++) {
        let m = new Modal(els[i]);
    }
})();

