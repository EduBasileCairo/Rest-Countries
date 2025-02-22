var _a, _b, _c, _d, _e, _f;
import { Paises } from "./clases/Paises.js";
let paises = new Paises();
var pais; //variable que toma nombre del país seleccionado
let divContenido = document.querySelector("#contenido");
divContenido.innerHTML = "";
let limpiar = (elemento) => {
    elemento.innerHTML = "";
};
(_a = document.querySelector("#continente")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
    document.querySelector("#paises").innerHTML = "";
    let h1 = document.querySelector("#error");
    h1.innerHTML = "";
    let selectContinentes = document.querySelector("#continente");
    let selectPaises = document.querySelector("#paises");
    let value = selectContinentes.selectedOptions[0].value;
    if (value === "0") {
        selectPaises.innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Selecciona Pais....";
        h1.innerHTML = "Debe seleccionar un continente";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
    }
    paises
        .getDatos("https://restcountries.com/v3.1/region/" +
        selectContinentes.selectedOptions[0].value)
        .then((datos) => {
        //(selectPaises as HTMLSelectElement).innerHTML = ""
        var optionInicial = document.createElement("option");
        optionInicial.value = "0";
        optionInicial.text = "Selecciona pais...";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(optionInicial);
        datos.sort((a, b) => {
            return a.translations.spa.common.localeCompare(b.translations.spa.common);
        });
        datos.forEach((pais) => {
            var _a, _b, _c, _d;
            // (pais) al colocarse sobre el error señalado por VSC sale corrección rápida
            let option = document.createElement("option");
            option.value = pais.name.common;
            if (((_a = pais.translations) === null || _a === void 0 ? void 0 : _a.spa) === undefined)
                option.text = (_b = pais.name) === null || _b === void 0 ? void 0 : _b.common;
            else
                option.text = (_d = (_c = pais.translations) === null || _c === void 0 ? void 0 : _c.spa) === null || _d === void 0 ? void 0 : _d.common;
            selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
        });
    });
});
let selectPaises = document === null || document === void 0 ? void 0 : document.querySelector("#paises");
//evento change paises
(_b = document.querySelector("#paises")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", () => {
    limpiar(divContenido);
    let parrafo = document.createElement("p");
    parrafo.innerHTML = "";
    let valuep = selectPaises.selectedOptions[0].value;
    //si no se ha seleccionado un país:
    if (valuep === "0") {
        // (selectPaises as HTMLSelectElement).innerHTML = "";
        // let option = document.createElement("option");
        // option.value = "0";
        // option.text = "Selecciona Pais....";
        // selectPaises?.appendChild(option);
        parrafo.innerHTML = "Debes seleccionar un país";
        divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo);
    }
});
//evento clic del boton Geograficos
(_c = document.querySelector("#geograficos")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    limpiar(divContenido);
    let parrafo = document.createElement("p");
    let valuep = selectPaises.selectedOptions[0].value;
    if (valuep === "0") {
        selectPaises.innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Selecciona Pais....";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
        parrafo.innerHTML = "Debes seleccionar un país";
        divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo);
    }
    //si se ha seleccionado un país se cumple la promesa:
    paises
        .getDatos("https://restcountries.com/v3.1/name/" +
        selectPaises.selectedOptions[0].value)
        .then((datos) => {
        datos.forEach((info) => {
            let parrafo1 = document.createElement("p");
            let parrafo2 = document.createElement("p");
            let parrafo3 = document.createElement("p");
            let parrafo4 = document.createElement("p");
            const areaEnMiles = info.area.toLocaleString();
            parrafo1.innerHTML = `Área: ${areaEnMiles} km²`;
            parrafo2.innerHTML = `Fronteras: `;
            //Bucle for para todas las fronteras:
            let fronteras = [];
            for (let i = 0; i < info.borders.length; i++) {
                paises.getDatos("https://restcountries.com/v3.1/alpha/" + info.borders[i]).then(datos => {
                    fronteras.push(datos[0].name.common);
                });
            }
            let ul = document.createElement("ul");
            fronteras.forEach((frontera) => {
                let li = document.createElement("li");
                ul.appendChild(li);
                li.innerHTML = frontera;
            });
            //para cambiar de cca3 a nombre completo
            //paises.getDatos("https://restcountries.com/v3.1/alpha/" + fronteras.then((datos: Array<any>) => 
            // })
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo2);
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(ul);
            parrafo3.innerHTML = `Google Map: `;
            let a1 = document.createElement("a");
            a1.href = info.maps.googleMaps;
            a1.target = "_blank";
            a1.innerHTML = `${info.maps.googleMaps}`;
            parrafo4.innerHTML = `Street Map :`;
            let a2 = document.createElement("a");
            a2.href = info.maps.openStreetMaps;
            a2.target = "_blank";
            a2.innerHTML = `${info.maps.openStreetMaps}`;
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo1);
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo3);
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo4);
            parrafo3.appendChild(a1);
            parrafo4.appendChild(a2);
        });
    });
});
//evento clic del boton
(_d = document.querySelector("#generales")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    limpiar(divContenido);
    let parrafo = document.createElement("p");
    let valuep = selectPaises.selectedOptions[0].value;
    if (valuep === "0") {
        selectPaises.innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Selecciona Pais....";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
        parrafo.innerHTML = "Debes seleccionar un país";
        divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo);
    }
    //si se ha seleccionado un país se cumple la promesa:
    paises
        .getDatos("https://restcountries.com/v3.1/name/" +
        selectPaises.selectedOptions[0].value)
        .then((datos) => {
        datos.forEach((info) => {
            let parrafo1 = document.createElement("p");
            let parrafo2 = document.createElement("p");
            let parrafo3 = document.createElement("p");
            let parrafo4 = document.createElement("p");
            const populationEnMiles = info.population.toLocaleString();
            parrafo1.innerHTML = `Nombre común: ${info.name.common}`;
            parrafo2.innerHTML = `Nombre oficial: ${info.name.official}`;
            parrafo3.innerHTML = `Capital: ${info.capital}`;
            parrafo4.innerHTML = `Población: ${populationEnMiles} habitantes`;
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo1);
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo2);
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo3);
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo4);
        });
    });
});
(_e = document.querySelector("#banderas")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    limpiar(divContenido);
    let parrafo = document.createElement("p");
    let valuep = selectPaises.selectedOptions[0].value;
    if (valuep === "0") {
        selectPaises.innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Selecciona Pais....";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
        parrafo.innerHTML = "Debes seleccionar un país";
        divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo);
    }
    paises
        .getDatos("https://restcountries.com/v3.1/name/" +
        selectPaises.selectedOptions[0].value)
        .then((datos) => {
        datos.forEach((info) => {
            let img1 = document.createElement("img");
            let img2 = document.createElement("img");
            img1.src = info.flags.svg;
            img1.width = 400;
            img2.src = info.coatOfArms.svg;
            img1.width = 400;
            img1.innerHTML = `Bandera:`;
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(img1);
            img2.innerHTML = `Escudo:`;
            divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(img2);
        });
    });
});
(_f = document.querySelector("#traducciones")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    limpiar(divContenido);
    let parrafo = document.createElement("p");
    let valuep = selectPaises.selectedOptions[0].value;
    if (valuep === "0") {
        selectPaises.innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Selecciona Pais....";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
        parrafo.innerHTML = "Debes seleccionar un país";
        divContenido === null || divContenido === void 0 ? void 0 : divContenido.appendChild(parrafo);
    }
});
//<script src="https://gist.github.com/ivolivares/ce635609def0ecdbbc1d5fc850cd631a.js"></script>
