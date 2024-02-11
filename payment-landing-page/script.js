const mobileMenu = document.getElementById("mobile-menu")
const mobileDropdown = document.getElementById("mobile-dropdown")
const heroSection = document.getElementById("hero")

mobileMenu.addEventListener("click", ()=>{
    if (mobileMenu.attributes.src.value === "./assets/img/mobile.png"){
        mobileMenu.setAttribute("src", "./assets/img/close.png")
        mobileDropdown.style.display = "flex"
        heroSection.style.display = "none"
    }
    else{
        mobileMenu.setAttribute("src", "./assets/img/mobile.png")
        mobileDropdown.style.display = "none"
        heroSection.style.display = "flex"
    }
})

Object.values(mobileDropdown.children).forEach((menuItem, i) => {
    menuItem.addEventListener("click", ()=>{
        menuItem.style.color = "black"
        menuItem.style.backgroundColor = "#E9DCFF"
        Object.values(mobileDropdown.children).forEach((menuItem, j) => {
            if (i !== j){
                menuItem.style.color = "white"
                menuItem.style.backgroundColor = "#1e1e1e"
            }
        })
    })
})