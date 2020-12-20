import React, { useState} from 'react';
import styled from 'styled-components';
import {Banner, IconButton, Spinner} from "ui-components/dist";
import AddTodoForm from "./add-todo-form";
import { ITodo } from '../interfaces/user';

const ErrorSpinner = styled(Spinner)`
 height: 5rem;
`;

const DrawerTitle = styled.div<{children: React.ReactNode}>`
  min-height: 2rem;
  border-bottom: 1px solid grey;
  text-align: center;
`;

const CloseButton = styled.div`
  --icon-btn-size: 1rem;
  position: absolute;
  top: 0;
  right: 0;
   padding: 1rem;
`;

interface AddTodoModalProps {
  closeDrawer: () => void;
  addNewTodo: (todo: ITodo) => void;
  hasError?: boolean;
  isProcessing?: boolean;
  addSuccessFull?: boolean;
}

const AddTodoModal = ({closeDrawer, addNewTodo, hasError, isProcessing, addSuccessFull}: AddTodoModalProps) => {
  const [validationError, setValidationError] = useState(false);

  const onClose = () => {
    return new Promise(res => {
      setTimeout(() => {
        res('done');
      }, 2000);
    });
  }

  const addTodo = (data: ITodo) => {
    setValidationError(false);
    console.log('error');
    if (data.title === '' || data.description === '') {
      setValidationError(true);
      return;
    }

    addNewTodo(data);
  }
  return (
    <>
      <DrawerTitle>
        <div>
          <h2>Add a new Todo</h2>
          <CloseButton>
            <IconButton handleClick={!isProcessing ? closeDrawer : undefined}>X</IconButton>
          </CloseButton>
        </div>
      </DrawerTitle>
      <AddTodoForm  hasError={hasError} isProcessing={isProcessing}  addNewTodo={addTodo} addSuccessFull={addSuccessFull}/>
      {
        isProcessing ? <ErrorSpinner /> : null
      }
      {
        hasError ? <Banner type='error' onClose={onClose}>Sorry there was an error adding todo.</Banner> : null
      }
      {
        validationError ? <Banner type='error'>Title and Description are required fields.</Banner> : null
      }
      {
        addSuccessFull ?  <Banner type='success' autoClose={true}>Todo Added Successfully.</Banner> : null
      }
    </>
  );
};

export default AddTodoModal;
