const cartIcon =  document.querySelector('.bi-cart-plus');
    const cartWindow = document.querySelector('.cart-window');
    cartWindow.inWindow = 0;
        cartIcon.addEventListener('mouseover', () => {
            if(cartWindow.classList.contains('hidden')){
                cartWindow.classList.remove('hidden');
            }
        } )
        cartIcon.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if(cartWindow.inWindow ==0 ) {

                cartWindow.classList.add('hidden');
                }
            },500)
        })
        cartWindow.addEventListener('mouseover', () => {
            cartWindow.inWindow = 1;
        })
        cartWindow.addEventListener('mouseleave', () => {
        cartWindow.inWindow = 0;
        cartWindow.classList.add('hidden')
        })