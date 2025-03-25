"use client";

import { useState } from "react";
import { useAssessmentStore } from "@/store/assessment";
import { Task } from "@/types/assessment";

export default function Tasks() {
  const { currentUser, tasks, addTask, updateTask } = useAssessmentStore();
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  if (!currentUser) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Please select a user first</p>
      </div>
    );
  }

  const userTasks = tasks.filter((task) => task.userId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) return;

    const task: Task = {
      id: Date.now().toString(),
      userId: currentUser.id,
      competencyId: "general", // You might want to add a competency selector
      title: newTask.title,
      description: newTask.description,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addTask(task);
    setNewTask({ title: "", description: "" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Development Tasks</h2>
        <p className="mt-1 text-gray-600">
          Track and manage your development tasks
        </p>
      </div>

      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
              className="input"
              rows={3}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {userTasks.map((task) => (
          <div key={task.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
              </div>
              <select
                value={task.status}
                onChange={(e) =>
                  updateTask(task.id, {
                    status: e.target.value as Task["status"],
                  })
                }
                className="input py-1"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
