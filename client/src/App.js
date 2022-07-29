import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { bindActionCreators } from 'redux';
import './App.css';
import * as messageActionCreators from './actions/actionCreators';

function App () {
  const { messages, isFetching, error, limit } = useSelector(
    ({ chat }) => chat
  );
  const dispatch = useDispatch();
  const { getMessagesAction, createMessageAction } = bindActionCreators(
    messageActionCreators,
    dispatch
  );

  useEffect(() => {
    getMessagesAction(limit);
  }, [limit]);

  useLayoutEffect(() => {
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  const addMessage = (values, formikBag) => {
    createMessageAction(values);
    formikBag.resetForm();
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>ERROR!!!</div>}{' '}
      {isFetching && <div>Messages is loading. Please, wait...</div>}{' '}
      {!isFetching && !error && (
        <ol>
          {messages.map(m => (
            <li key={m._id}>{JSON.stringify(m)}</li>
          ))}
        </ol>
      )}
      <hr />
      <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
        {formikProps => (
          <Form>
            <Field name='body'></Field>
            <button type='submit'>Send</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default App;
