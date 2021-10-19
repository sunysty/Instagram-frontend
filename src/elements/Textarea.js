import React from 'react';
import styled from 'styled-components';
const Textarea = (props) => {
  const { placeholder, _onChange, margin, name, value, disabled, size } = props;
  const styles = {
    margin: margin,
    size: size,
  };
  return (
    <React.Fragment>
      <ElTextarea
        name={name}
        placeholder={placeholder}
        rows={3}
        onChange={_onChange}
        value={value}
        disabled={disabled}
        {...styles}
      />
    </React.Fragment>
  );
};
Textarea.defaultProps = {
  placeholder: '텍스트를 입력하세요',
  _onChange: () => {},
  margin: false,
  disabled: false,
};
const ElTextarea = styled.textarea`
  width: 100%;
  ${(props) => (props.size ? `font-size: ${props.size};` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  padding: 8px;
  border: none;
  /* border: 1px solid #243443; */
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;
export default Textarea;
