const accordion = (triggerSelector, itemsSelector) => {
    const btns = document.querySelectorAll(triggerSelector);
    const  blocks = document.querySelectorAll(itemsSelector);

    blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown');
    });

    const removeActiveBtn = () => {
        btns.forEach(btn => {
            btn.classList.remove('active', 'active-style');
        });
    };

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                removeActiveBtn();
                this.classList.add('active', 'active-style');
            } else {
                this.classList.remove('active', 'active-style');
                removeActiveBtn();
            }
        });
    });
};

export default accordion;