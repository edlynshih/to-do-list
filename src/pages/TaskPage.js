import React, { useState, useEffect } from 'react';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/TaskPage.sass";

const TaskPage = ({ allTasks, setAllTasks, taskData, setTaskData, handleAdd }) => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    setEditMode(!!id);

    if (id) {
      const selectedTask = allTasks.find(task => task.id === id);
      setTaskData(selectedTask);
    }
  }, [id, allTasks, setTaskData]);

  const handleChange = ({ target }) => {
    const { value, name } = target;

    const updatedValue = name === 'dueDate' ? new Date(value) : value;

    setTaskData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleProgressChange = (e) => {
    const value = e.value;

    setTaskData((prev) => ({
      ...prev,
      progress: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedTasks = allTasks.map(task => {
        if (task.id === taskData.id) {
          return {
            ...task,
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            dueDate: taskData.dueDate,
            priority: taskData.priority,
            progress: taskData.progress,
            owner: taskData.owner,
            avatar: taskData.avatar,
            category: taskData.category,
          };
        }
        return task;
      });

      setAllTasks(updatedTasks);
      setEditMode(false);
      setTaskData({
        title: '',
        description: '',
        status: 'Working on it',
        dueDate: new Date(),
        priority: 0,
        progress: 0,
        owner: '',
        avatar: '',
        id: new Date().toISOString(),
        category: '',
      });

    } else {
      handleAdd(e);
    }
    navigate('/');
  };

  const categories = ['This month', 'Next month'];

  const statusOptions = [
    { label: "Done", value: "Done" },
    { label: "Working on it", value: "Working on it" },
    { label: "Stuck", value: "Stuck" },
  ];

  return (
    <div className="task-page">
      <h1>{editMode ? 'Update your Task' : 'Create a Task'}</h1>
      <div className="task-container">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Title</label>
            <InputText
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required
              value={taskData.title}
            />

            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              required
              value={taskData.description}
            />

            <label htmlFor='category'>Category</label>
            <Dropdown
              id='category'
              name="category"
              value={taskData.category}
              onChange={handleChange}
              options={categories?.map((category) => (
                category
              ))}
              editable
            />

            <label htmlFor="priority">Priority</label>
            <Rating
              id='priority'
              name='priority'
              value={taskData.priority}
              onChange={handleChange}
              cancel={false}
              required
            />

            <label htmlFor="dueDate">Due Date</label>
            <Calendar
              id="dueDate"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              required
            />

            {editMode &&
              <>
                <label htmlFor="progress">Progress</label>
                <InputText
                  id='progress'
                  name='progress'
                  value={taskData.progress}
                  onChange={handleChange}
                />
                <Slider
                  id='progress'
                  name='progress'
                  value={taskData.progress}
                  onChange={handleProgressChange}
                />

                <label htmlFor="status">Status</label>
                <Dropdown
                  id='status'
                  name='status'
                  value={taskData.status}
                  onChange={handleChange}
                  options={statusOptions}
                />
              </>
            }
            <div>
              <input className='submit-button' type='submit' />
              <button className='cancel-button' onClick={() => { navigate('/') }} type='cancel'>Cancel</button>
            </div>
          </section>
          <section>
            <label htmlFor='owner'>Owner</label>
            <InputText
              id='owner'
              name='owner'
              value={taskData.owner}
              onChange={handleChange}
              required
            />

            <label htmlFor='avatar'>Avatar</label>
            <InputText
              id='avatar'
              name='avatar'
              value={taskData.avatar}
              onChange={handleChange}
              type='url'
            />
            <div className='img-preview'>
              {taskData.avatar && (
                <img src={taskData.avatar} alt='profile preview' />
              )}
            </div>
          </section>
        </form>
      </div>
    </div >
  )
}

export default TaskPage;