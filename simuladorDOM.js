// CREAR CLASE
class Cancion{
    constructor(id,titulo,album,artista,duracion,reproducciones,imagen){
        this.id = id
        this.titulo = titulo
        this.album = album
        this.artista =artista
        this.duracion = duracion
        this.reproducciones = reproducciones
        this.imagen = imagen
    }
    
    display(){
        console.log(`\n|ID: ${this.id} |TITULO: ${this.titulo} |ARTISTA: ${this.artista} |ALBUM: ${this.album} |DURACION ${this.duracion} |REPRODUCCIONES: ${this.reproducciones} `);
    }
    
}
// INSTANCIAR OBJETO
const cancion1 = new Cancion(1,"Bocanada","Bocanada","Gustavo Cerati", (Math.random()*5).toFixed(2) , (Math.random()*10000000000).toFixed(0),'bocanada.webp')
const cancion2 = new Cancion(2,"Bajan","Artaud","Luis A. Spinetta", (Math.random()*5).toFixed(2) , (Math.random()*10000000000).toFixed(0),'artaud.webp')
const cancion3 = new Cancion(3,"Boredom","Flowerboy", "Tyler, the Creator",(Math.random()*5).toFixed(2),(Math.random()*10000000000).toFixed(0),'tyler.webp')
const cancion4 = new Cancion(4,"Calma","Tripolar","Usted Señalemelo",(Math.random()*5).toFixed(2),(Math.random()*10000000000).toFixed(0),'tripolar.webp')
const cancion5 = new Cancion(5,"Veni Mira","Nafta","Nafta",(Math.random()*5).toFixed(2),(Math.random()*10000000000).toFixed(0),'nafta.jpeg')
const cancion6 = new Cancion(6,"Dos Cereo Uno","Clics Modernos","Charly Garcia",(Math.random()*5).toFixed(2),(Math.random()*10000000000).toFixed(0),'clicsmodernos.jfif')
const playlist = []



if(localStorage.getItem("playlist")){
    for(let canc of JSON.parse(localStorage.getItem("playlist"))){
        let cancionStorage = new Cancion(canc.id,canc.titulo,canc.album,canc.artista,canc.duracion,canc.reproducciones,canc.imagen)
        playlist.push(cancionStorage)
    }
}else{
    console.log("seteamos por primera vez");
    playlist.push(cancion1,cancion2,cancion3,cancion4,cancion5,cancion6)
    localStorage.setItem("playlist", JSON.stringify(playlist))
}




// CAPTURA DOM
let canciones = document.getElementById("canciones")
let botonAgregar = document.getElementById("botonAgregar")
let buscador = document.getElementById("buscador")
let coincideDiv = document.getElementById("coincideDiv")
let OrdenarAlfBtn = document.getElementById("OrdenarAlfBtn")
let activadoTit=1
let OrdenarAlfBtnAlbum = document.getElementById("OrdenarAlfBtnAlbum")
let activadoAlb = 1
let ordenamientoAlfabetico =""
let mayDurBtn = document.getElementById("mayDurBtn")
let activadoDur=1
let mayRepBtn = document.getElementById("mayRepBtn")
let activadoRep =1
let ordenamientoNumerico =""
let modalBodyFila = document.getElementById("modalBodyFila")
let filaBtn = document.getElementById("filaBtn")
let cancionFila = JSON.parse(localStorage.getItem("fila")) ?? []




// FUNCIONES

function mostrarPlaylistDOM(array){
    canciones.innerHTML = ""
    for(let canc of array){
        
        let CancionDiv = document.createElement("div")
        CancionDiv.className = 'row filas'
        CancionDiv.innerHTML = `
        
        <div  class="col-1 id">
            <p>${canc.id}</p>
        </div>

        <div class="col-3 titulos">
            <div class="row ">
                

                <div class="col-1 g-1 titulo-img ">
                    <img src="assets/${canc.imagen}" alt="">
                </div>
                <div class="col-11 g-1 nombres">
                    <p id="titulo">${canc.titulo}<p/>
                    
                    <p id="artista">${canc.artista}</p>
                </div>
            </div>
        </div>

        <div class="col-3 albumes-ar"><p>${canc.album}</p></div>
        <div class="col-2 duracion"><p>${canc.duracion}</p></div>
        <div class="col-2 reproducciones"><p>${canc.reproducciones}</p></div>
        <div class="col-1 agregadas-btn">
            <button id="agregarFilaBtn${canc.id}" class="btn btn-outline-success "> ❤ </button>
        </div>
        `
        canciones.append(CancionDiv)
        let agregarFilaBtn = document.getElementById(`agregarFilaBtn${canc.id}`)
        agregarFilaBtn.addEventListener("click",()=>{
            agregarEnFila(canc)
            
        })
    }
}

function buscarCancion(buscado,array){
    let coincide = array.filter(
        (cancion) => {
            return cancion.titulo.toLowerCase().includes(buscado.toLowerCase()) || cancion.artista.toLowerCase().includes(buscado.toLowerCase()) || cancion.album.toLowerCase().includes(buscado.toLowerCase())
        }
    )
    coincide.length > 0 ? (mostrarPlaylistDOM(coincide), coincideDiv.innerHTML = ""):(mostrarPlaylistDOM(array),coincideDiv.innerHTML = `<h3>NO HAY COINCIDENCIAS</h3>`)
}



function OrdenarAlfabeticamente(array,ordenamientoAlfabetico){

    switch(ordenamientoAlfabetico){
        case "TITULO":
            OrdenarAlfBtn.innerText= "Titulo ↑ "
            console.log("ALFABETICO ACTIVADOTit",activadoTit);
            let alf = array.concat()
            alf.sort(
                (a,b) => {
                    if(a.titulo > b.titulo){
                        return 1
                    }
                    if(a.titulo < b.titulo){
                        return -1
                    }
                    return 0
                }
            )
            mostrarPlaylistDOM(alf)
        break

        case "ALBUM":
            OrdenarAlfBtnAlbum.innerText = "Album ↑ "
            console.log("ORDEN ALBUM ACTIVADO");
            let albOrd =array.concat()
            albOrd.sort(
                
                (a,b) => {
                    if(a.album > b.album){
                        return 1
                    }
                    if(a.album < b.album){
                        return -1
                    }
                    return 0
                }
                
            )
            mostrarPlaylistDOM(albOrd)

        break
    }

    
}

function OrdenarNum(array,ordenamientoNumerico,pos){
    switch(ordenamientoNumerico){
        case "DURACION":
            console.log("Numerico Activado");
            mayDurBtn.innerText = 'Duracion ↑'
            let dur = array.concat()
            if (pos === true){
                dur.sort(
                    (a,b) => {
                        if(a.duracion < b.duracion){
                            return 1
                        }
                        if(a.duracion > b.duracion){
                            return -1
                        }
                        return 0
                    }
                )
            }else{
                dur.sort(
                    (a,b) => {
                        if(a.duracion > b.duracion){
                            return 1
                        }
                        if(a.duracion < b.duracion){
                            return -1
                        }
                        return 0
                    }
                )
            }
            
            mostrarPlaylistDOM(dur)
            
        break
        
        case "REPRODUCCIONES":
            console.log("Numerico Activado");
            mayRepBtn.innerText = 'Reproducciones ↑'
            let rep = array.concat()
            if (pos === true){
                rep.sort(
                    (a,b) => {
                        if(a.reproducciones < b.reproducciones){
                            return 1
                        }
                        if(a.reproducciones > b.reproducciones){
                            return -1
                        }
                        return 0
                    }
                )
            }else{
                rep.sort(
                    (a,b) => {
                        if(a.reproducciones > b.reproducciones){
                            return 1
                        }
                        if(a.reproducciones < b.reproducciones){
                            return -1
                        }
                        return 0
                    }
                )
            }
            
            mostrarPlaylistDOM(rep)
        break
    }

}

function agregarEnFila(elem){
    console.log("Funciona " + elem.titulo);
    let cancionAgregada = cancionFila.find((canc) => canc.id == elem.id)
    if( cancionAgregada == undefined){
        cancionFila.push(elem)
        localStorage.setItem("fila", JSON.stringify(cancionFila))
        console.log(cancionFila);
    }
}

function CargarEnFila(array){
    modalBodyFila.innerHTML = ""
    array.forEach(
        (cancionFila) => {

            modalBodyFila.innerHTML += `
        <div class="row g-2 " id="cancionFila${cancionFila.id}" >
            
            <div class="col-4  ">
                <div class="row filas-modal  ">
                

                    <div class="col-1 g-1  ">
                        <img src="assets/${cancionFila.imagen}" alt=""  class=" imagen-modal">
                    </div>
                    <div class="col-11 g-1 titulos-modal">
                        <p id="titulo" class="titulo-modal">${cancionFila.titulo}<p/>
                        
                        <p id="artista" class="artista-modal">${cancionFila.artista}</p>
                    </div>
            
                </div>
            </div>

            <div class="col-3"><p>${cancionFila.album}</p></div>
            
            <div class="col-3">${cancionFila.duracion}</div>
            
            <div class="col-2">
                <button class= "btn btn-danger"id="botonEliminar${cancionFila.id}" > Borrar </button>
            </div>

        </div>
            
            `}
    )

    array.forEach(
        (cancionFila) => {
            document.getElementById(`botonEliminar${cancionFila.id}`).addEventListener("click", () =>{
                
                let lista = document.getElementById(`cancionFila${cancionFila.id}`)
                console.log(`cancionFila${cancionFila.id}`);
                lista.remove()
                let posicion = array.indexOf(cancionFila)
                array.splice(posicion, 1)
                localStorage.setItem("fila", JSON.stringify(array))
            })

        }
    )
}




// EVENTOS
function cargarCanciones(array){
        let titulo = document.getElementById("inputTitulo")
        let album = document.getElementById("inputAlbum")
        let artista = document.getElementById("inputArtista")
        console.log(titulo);
        console.log(album);
        console.log(artista);
        
        const nuevaCancion = new Cancion(array.length+1,titulo.value,album.value,artista.value,(Math.random()*5).toFixed(2),(Math.random()*10000000000).toFixed(0),'nueva.jpg')
        console.log(nuevaCancion);
        array.push(nuevaCancion)
        titulo.value = ""
        album.value = ""
        artista.value = ""
        
        localStorage.setItem("playlist", JSON.stringify(playlist))
}

    botonAgregar.addEventListener("click", ()=> {
        cargarCanciones(playlist)
        mostrarPlaylistDOM(playlist)
})

buscador.addEventListener("input",()=> {
    console.log(buscador.value);
    buscarCancion(buscador.value,playlist)
})



OrdenarAlfBtn.addEventListener("click" ,()=>{
    ordenamientoAlfabetico ="TITULO"
    console.log(ordenamientoAlfabetico);
    switch(activadoTit){
        case 1:
            OrdenarAlfabeticamente(playlist,ordenamientoAlfabetico)
            activadoTit= 2

        break
        case 2:
            mostrarPlaylistDOM(playlist)
            activadoTit = 1
            OrdenarAlfBtn.innerText= "Titulo "

            console.log("ALFABETICO DESACTIVADOTit");
        break
    }
    
})





OrdenarAlfBtnAlbum.addEventListener("click", () =>{
    ordenamientoAlfabetico ="ALBUM"
    console.log(ordenamientoAlfabetico);

    switch(activadoAlb){
        case 1:
            OrdenarAlfabeticamente(playlist,ordenamientoAlfabetico)
            activadoAlb = 2
        break
        case 2:
            mostrarPlaylistDOM(playlist)
            activadoAlb = 1
            OrdenarAlfBtnAlbum.innerText =  "Album "
            console.log("ORDEN ALBUM DESACTIVADO");
        break
    }
})

mayDurBtn.addEventListener("click", ()=>{
    ordenamientoNumerico = "DURACION"
    let pos = false
    switch(activadoDur){
        case 1:
            pos =true
            OrdenarNum(playlist,ordenamientoNumerico,pos)
            activadoDur= 2
            console.log(pos);
        break
        case 2:
            pos = false
            OrdenarNum(playlist,ordenamientoNumerico,pos)
            mayDurBtn.innerText= "Duracion ↓ "
            console.log(pos);
            activadoDur= 3

        break
        case 3:
            mostrarPlaylistDOM(playlist)
            activadoDur = 1
            mayDurBtn.innerText= "Duracion "

            console.log("Numerico DESACTIVADO");
        break
    }

})

mayRepBtn.addEventListener("click", ()=>{
    ordenamientoNumerico = "REPRODUCCIONES"
    let pos =false
    switch(activadoRep){
        case 1:
            pos = true
            OrdenarNum(playlist,ordenamientoNumerico,pos)
            activadoRep= 2

        break
        case 2:
            pos = false
            OrdenarNum(playlist,ordenamientoNumerico,pos)
            mayRepBtn.innerText= "Reproducciones ↓ "
            console.log(pos);
            activadoRep= 3

        break
        case 3:
            mostrarPlaylistDOM(playlist)
            activadoRep = 1
            mayRepBtn.innerText= "Reproducciones "

            console.log("Numerico DESACTIVADO");
        break
    }

})


filaBtn.addEventListener("click",()=>{
    CargarEnFila(cancionFila)
})


// CODIGO

mostrarPlaylistDOM(playlist)

