function lazyLoadProgression() {
    let el = document.querySelector('.progression');
    let loading = document.querySelector('.loading');

    let observer = new IntersectionObserver(entries => {
        for (let i of entries) {
            console.log(i)
            if (i.isIntersecting) {
                setTimeout(() => {
                    loading.style.opacity = 0.9;
                }, 700);
                
                import(
                        './progression/index')
                    .then(mod => {
                        mod.instance.$mount(i.target);

                        loading.style.opacity = 0;
                        setTimeout(() => {
                            loading.style.display = 'none';
                        }, 500);

                        let el = document.querySelector('.progression');
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