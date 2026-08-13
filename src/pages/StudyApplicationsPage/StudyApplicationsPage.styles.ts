export * from "../../styles/adminStyles";

import styled from "styled-components";

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: 180px;
  padding: 28px;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  color: rgba(238, 242, 255, 0.62);
  font-size: 16px;
  text-align: center;
`;
