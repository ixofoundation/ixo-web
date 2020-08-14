import styled from "styled-components";
import { deviceWidth } from "../../../../lib/commonData";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  max-width: unset;
  i:before {
    color: #fff;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    justify-content: flex-end;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
  }
`;

export const SocialIcon = styled.a`
  padding: 10px;

  :before {
    color: #fff;
  }

  &:hover:before {
    text-decoration: none;
    color: ${(props: any): string => props.theme.ixoBlue};
  }

  &&:hover {
    text-decoration: none;
  }
`;

export const SocialIconContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 36px;

  @media (min-width: ${deviceWidth.tablet}px) {
    margin: 0;
    padding-bottom: 1rem;
    margin-left: -3rem;
  }
`;
