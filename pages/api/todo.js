// pages/api/todos.js

import connectToDatabase from '../../db.js';
import Todo from '../../models/todo.js'; // Import the Todo model

connectToDatabase(); // Initialize the database connection

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      console.error('Error retrieving todos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { text } = req.body;
    const newTodo = new Todo({ text });

    try {
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }else if (req.method === 'PUT') {
    // Update a todo's completion status
    const { id, completed,text } = req.body;
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { completed,text },
        { new: true } 
      );
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a todo
    const { id } = req.body;
    try {
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json(deletedTodo);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
   else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
