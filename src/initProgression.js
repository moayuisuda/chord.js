function lazyLoadProgression() {
    let el = document.querySelector('#progression');

    let observer = new IntersectionObserver(entries => {
        for (let i of entries) {
            console.log(i)
            if (i.isIntersecting) {
                import(
                        './progression/index')
                    .then(mod => {
                        mod.instance.$mount(i.target);

                        let el = document.querySelector('#progression');
                        el.offsetTop;
                        el.style.opacity = 1;
                        el.style.transform = 'translate(0)'

                    })
            }
        }
    }, {
        threshold: 0.5
    })

    observer.observe(el);
}

export {
    lazyLoadProgression
}