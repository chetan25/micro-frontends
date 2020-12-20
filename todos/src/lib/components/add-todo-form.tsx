import React  from 'react';
import styled from 'styled-components';
import {
  Button, Input, Label,
} from 'ui-components/dist';
import { ITodo } from '../interfaces/user';

const FormWrapper = styled.form<{children: React.ReactNode}>`
 margin: 2rem;
 display: grid;
 grid-gap: 2rem;

 label {
   margin-right: 1rem;
 }
 fieldset {
   border: none;
 }
 fieldset > div {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
 }
`;

const SubmitFormButton = styled.div`
    margin-top: 3rem;
    display: flex;
    align-content: center;
    justify-content: center;
`;

interface AddTodoFormProps {
  isProcessing?: boolean;
  hasError?: boolean;
  addNewTodo: (data: ITodo) => void;
  addSuccessFull?: boolean;
}

const AddTodoForm = ({isProcessing, hasError, addNewTodo, addSuccessFull} : AddTodoFormProps) => {
  let titleEl;
  let descriptionEL;
  let actionsEl;
  let endGoalEl;
  console.log(addSuccessFull);
  const addTodo = () => {
    titleEl = (document.getElementById('title') as HTMLInputElement);
    descriptionEL = (document.getElementById('description') as HTMLInputElement);
    actionsEl = (document.getElementById('actions') as HTMLInputElement);
    endGoalEl = (document.getElementById('endgoal') as HTMLInputElement);

    addNewTodo({
      title: titleEl.value,
      description: descriptionEL.value,
      actions: actionsEl.value,
      endGoal: endGoalEl.value
    })
  };

  return (
    <>
      <FormWrapper>
        <fieldset disabled={isProcessing}>
          <div>
            <Label htmlFor="title">Title*</Label>
            <Input type="text" name="title" id="title" />
          </div>
          <div>
            <Label htmlFor="description">Description*</Label>
            <Input type="text" name="description" id="description" />
          </div>
          <div>
            <Label htmlFor="actions">Actions</Label>
            <Input type="text" name="actions" id="actions" />
          </div>
          <div>
            <Label htmlFor="endgoal">End Goal</Label>
            <Input type="text" name="endgoal" id="endgoal" />
          </div>
        </fieldset>
      </FormWrapper>
      <SubmitFormButton>
        <Button
          ariaLabel='Submit New Todo Form Data'
          handleClick={addTodo}
          disabled={isProcessing || hasError}
        >
          Add New Todo
        </Button>
      </SubmitFormButton>
    </>
  )
};

export default AddTodoForm;
