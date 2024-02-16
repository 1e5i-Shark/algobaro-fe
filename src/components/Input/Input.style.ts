import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LabelText = styled.label`
  padding: 0 0.2rem 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.gray_50};
`;

export const BaseInput = styled.input<{ $isError: boolean }>`
  width: 100%;
  height: 4.8rem;
  padding: 0.4rem 1rem;
  background-color: ${({ theme }) => theme.transparent_50};
  border: ${({ theme, $isError }) =>
    $isError ? `1px solid ${theme.red}` : `none`};
  border-radius: 0.3rem;
`;

export const ToggleVisibilityButton = styled.button`
  position: absolute;
  top: 3.4rem;
  right: 0.2rem;
  padding: 0 0.8rem;
  background-color: transparent;
`;

export const InputErrorWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.4rem;
`;

export const InputErrorMessage = styled.span`
  position: absolute;
  padding: 0 0.2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.red};
  transform: translateY(0.2rem);
`;
