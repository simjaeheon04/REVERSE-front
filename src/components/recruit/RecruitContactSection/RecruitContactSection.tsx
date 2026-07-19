import * as S from "./RecruitContactSection.styles";

export default function RecruitContactSection() {
  return (
    <S.Section>
      <S.Header>
        <S.Title>문의 사항</S.Title>
        <S.Subtitle>
          궁금하신 점이 있다면 아래 채널로 편하게 연락 주세요.
        </S.Subtitle>
      </S.Header>

      <S.Grid>
        <S.Item>
          <S.Icon viewBox='0 0 32 32' fill='none'>
            <path d='M5 9H27V23H5V9Z' stroke='currentColor' strokeWidth='1.8' />
            <path
              d='M6 10L16 17L26 10'
              stroke='currentColor'
              strokeWidth='1.8'
            />
          </S.Icon>
          <S.Label>SNS</S.Label>
          <S.Description>
            REVERSE의 활동과 모집 소식은 인스타그램에서 가장 빠르게 확인할 수
            있습니다.
          </S.Description>
          <S.Strong>@nsu_reverse</S.Strong>
        </S.Item>

        <S.Item>
          <S.Icon viewBox='0 0 32 32' fill='none'>
            <path
              d='M10.4 6.5L13.3 12.1L10.8 14.5C12.4 17.8 14.8 20.2 18.1 21.8L20.5 19.3L26.1 22.2C25.4 24.5 23.6 26 21.3 26C13.1 25.9 6.7 19.5 6.5 11.3C6.5 9 8.1 7.2 10.4 6.5Z'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinejoin='round'
            />
          </S.Icon>
          <S.Label>Phone</S.Label>
          <S.Description>
            모집 관련 문의는 회장단에게 편하게 연락해 주세요.
          </S.Description>
          <S.Strong>회장 박시연 010-000-0000</S.Strong>
          <S.Strong>부회장 홍정민 010-000-0000</S.Strong>
        </S.Item>

        <S.Item>
          <S.Icon viewBox='0 0 32 32' fill='none'>
            <path
              d='M16 28C16 28 25 19.5 25 12.5C25 7.8 21 4 16 4C11 4 7 7.8 7 12.5C7 19.5 16 28 16 28Z'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinejoin='round'
            />
            <circle
              cx='16'
              cy='12.5'
              r='3'
              stroke='currentColor'
              strokeWidth='1.8'
            />
          </S.Icon>
          <S.Label>Club Room</S.Label>
          <S.Description>
            직접 방문하면 동아리 활동과 모집 일정을 더 자세히 안내받을 수
            있습니다.
          </S.Description>
          <S.Strong>남서울대학교 컴퓨터소프트웨어학과</S.Strong>
        </S.Item>
      </S.Grid>
    </S.Section>
  );
}
