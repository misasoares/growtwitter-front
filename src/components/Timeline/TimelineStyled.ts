import styled from "styled-components";

export const HrStyled = styled.hr`
  opacity: 0.5;
  padding: 0;
  margin: 0;
`;



export const BodyTimeline = styled.div`
  border: 2px solid #e0e0e0;
  width: 60%; 

  @media (max-width: 500px) { 
    width: 100%; 
    border: none; 
  }
`;

export const TimeLineStyled = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: start; 
  flex-wrap: wrap; 
`;

export const PTimelineStyled = styled.p`
  margin-left: 5px;
  margin-right: 8px;
  flex: 0 0 auto; 
`;



