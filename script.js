class TarifCard {
    constructor({
        name,
        speed,
        channels_count,
        hd_channels_count,
        price
    }, parent) {
        this.parent = parent;
        this.Name = name;
        this.Speed = speed;
        this.Hd = hd_channels_count;
        this.Channels = channels_count;
        this.tax = price;


    }

    renderHtmlElement(parent, tag, className, id, innerHtml, src) {
        const element = document.createElement(tag);
        if (id) {
            element.id = id;
        }
        if (innerHtml) {
            element.innerText = innerHtml;
        }
        if (className) {
            element.className = className;
        }
        if (src) {
            element.src = src;
        }


        parent.appendChild(element);
        return element;
    }
    render() {
        const wrapperHTML = this.renderHtmlElement(
            this.parent,
            "div",
            "tarif_block"
        );

        const title = this.renderHtmlElement(
            wrapperHTML,
            "div",
            "tarif_name",
            null,
            this.Name
        );
        const speedandchannels = this.renderHtmlElement(
            wrapperHTML,
            "div",
            'speedandchannels',
            null
        );
        const speedandicon = this.renderHtmlElement(
            speedandchannels,
            "div",
            'speedandicon',
            null
        );
        const wwwimageUrl = "./icons/iconWebGray.svg";
        const poster = this.renderHtmlElement(
            speedandicon,
            "img",
            "wwwimage",
            "poster",
            null,
            wwwimageUrl
        );
        const speed = this.renderHtmlElement(
            speedandicon,
            "div",
            "tarif_speed",
            'speed',
            `До ${this.Speed} Мбит/с`
        );
        const channelandicon = this.renderHtmlElement(
            speedandchannels,
            "div",
            'channelandicon',
            null
        );
        const channelimageUrl = "./icons/iconTVGray.svg";
        const channel = this.renderHtmlElement(
            channelandicon,
            "img",
            "wwwimage",
            "poster",
            null,
            channelimageUrl
        );
        const channels = this.renderHtmlElement(
            channelandicon,
            "p",
            "channels",
            "channels",
            `${this.Channels} каналов`
        );
        const hdChannels = this.renderHtmlElement(
            channelandicon,
            "p",
            "channels_hd",
            "channels_hd",
            `${this.Hd}HD`
        );

        const vectorline = "./icons/vector.svg";
        const vector = this.renderHtmlElement(
            wrapperHTML,
            "img",
            "vector",
            null,
            null,
            vectorline
        );
        const priceandbutton = this.renderHtmlElement(
            wrapperHTML,
            "div",
            'priceandbutton',
            null
        );
        const priceandmoney = this.renderHtmlElement(
            priceandbutton,
            "div",
            'priceandmoney',
            null
        );

        const price = this.renderHtmlElement(
            priceandmoney,
            "div",
            "price",
            null,
            this.tax
        );
        const rubs_mes = this.renderHtmlElement(
            priceandmoney,
            "div",
            "price",
            null,

        );
        const rubs = this.renderHtmlElement(
            rubs_mes,
            "p",
            "rub",
            null,
            'руб'

        );
        const mes = this.renderHtmlElement(
            rubs_mes,
            "p",
            "month",
            null,
            'мес'

        );
        const button = this.renderHtmlElement(
            priceandbutton,
            "button",
            "button_cash",
            null,
            'Подключить'

        );

    }
}


const getTarifs = async () => {
    const tarifsUrl = `https://tarifnik.ru/rabota/api/data_controller`;
    const response = await fetch(tarifsUrl);
    const result = await response.json();


    result.forEach(({
        name,
        speed,
        channels_count,
        price,
        hd_channels_count
    }) => {
        const otvet = {
            name,
            speed,
            channels_count,
            price,
            hd_channels_count
        };

        const filmCard = new TarifCard(otvet, zapros);

        return filmCard.render();
    });





};
getTarifs();



const arrmenu = document.querySelectorAll(".menu_item");
const ham = document.getElementById("burger");
const logo = document.querySelector(".logo");
const menu = document.getElementById("menu");
let burgerStatus = 0;

ham.addEventListener("click", () => {
    if (burgerStatus == 0) {
        arrmenu.forEach(el => (el.style.display = "block"));
        menu.querySelector("ul").classList.add("ulclicked");
        menu.classList.add("clicked");


        ham.style.transition = "1s";
        ham.style.transform = "rotate(90deg)";

        setTimeout(() => (burgerStatus = 1), 5);

    }
    if (burgerStatus == 1) {
        arrmenu.forEach(el => (el.style.display = "none"));
        menu.querySelector("ul").classList.remove("ulclicked");
        menu.classList.remove("clicked");


        ham.style.transform = "rotate(0deg)";
        setTimeout(() => (burgerStatus = 0), 5);

    }

});

menu.addEventListener("click", event => {
    if (burgerStatus == 1) {
        if (event.target.tagName !== "LI" && event.target.tagName !== "UL") {
            arrmenu.forEach(el => (el.style.display = "none"));
            menu.querySelector("ul").classList.remove("ulclicked");
            menu.classList.remove("clicked");

            ham.style.transform = "rotate(0deg)";
            burgerStatus = 0;

        }
    }
});