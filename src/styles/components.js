import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth}px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const OutlineButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
`;

export const LightButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
`;

export const InverseOutlineButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #f2c7c7;
  background: ${({ theme }) => theme.colors.light};
  font-size: 14px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;
