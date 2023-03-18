class Interfaz {

    constructor() {
        this.init();
    }

    init() {
        this.costruirSelct();
    }

    costruirSelct() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                const select = document.querySelector('#criptomoneda');
                //para extraer la llave y el valor se usa [key, value]
                //para recorrer un objeto se usa object entries
                //toma los objetos y los transforma en arreglos
                for( const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //añadir el symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }                
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //seleccionarr mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //imprime el resultado de la cotizacion 
    mostrarResultado(resultado, moneda, crypto) {

        //en caso de haber un resultado anteriro, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');

        //aqui se revisa si el div que se crea existe
        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        console.log(datosMoneda);

        //recortar decimales con toFixed()
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000);

        //construir template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="caard-body text-light">
                    <h2 class="card-title">Results</h2>
                    <p>Price is ${datosMoneda.FROMSYMBOL} to ${datosMoneda.TOSYMBOL} is : $ ${precio}</p>
                    <p>Last change: % ${porcentaje}</p>
                    <p>Last update: ${actualizado}</p>

                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
            //insertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;

            //ocultar el spinner
            this.mostrarOcultarSpinner('none');
        }, 3000);
    }

    //Mostrar spinner de carga al cotizar
    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }

}