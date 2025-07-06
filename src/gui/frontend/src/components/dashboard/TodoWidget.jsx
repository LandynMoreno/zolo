import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, X, Edit, Calendar, Clock, Flag } from 'lucide-react';
import Modal from '../shared/Modal';

const TodoWidget = ({ onApiCall }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Camera system health check',
      description: 'Verify all camera feeds are operational',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-07-06',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Update LED patterns',
      description: 'Test new breathing pattern for standby mode',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2025-07-07',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Network connectivity test',
      description: 'Run diagnostic on WiFi connection stability',
      priority: 'low',
      status: 'completed',
      dueDate: '2025-07-05',
      createdAt: new Date().toISOString()
    }
  ]);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const statusColors = {
    pending: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500'
  };

  const handleAddTodo = () => {
    if (newTodo.title.trim()) {
      onApiCall('Would be calling API_ROUTE="/api/todos" for creating new todo item');
      
      const todo = {
        id: Date.now(),
        ...newTodo,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setTodos(prev => [...prev, todo]);
      setNewTodo({ title: '', description: '', priority: 'medium', dueDate: '' });
      setIsModalOpen(false);
    }
  };

  const handleToggleStatus = (id) => {
    onApiCall(`Would be calling API_ROUTE="/api/todos/${id}" for updating todo status`);
    
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            status: todo.status === 'completed' ? 'pending' : 
                   todo.status === 'pending' ? 'in-progress' : 'completed'
          }
        : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    onApiCall(`Would be calling API_ROUTE="/api/todos/${id}" for deleting todo item`);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const pendingTodos = todos.filter(todo => todo.status !== 'completed');
  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <>
      <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Task Schedule</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-light">{pendingTodos.length} pending</span>
            <Plus className="w-5 h-5 text-primary-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          {pendingTodos.slice(0, 3).map(todo => (
            <div key={todo.id} className="flex items-center gap-3 p-2 bg-surface rounded-lg">
              <div className={`w-2 h-2 rounded-full ${priorityColors[todo.priority]}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{todo.title}</div>
                <div className="text-xs text-text-light">{todo.dueDate}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${statusColors[todo.status]}`} />
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Task Schedule"
        size="lg"
      >
        <div className="p-6">
          {/* Add New Todo */}
          <div className="mb-6 p-4 bg-surface rounded-lg">
            <h4 className="font-medium mb-3">Add New Task</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task title"
                value={newTodo.title}
                onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
              <textarea
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background h-20 resize-none"
              />
              <div className="flex gap-3">
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg bg-background"
                />
                <button
                  onClick={handleAddTodo}
                  className="button px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Pending Tasks ({pendingTodos.length})</h4>
            <div className="space-y-3">
              {pendingTodos.map(todo => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-border rounded-lg bg-background"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${priorityColors[todo.priority]}`} />
                        <h5 className="font-medium">{todo.title}</h5>
                        <div className={`px-2 py-1 text-xs rounded-full text-white ${statusColors[todo.status]}`}>
                          {todo.status}
                        </div>
                      </div>
                      {todo.description && (
                        <p className="text-sm text-text-light mb-2">{todo.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-text-light">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {todo.dueDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(todo.id)}
                        className="p-1 hover:bg-surface rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="p-1 hover:bg-surface rounded text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          {completedTodos.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Completed Tasks ({completedTodos.length})</h4>
              <div className="space-y-2">
                {completedTodos.map(todo => (
                  <div key={todo.id} className="p-3 border border-border rounded-lg bg-surface/50 opacity-75">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="line-through text-sm">{todo.title}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="p-1 hover:bg-surface rounded text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TodoWidget;