document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for Fade Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-up-hidden')) {
                    entry.target.classList.remove('fade-up-hidden');
                    entry.target.classList.add('fade-up-visible');
                }
                if (entry.target.classList.contains('fade-in-right-hidden')) {
                    entry.target.classList.remove('fade-in-right-hidden');
                    entry.target.classList.add('fade-in-right-visible');
                }

                // If it's the generic fade-hidden
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up-hidden, .fade-in-right-hidden').forEach(el => {
        observer.observe(el);
    });


    // CountUp Animation
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const to = parseFloat(element.getAttribute('data-to'));
                const decimals = parseInt(element.getAttribute('data-decimals') || '0');
                const duration = 2000; // 2 seconds

                animateValue(element, 0, to, duration, decimals);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    document.querySelectorAll('.count-up').forEach(el => {
        countUpObserver.observe(el);
    });

    function animateValue(obj, start, end, duration, decimals) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);

            const current = start + easeProgress * (end - start);

            if (decimals === 0) {
                obj.innerHTML = Math.floor(current).toLocaleString();
            } else {
                obj.innerHTML = current.toFixed(decimals);
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                if (decimals === 0) {
                    obj.innerHTML = Math.floor(end).toLocaleString();
                } else {
                    obj.innerHTML = end.toFixed(decimals);
                }
            }
        };
        window.requestAnimationFrame(step);
    }
});
