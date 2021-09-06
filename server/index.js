const express=require('express')
const app=express()
const cors=require('cors')
const pool=require("./db")

//middleware
//anytime we are builing the full stack application we need to get the data from the client side the only way to get the data from the client side
//is that we have to get it from request.body object
app.use(cors())

app.use(express.json())// req.body


//routes//

//create a todo

//kyoki post request koi client krega submit pe click kr k
app.post('/todos',async(req,res)=>{
    //await
    try {
        console.log(req.body);
        const {description}=req.body;
        const newTodo=await pool.query("insert into todo (descr) values($1) returning *",[description])

        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.messages);
    }
})

//get all todo

app.get('/todos',async(req,res)=>{
    try {
        const allTodo=await pool.query("select * from todo")
        res.json(allTodo.rows)
        
    } catch (error) {
        console.error(error.messages)
        
    }
})

//get a todo

app.get("/todos/:id",async(req,res)=>{
    try {
        console.log(req.params)
        const {id}=req.params;
        console.log(id)
        const todo=await pool.query("select * from todo where todo_id=($1)",[id])
        res.json(todo.rows)
        
    } catch (error) {
        console.error(error.emssages)
    }
})

//update a todo

app.put("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const {description}=req.body
        const updateTodo=pool.query("update todo set descr=$1 where todo_id=$2",[description,id])
        res.json("todo was updated!")
    } catch (error) {
        console.error(error.messages)
        
    }
})

//delete a todo

app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const deleteTodo=pool.query("delete from todo where todo_id=$1",[id])
        res.json("deleted successfully")
    } catch (error) {
        console.error(error.messages)
        
    }
})

app.listen(5000,()=>
{
    console.log("server has started on 5000")
})