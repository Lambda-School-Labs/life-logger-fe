import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { deleteEvent, fetchEvent, updateEvent } from '../../../store/actions';
import { TaskContainer } from '../styles';
import trashBin from '../../../assets/img/trash.png'

const Task = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState();
  const [dueDate, setDueDate] = useState();
  const { currentEvent } = useSelector(state => state.events);
  const eventID = props.match.params.id;

  useEffect(
    () => {
      dispatch(fetchEvent(eventID));
    },
    [eventID, dispatch]
  );

  useEffect(
    () => {
      if (currentEvent) {
        setStartDate(
          moment(currentEvent.event_st_tm).format('ddd, MMM Do, YYYY - h:mm A')
        );

        setDueDate(
          moment(currentEvent.event_et_tm).format('ddd, MMM Do, YYYY - h:mm A')
        );
      }
    },
    [currentEvent]
  );

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete this task?`,
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value){
        dispatch(deleteEvent(eventID));
      }
    })
  };

  const handleEdit = () => {
    history.push(`/edit-task/${eventID}`);
  };

  const markCompleted = () => {
    dispatch(
      updateEvent(
        {
          ...currentEvent,
          iscomplete: true,
        },
        eventID
      )
    );
    history.push('/');
  }
  // console.log('currentevetn', currentEvent)

  if (!currentEvent) return <h1>Loading...</h1>;
  else
    return (
      <TaskContainer>
        <div className="back-button-container">
          <button
            onClick={() => {
              history.push('/');
            }}
          >
            Back to Task List
          </button>
          <button
            onClick={() => {
              history.push('/calendar');
            }}
          >
            Go to Calendar
          </button>
        </div>
        <h1>
          {currentEvent.title}
        </h1>
        {/* <div className="category">
          {category}
        </div> */}
        <div className="task-info">
          <div>
            <span>Start Date:</span>
            <span>
              {startDate}
            </span>
          </div>
          <div>
            <span>Due Date:</span>
            <span>
              {dueDate}
            </span>
          </div>
          <div>
            <span>Location:</span>
            <span>
              {currentEvent.location}
            </span>
          </div>
        </div>
        <p className="description">
          {currentEvent.event_text}
        </p>
        <div className="button-container">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={markCompleted}>Comleted!</button>
          {/* <button onClick={handleDelete}>Delete</button> */}
          <div onClick={handleDelete}>
            <img alt="trash bin" src={trashBin}/>
          </div>
        </div>
      </TaskContainer>
    );
};

export default Task;
