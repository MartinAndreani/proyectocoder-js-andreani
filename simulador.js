class Cancion{
    constructor(id,titulo,artista,album,duracion,reproducciones){
        this.id = id
        this.titulo = titulo
        this.artista =artista
        this.album = album
        this.duracion = duracion
        this.reproducciones = reproducciones
    }
    
    display(){
        console.log(`\n|ID: ${this.id} |TITULO: ${this.titulo} |ARTISTA: ${this.artista} |ALBUM: ${this.album} |DURACION ${this.duracion} |REPRODUCCIONES: ${this.reproducciones} `);
    }
    
    
}

const playlist =[]


// MENU DE OPCIONES
function menu(){
    let primer = false
    let salir = false
    
    
    do{
        let op = parseInt(prompt(`Ingrese la opcion deseada
        1- Agregar Canciones
        2- Borrar Canciones
        3- Consultar Canciones
        4- Ordenar Titulo Alfabeticamente  
        5- Ver Duracion de la Playlist
        6- Ver Cancion con Mas Reproducciones
        7- Promedio de Reproducciones
        8- Buscar Cancion por Titulo
        9- Filtrar Artista
        10- Filtrar Album
        0- Salir`))
        

        switch (op){
            
            case 1:
                console.log('Elegiste Opcion 1');

                let cantCancion = parseInt(prompt(`Ingrese la cantidad de Canciones que desee: `))
                cantCancion = validar(cantCancion,`Error - Ingrese la cantidad de Canciones que desee: `,true)
                primer = true
                cargarCanciones(cantCancion)
                mostrarDisplay(playlist);
            break
            case 2:
                if (primer == true ){
                    borrarCancion(playlist)
                    mayorRep = 0
                    mayorTit = ''
                } else{
                    alert(`Debe cargar las Canciones primero`)
                }
            
            break
            case 3:
                mostrarDisplay(playlist)
            break
            case 4:
                if (primer == true ){
                    console.log(`\n ORDENADO ALFABETICO`);
                    Alfabetico(playlist)
                } else{
                    alert(`Debe cargar las Canciones primero`)
                }

            break
            case 5:
                if(primer == true){
                    alert(` La Duracion de la Playlist es de ${cantDur} minutos`)
                    console.log(`\nLa Duracion del Playlist es de ${cantDur}`);
                }else{
                    alert(`Debe cargar las Canciones primero`)
                }
                
            break
            case 6:
                if(primer == true){
                    mayor(playlist)
                    console.log(`\nLa cancion ${mayorTit} es la mas escuchada con ${mayorRep} reproducciones`);
                    alert(`La cancion ${mayorTit} es la mas escuchada con ${mayorRep} reproducciones`)
                }else{
                    alert(`Debe cargar las Canciones primero`)

                }
            break
            case 7:
                if(primer == true){
                    console.log(`\nEl promedio de reproducciones es de ${prom}`);
                    alert(`El promedio de reproducciones es de ${prom}`);

                }else{
                    alert(`Debe cargar las Canciones primero`)

                }
            break
            case 8:
                
                if (primer == true ){
                    buscarCancion(playlist);
                } else{
                    alert(`Debe cargar las Canciones primero`)
                }
            break
            case 9:
                opfilter = 1
                if (primer == true ){
                    console.log(`Playlist Filtrada por Artista`);
                    filtrarArtista(playlist,opfilter);
                } else{
                    alert(`Debe cargar las Canciones primero`)
                }
            break
            case 10:
                opfilter = 2
                if (primer == true ){
                    console.log(`Playlist Filtrada por Album`);
                    filtrarArtista(playlist,opfilter)
                } else{
                    alert(`Debe cargar las Canciones primero`)
                }
            break
            
            
            case 0:
                console.log(`\nQue tengas un buen dia :D
                SALUDOS!`);
                salir= true
            break
            default:
                console.log("Error - Opcion no valida");
            break
        }
    }while(!salir)
    
}


let cantDur = 0
let cantRep = 0
let mayorRep = 0
let mayorTit = ""
let contador = 0 
let prom = 0

function cargarCanciones(cantCancion){
    
    for(let i = 1; i <= cantCancion; i++){
        let tit = prompt("Ingrese el Titulo de la cancion")
        let art = prompt("Ingrese el Artista de la cancion")
        let alb = prompt("Ingrese el Album de la cancion")
        
        let dur = parseFloat(prompt(`Ingrese la duracion de ${tit}`))
        dur=validar(dur,`Error - Ingrese la Duracion de ${tit}: `,false)

        let rep = parseInt(prompt(`Ingrese el numero de reproducciones de ${tit}`))
        rep=validar(rep,`Error - Ingrese el numero de reproducciones de ${tit}: `,true)
        const nuevaCancion = new Cancion(Math.trunc(Math.random()*10000),tit, art,alb, dur,rep)
        console.log(nuevaCancion)
        ;
        playlist.push(nuevaCancion)   

        
        contador += 1
        cantDur += dur
        cantRep += rep
        
        promedio(cantRep,contador)

    }
}





function promedio(cantRep,contador){
    prom = Math.round(cantRep / contador)
}


function mayor(playlist){
    for(let cancion of playlist){
        if(cancion.reproducciones > mayorRep){
            mayorRep = cancion.reproducciones
            mayorTit = cancion.titulo
        }
    }
}

function validar(num,mensaje,int){

    while(isNaN(num)){
        if(int === false){
            num = parseFloat(prompt(mensaje))
            
        }else{
            num = parseInt(prompt(mensaje))
        }
        }
        return num
}


function mostrarDisplay(playlist){
    console.log("\n PLAYLIST: ");
    for(let cancion of playlist){
        cancion.display()
    }
}


function buscarCancion(playlist){
    let buscarTit= prompt("Ingrese el titulo que desea buscar")
    let busqueda = playlist.find(
        (canc)=> {return canc.titulo.toLowerCase() == buscarTit.toLocaleLowerCase()}
    )
    if (busqueda == undefined){
        console.log(`La cancion ${buscarTit} no se ha encontrado`);
    }else{
        console.log(busqueda);
    }
}



function filtrarArtista(playlist,opfilter){
    switch(opfilter){
        case 1:
            let buscarArt = prompt("Ingrese el nombre del Artista que busca")
            let Art = playlist.filter(
                (canc)=> canc.artista.toLowerCase() == buscarArt.toLowerCase() 
            )
            if (Art.length == 0){
                console.log(`El Artista ${buscarArt} no se encuentra`);
            }else {
                mostrarDisplay(Art)
            }
        break
        case 2:
            let buscarAlb = prompt("Ingrese el nombre del Album que busca")
            let Alb = playlist.filter(
                (canc)=> canc.album.toLowerCase() == buscarAlb.toLowerCase() 
            )
            if (Alb.length == 0){
                console.log(`El Artista ${buscarAlb} no se encuentra`);
            }else {
                mostrarDisplay(Alb)
                
            }
        break
    }
}


function Alfabetico(playlist){
    let ordenadoAlf = playlist.concat()
    ordenadoAlf.sort(
        (a,b)=> {
            if(a.titulo > b.titulo){
                return 1
            }
            if(a.titulo < b.titulo){
                return -1
            }
            return 0
        }
    )
    
    mostrarDisplay(ordenadoAlf)
}

function borrarCancion(playlist){
    mostrarDisplay(playlist)
    let eliminar = parseInt(prompt(`Ingresar el ID de la cancion que desea borrar`))
    eliminar=validar(eliminar,`Error - Ingrese un Numero de ID `,true)
    let coinc = false
    for (let cancion of playlist){
        if (cancion.id == eliminar){
            let indice = playlist.indexOf(cancion)
            playlist.splice(indice,1)
            console.log("\nLa playlist fue actualizada");
            mostrarDisplay(playlist)
        }
    }
}


menu()
