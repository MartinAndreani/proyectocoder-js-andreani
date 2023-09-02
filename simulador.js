
// MENU DE OPCIONES
function menu(){
    let primer = false
    let salir = false
    do{
        let op = parseInt(prompt(`Ingrese la opcion deseada
        1- Cargar Canciones
        2- Ver Duracion del Album
        3- Ver Cancion con Mas Reproducciones
        4- Promedio de Reproducciones
        0- Salir`))
        

        switch (op){
            
            case 1:
                let alb = prompt("Ingrese el nombre del Album")
                console.log('Elegiste Opcion 1');
                console.log(`El Album se llama ${alb}`);
                alert(`El Album se llama ${alb}`)

                let cantCancion = parseInt(prompt(`Ingrese la cantidad de Canciones que desee: `))
                cantCancion = validar(cantCancion,`Error - Ingrese la cantidad de Canciones que desee: `,true)
                primer = true
                cargarCanciones(cantCancion)
            break

            case 2:
                if(primer == true){
                    alert(`La Duracion del Album es de ${cantDur} minutos`)
                    console.log(`La Duracion del Album es de ${cantDur}`);
                }else{
                    alert(`Debe cargar las Canciones primero`)
                }
                
            break
            case 3:
                if(primer == true){
                    console.log(`La cancion ${mayortit} es la mas escuchada con ${mayorrep} reproducciones`);
                    alert(`La cancion ${mayortit} es la mas escuchada con ${mayorrep} reproducciones`)
                }else{
                    alert(`Debe cargar las Canciones primero`)

                }
                
                
            break
            case 4:
                if(primer == true){
                    console.log(`El promedio de reproducciones es de ${prom}`);
                    alert(`El promedio de reproducciones es de ${prom}`);

                }else{
                    alert(`Debe cargar las Canciones primero`)

                }
            break
            case 0:
                console.log(`Que tengas un buen dia :D
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
let mayorrep = 0
let mayortit = ""
let contador = 0 
let prom = 0

function cargarCanciones(cantCancion){
    
    for(let i = 1; i <= cantCancion; i++){
        let tit = prompt("Ingrese el titulo de la cancion")
        
        let dur = parseFloat(prompt(`Ingrese la duracion de ${tit}`))
        dur=validar(dur,`Error - Ingrese la Duracion de ${tit}: `,false)

        let rep = parseInt(prompt(`Ingrese el numero de reproducciones de ${tit}`))
        rep=validar(rep,`Error - Ingrese el numero de reproducciones de ${tit}: `,true)

        punto3(tit,rep)
        
        contador += 1
        cantDur += dur
        cantRep += rep
        mostrarCanc(tit, dur, rep)
        promedio(cantRep,contador)

    }
}

function promedio(cantRep,contador){
    prom = Math.floor(cantRep / contador)
}


function punto3(tit,rep){
    if(rep > mayorrep){
        mayorrep = rep
        mayortit = tit
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

function mostrarCanc(tit, dur, rep){
    alert(`La cancion ${tit}, dura ${dur} minutos y tiene ${rep} reproducciones`)
    console.log(`La cancion ${tit}, dura ${dur} y tiene ${rep} reproducciones`);
}






menu()
