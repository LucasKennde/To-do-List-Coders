const formularioTask = document.querySelector('#formulario-task')
const task = document.querySelector('#task')
const lista = document.querySelector('.lista-tasks')
const tasks = []

formularioTask.addEventListener('submit', (e)=>{
    e.preventDefault();

    adicionarTask()

    formularioTask.reset()

})

function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function adicionarTask(){
    
    const newTask = {
        id:gerarIdUnico(),
        text: task.value,
        completado: false
    }
    tasks.push(newTask)
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
        <button class="btn btn-completar" onclick="editarTask('${task.id}')">Editar</button>
        <button class="btn btn-excluir" onclick="excluirTask('${task.id}')">Excluir</button>
        `
        lista.appendChild(tarefa)
    })
    console.log(tasks)
}

