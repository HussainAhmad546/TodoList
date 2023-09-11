import React from 'react';

const ClearIndicator = (props) => {
  const {
    children = (
      <span style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>
        ×
      </span>
    ),
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      {children}
    </div>
  );
};

const todoAppStyles = {
  todoListContainer: {
    minHeight: '180px',
    maxHeight: '230px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '12px',
  },
  existingTodoContainer: {
    height: '500px',
    overflowY: 'auto',
  },
};

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '200px',
    margin: 'auto',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
};

export { ClearIndicator, todoAppStyles, modalStyles };
