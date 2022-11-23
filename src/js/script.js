const inputNome = document.querySelector('#nome') //usuário insere o nome de jogador no campo nome
let spanUser = document.querySelector('#user') //nome será recuperado na TelaJogo
const btnJogar = document.querySelector('#btnJogar') //btnJogar.click : nome é armazenado em localStorage e recuperado na TelaJogo
let nome
let imgs = document.querySelectorAll('#numbers img')
let img1 = document.querySelector('#img1')
let img2 = document.querySelector('#img2')
let img3 = document.querySelector('#img3')
let combo = []
let btnPlay = document.querySelector('#btnPlay')
var spanHistorico = document.querySelector('#historico')
var spanPontos = document.querySelector('#pontos')
var pontos = 0
var historico = 0
var ultimoHistorico
let numSorteado



function showHide(obj,action){
    document.querySelector(obj).classList[action]('hide')
}


btnJogar.addEventListener('click',()=>{
    if(inputNome.value == ''){
        spanUser.textContent = `Comece digitando o seu nome e clique em INICIAR`
    }else{
        showHide('#telaJogo','remove')
        showHide('#telaInicial','add')
        spanUser.textContent = `Comece digitando o seu nome e clique em INICIAR`
        spanUser.innerHTML = `Olá ${inputNome.value}, clique em JOGAR e revele as cartas!`
        localStorage.setItem('nome', inputNome.value)
        nome = localStorage.getItem('nome')
        
    }
})


function alteraimagens(){
    
    imgs.forEach((el,index)=>{
        
        combo.push(parseInt(Math.random()*3)+1)
        el.addEventListener('click',
        (e,x)=>{
            e.target.src=`./images/number_${numSorteado[index]}.png`
            
            btnPlay.textContent = `S O R T E A R`
            


            })  
         })
}


function verificaPontos(){
    //Histórico de números sorteados e sistema de pontuação:
    if (historico === 0){
        localStorage.setItem('historico', numSorteado)
        historico = localStorage.getItem('historico')
    } else{
        localStorage.setItem('ultimo historico', historico)
        ultimoHistorico = localStorage.getItem('ultimo historico')
        localStorage.removeItem('historico')
        localStorage.removeItem('ultimo historico')
        localStorage.setItem('historico', numSorteado)
        historico = localStorage.getItem('historico')
    }

    ultimoHistorico === '1,1,1' || ultimoHistorico === '2,2,2' || ultimoHistorico === '3,3,3' ? pontos = pontos +1 : null
    numSorteado == ultimoHistorico ? pontos = pontos +1 : null
    spanPontos.textContent = `${pontos}`
    ultimoHistorico !== undefined ? spanHistorico.textContent = `${ultimoHistorico}` : null
}


btnPlay.addEventListener('click', function(){
    img1.setAttribute('src', './images/question.png')
    img2.setAttribute('src', './images/question.png')
    img3.setAttribute('src', './images/question.png')
    alteraimagens(combo)


//////DADOS SALVOS COMO OBJETO
    // function Usuario(nomeUsuario, pontosUsuario, hitoricoUsuario, numSorteadosUsuario) {
    //     this.nomeUsuario = nomeUsuario;
    //     this.pontosUsuario = pontosUsuario;
    //     this.hitoricoUsuario = hitoricoUsuario;
    //     this.numSorteadosUsuario = numSorteadosUsuario;
    // }

    // dadosUsuario = new Usuario(nome, pontos, historico, combo)
    // nome=! '' ? localStorage.setItem('novoUsuarioXXX', JSON.stringify(dadosUsuario)): null

    // getDadosUsuario = localStorage.getItem('usuario')
    // dadosUsuarioObject = JSON.parse(getDadosUsuario)


numSorteado = (combo.slice(-3))

verificaPontos()

console.log(`------------------------`)
console.log(`nome: ${nome}`)
console.log(`pontos: ${pontos}`)
console.log(`ultimoHistorico: ${ultimoHistorico}`)
console.log(`numSorteado: ${numSorteado}`)
console.log(`------------------------`)
console.log(combo.length)


})

$().ready(function () {
    $('#btnJogar').click(function () {
        // mostrar a modal com a div de regras antes de comecar o jogo - class="modal--regras" id="modalRegras"
        inputNome.value !== '' ? $('.modal').modal('show'): null
        $('.modal--regras').removeClass('hide')
    })
    $('#btnPlay').click(function () {  //mostrar o modal com a div - class=" modal--viraCartas" id="modalviraCartas" 
        if(ultimoHistorico == undefined ){
            $('.modal').modal('show')
            $('.modal--regras').addClass('hide')
            $('.modal--viraCartas').removeClass('hide')
        }
        
        // mostrar a modal com a tela final de ganhador ou perdedor e ativar a classe desfoque para a tela jogo - class=" modal--telaFinal " id="modalTelaFinal"
        
        
            if(combo.length >= 29 && pontos >=3){
                spanUser.innerHTML = `Parabéns ${inputNome.value}! Você ganhou o jogo 👏👏👏`
                // MOSTRAR O RESULTADO SEM MODAL
                // $('#telaJogo').addClass('hide')
                // $('#winLooser').removeClass('hide')
                // $('#ganhou').removeAttr('hidden')

                // MOSTRAR RESULTADO COM MODAL
                $('.modal').modal('show')
                $('.modal--regras').addClass('hide')
                $('.modal--viraCartas').addClass('hide')
                $('.modal--telaFinal').removeClass('hide')
                $('.modal-ganhou').removeAttr('hidden')
                $('.modal-info-ganhou').removeAttr('hidden')
                
            }else if(combo.length >= 29 && pontos <3){
                spanUser.innerHTML = `Não foi dessa vez ${inputNome.value}. Continue tentando...`

                // MOSTRAR O RESULTADO SEM MODAL
                // $('#telaJogo').addClass('hide')
                // $('#winLooser').removeClass('hide')
                // $('#perdeu').removeAttr('hidden')
                
                // MOSTRAR RESULTADO COM MODAL
                $('.modal').modal('show')
                $('.modal--regras').addClass('hide')
                $('.modal--viraCartas').addClass('hide')
                $('.modal--telaFinal').removeClass('hide')
                $('.modal-perdeu').removeAttr('hidden')
                $('.modal-info-perdeu').removeAttr('hidden')

            }else null
    })

})


// function Usuario(nomeUsuario, pontosUsuario, hitoricoUsuario, numSorteadosUsuario) {
// this.nomeUsuario = nomeUsuario;
// this.pontosUsuario = pontosUsuario;
// this.hitoricoUsuario = hitoricoUsuario;
// this.numSorteadosUsuario = numSorteadosUsuario;
// }


// dadosUsuario = new Usuario(nome, pontos, historico, combo)
// nome=! '' ? localStorage.setItem('novoUsuarioXXX', JSON.stringify(dadosUsuario)): null

// var salvarDados = function(){

// }

// getDadosUsuario = localStorage.getItem('usuario')
// dadosUsuarioObject = JSON.parse(getDadosUsuario)


// // let numSorteados
// // let numeros = [1, 2, 3]
// // var sortear = parseInt(Math.random()*3)
// // btnPlay.onclick = function() {
        
// //         let numSorteados = new Array()
// //         numSorteados.push({nome: inputNome.value, numSorteados: numSorteados.})
// // }

