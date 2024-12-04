import styled from "styled-components";
import tw from "twin.macro";

export const PlayStation = styled.div`
  ${tw`md:min-w-[490px] flex flex-col`}
`;

export const TitleOne = styled.h1`
  ${tw`m-0 text-lime-400/90 text-sm font-normal text-center`}
`;

export const Title = styled.h1`
  ${tw`m-0 text-cyan-300 text-xl font-normal text-center py-12`}
`;

export const Notice = styled.h4`
  ${tw`m-0 text-green-300 text-sm font-light text-center pb-5`}
`;

export const PlayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem auto;
`;