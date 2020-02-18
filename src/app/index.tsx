import React from 'react';
import AppWrapper from './AppWrapper';
import AppRoutes from './AppRoutes';
import ProductEditorModal from '../containers/ProductEditorModal';

const App = () => {
  return (
    <AppWrapper>
      <AppRoutes />
      <ProductEditorModal />
    </AppWrapper>
  );
};

export default App;
