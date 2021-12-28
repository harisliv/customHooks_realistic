import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
  const requestConfig = {
    url: "https://custom-hooks-app-4ed33-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
  }
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
        for (const taskKey in tasksObj) {
          loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
        }
        setTasks(loadedTasks);
    };
    sendRequest(requestConfig, transformTasks);
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
