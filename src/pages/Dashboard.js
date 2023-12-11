import React from 'react'
import TaskCard from "../components/TaskCard";
import "../styles/Dashboard.sass";

const Dashboard = ({ allTasks, handleDelete }) => {

  const colors = [
    "#DEDAF4",
    "#D9EDF8",
    "#E4F1EE",
    "#FDFFB6",
    "#FFD6A5",
    "#FFADAD",
  ]

  //getting all the unique categories and putting it in an array
  const uniqueCategories = [
    ...new Set(allTasks?.map((task) => task.category))
  ];

  return (
    <div className="dashboard">
      <div className="task-container">
        <h1>My Projects</h1>

        {allTasks && uniqueCategories?.map((uniqueCategory, uniqueCategoryIndex) => (
          <div key={uniqueCategoryIndex}>
            <h3>{uniqueCategory}</h3>
            <div className="heading-bar">
              <div></div>
              <div>Owner</div>
              <div>Status</div>
              <div>Description</div>
              <div>Progress</div>
              <div>Due Date</div>
              <div>Priority</div>
            </div>
            {allTasks.filter(task => task.category === uniqueCategory)
              .map((task, taskIndex) => (
                <TaskCard
                  key={taskIndex}
                  color={colors[uniqueCategoryIndex]}
                  task={task}
                  onDelete={() => handleDelete(task.id)}
                />
              ))
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;