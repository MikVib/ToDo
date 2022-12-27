// const output = document.querySelector('#output')


//  const date = new Date()
// // console.log('день: ',date.getDate());
// // console.log(date.getMonth()+1)
// // console.log(date.getFullYear());
// // console.log(date.getHours());
// // console.log(date.getMinutes());
// // console.log(date.getSeconds());
// // console.log(date.toISOString());

// const currentDate = `Date: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()}
// `
// console.log(currentDate);
// console.log(typeof date.getSeconds())
// output.textContent=currentDate

const form = document.querySelector('form')


let todos = []

const createTask = () =>{
    const message = document.querySelector('input')
    
    if(message.value && message.value !== ' '){
    const task = {
        id:new Date().toISOString(),
        number:todos.length+1,
        message:message.value,
        status:false,
        date:new Date()
    }
    todos = [task,...todos]
    // todos.push(task)
    // console.log([...todos,1]);
    // console.log(todos.length);
    
    renderTodos()}
}



form.addEventListener('submit',e=>{
    
    e.preventDefault()
    createTask()
    form.reset();

})


const renderTodos = () =>{
    const output = document.querySelector('#output')
    output.innerHTML=''
    todos.forEach(el=>{
        const block = document.createElement('div')
        const message = document.createElement('p')
        const dateDom = document.createElement('p')
        const statusMessage = document.createElement('p')
        
        const numberTodo = document.createElement('p')
        const completTodo = document.createElement('p')

        const deleteTodo = document.createElement('img')
        const doneTodo = document.createElement('img')
        const editTodo = document.createElement('img')

        deleteTodo.src = "./images/dele.png"
        doneTodo.src = el.status?'./images/ch.png':'./images/n_ch.png'
        editTodo.src = "./images/edit.png"

        message.textContent = el.message
        statusMessage.textContent = el.status
        ?'TODO IS DONE'
        :'YOUE TODO IS NOT DONE'

        block.classList = el.status
        ?'.done'
        :'.notDone'
        
        message.style.textDecorationLine = el.status
        ? 'line-through'
        :'none'

        const date = el.date
        const number = el.number

        const AllTasks = document.querySelector(".allTasks");
        AllTasks.textContent = todos.length; 

        const completedTasks = document.querySelector(".footer span");

        const completed = todos.filter(el => el.status == false);
        console.log(completed.length);
        

        // completedTasks.textContent = completed.length

        const currentDate = `Date: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()}
`



        dateDom.textContent = currentDate
        

        doneTodo.addEventListener('click',()=>{
            doneFunc(el.id)

        })

        deleteTodo.addEventListener('click',()=>{
            if(el.status === true){
            deleteFunc(el.id)
            }else(alert('Task not completed'))

        })

        editTodo.addEventListener('click',()=>{
            if(el.status !== true){
            editFunc(el.id)
            }else(alert('The task has already been completed, editing is prohibited'))

        })


        block.append(numberTodo,message,dateDom,deleteTodo,doneTodo,editTodo,statusMessage)
        numberTodo.append(number)
        output.append(block,completTodo)
    })
}


const doneFunc = (id) =>{
    // alert('its done')
    // console.log(id);
    todos = todos.map(el=>{
        if(id===el.id){
            // console.log(el.message);
            el.status = !el.status
        }
        return el
    })
    renderTodos()
}


const deleteFunc = (id) =>{
    // alert('its delete')
    // console.log(id);
    todos = todos.filter(el=>{
        return id!==el.id
    })
    renderTodos()
}

const editFunc = (id) =>{
    // alert('its edit')
    // console.log(id);
    
    const edit = prompt('')
    if(edit !== ' ' && edit !== null && edit !== ''){
        todos = todos.map(el=>{
            if(id===el.id){
                // console.log(el.message);
                el.message = edit
                } 
            return el
        })
        renderTodos()
    }else{
        alert('Enter Task')
    }
}

const deleteAllBtn = document.querySelector(".footer button");

deleteAllBtn.onclick = ()=>{
    todos = []; 
    renderTodos(); 
}






