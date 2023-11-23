import React, { useContext } from 'react';

function CreateContext(context: React.Context<any>) {
    const _context = useContext(context);
    if (!_context) {
      throw new Error('Context not provided properly');
    }
  
    return _context;
}

export { CreateContext };