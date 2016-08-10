'use strict';

(() => {
    class Modal {
        constructor(el) {
            this.selectors = {
                close: 'js-modal-close'
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

            // Cache some nodes.
            this.closeNodes = this.modal.getElementsByClassName(this.selectors.close);

            // Attach DOM events.
            this.attachEvents();
        }

        /**
         * 1. Click event for node that will launch the modal.
         * 2. Click event for the modal node.
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
        }

        open() {
            this.modal.setAttribute('aria-hidden', false);
        }

        close() {
            this.modal.setAttribute('aria-hidden', true);
        }
    }

    // Initialise.
    let els = document.getElementsByClassName('js-modal-open');

    for(let i = 0; i <= els.length - 1; i++) {
        let m = new Modal(els[i]);
    }
})();

