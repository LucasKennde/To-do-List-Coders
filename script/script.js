const formularioTask = document.querySelector('#formulario-task')

const task = document.querySelector('#task')

const lista = document.querySelector('.lista-tasks')
const tasks = []

formularioTask.addEventListener('submit', (e)=>{
    e.preventDefault();
    const taskId = formularioTask.getAttribute('data-id')

    !taskId? adicionarTask() : atualizarTask(taskId, task.value)
    

    formularioTask.reset()

})

function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function verificarInput(){
    if(task.value === ''){
       alert('Preencha o campo com uma tarefa')
       return false
    }
    return true
}

function adicionarTask(){
    if(!verificarInput()){
        return
    }
    const newTask = {
        id:gerarIdUnico(),
        text: task.value,
        completado: false
    }
    tasks.push(newTask)

    mostrarTasks()
}

function atualizarTask(id, novoTexto) {
    if(verificarInput()){
        return
    }
    const taskAtualizada = tasks.find(task => task.id == id)
    taskAtualizada.text = novoTexto
    formularioTask.removeAttribute('data-id');
    mostrarTasks()
}

function concluirTask(id){
    const taskConcluida = tasks.find(task => task.id == id)
    taskConcluida.completado = !taskConcluida.completado
    mostrarTasks()
}

function excluirTask(id){
    const taskIndex = tasks.findIndex(task => task.id == id)
    tasks.splice(taskIndex, 1)
    mostrarTasks()
}
function editarTask(id){
    const updateTask = tasks.find(task => task.id == id)
    task.value = updateTask.text;
    formularioTask.setAttribute('data-id', id)
    
}

function mostrarTasks() {
    lista.innerHTML = ``
    tasks.forEach((task) => {
        const tarefa = document.createElement('li')
        if(task.completado){
            tarefa.classList.add('task-completada')
        }else{
            tarefa.classList.remove('task-completada')
        }
        tarefa.innerHTML = `
        <section class="concluir" onclick = "concluirTask('${task.id}')"></section>
        <span>${task.text}</span>
        <button class="btn-editar" onclick="editarTask('${task.id}')">Editar</button>
        <button class="btn-excluir" onclick="excluirTask('${task.id}')">Excluir</button>
        `
        lista.appendChild(tarefa)
    })
    console.log(tasks)
}

