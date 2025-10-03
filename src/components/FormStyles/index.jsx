import styled from 'styled-components';

// Wrapper para melhorar a organização visual do formulário
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px 20px 20px;
  height: 100%;
  justify-content: flex-start;
  margin-top: 0;
`;

// Header da seção para título ou subtítulo
export const SectionHeader = styled.div`
  margin-bottom: 8px;
  margin-top: 0;
`;

// Indicador visual para campos obrigatórios
export const RequiredIndicator = styled.span`
  color: #e74c3c;
  font-weight: bold;
  margin-left: 2px;
`;

// Container para agrupar campos relacionados
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 5px;
`;

// Estilo para mensagens de validação em tempo real
export const ValidationMessage = styled.div`
  font-size: 12px;
  color: ${props => props.type === 'error' ? '#e74c3c' : '#27ae60'};
  margin-top: 5px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

// Container para o botão de submit com estilo melhorado
export const SubmitSection = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 15px;
  margin-bottom: 15px;
`;

// Divisor visual entre seções
export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
  margin: 20px 0;
`;

// Container para informações adicionais
export const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 5px 0 8px 0;
  line-height: 1.4;
`;

// Estilo para o progresso do formulário
export const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const ProgressStep = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#8b4513' : '#ddd'};
  transition: background 0.3s ease;
`;

// Wrapper para checkbox com melhor estilo
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin: 10px 0;
  transition: background 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
  }
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #8b4513;
  }
  
  label {
    margin: 0;
    color: #333;
    font-size: 14px;
    cursor: pointer;
  }
`;
