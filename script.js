const cep = document.querySelector("#cep")
var validacep = /^[0-9]{8}$/
const showData = (result) => {
    
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }

}

cep.addEventListener("blur", (e) =>{
    let search = cep.value.replace("-", "")
    const cepValue = cep.value
    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cepValue)){
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch(`https://viacep.com.br/ws/${search}/json`, options)
        .then(response =>{response.json()
            .then(data => showData(data))
            successValidation(cep)
            addLoader()
        })
        .catch(errorValidation(cep, 'CEP nao encontrado'))
        apagaForm()
        
    }
    else{
        apagaForm()
        errorValidation(cep, 'CEP inválido')
    }
    

})
// reset
function apagaForm() {
	document.getElementById('form').reset();
}


//função de erro
function errorValidation(input, message){
    const formgroup = input.parentElement;
    const small = formgroup.querySelector('small')

    small.innerText = message

    formgroup.className = 'form-group error'
}

//funçao de sucesso
function successValidation(input){
    const formgroup = input.parentElement;
    
    formgroup.className = 'form-group success'
}

function addLoader(){
    const ruaLoad = document.getElementById('ruaLoad')
    ruaLoad.className = "loader-visib"
}
