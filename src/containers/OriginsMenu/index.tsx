import React, { useMemo } from 'react';
import { Alert, Select } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { SelectProps } from 'antd/lib/select';
import { useInjectSaga } from '../../app/AppWrapper';
import originsMenuSaga from '../../store/products/saga/originsMenuSaga';
import { getProductsOrigins } from '../../store/products/selectors';

function OriginsMenu<V>(props: SelectProps<V>) {
  const { data, error, loading } = useSelector(
    getProductsOrigins,
    shallowEqual
  );

  const options = useMemo(
    () =>
      data.map(({ displayName, value }) => (
        <Select.Option key={value} value={value}>
          {displayName}
        </Select.Option>
      )),
    [data]
  );

  useInjectSaga('originsMenu', originsMenuSaga);

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    // @ts-ignore
    <Select {...props} loading={loading} placeholder="Select origins">
      {options}
    </Select>
  );
}

export default OriginsMenu;
