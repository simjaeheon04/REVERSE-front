import * as S from "./RecruitApplyInfo.styles";

export default function RecruitApplyInfo() {
  return (
    <S.InfoPanel>
      <S.Year>2026</S.Year>
      <S.Title>REVERSE 부원 모집</S.Title>
      <S.Description>저희 동아리에 지원해 주셔서 감사합니다!</S.Description>
      <S.Description>면접 일정 및 면접 시간은 임의로 선택 부탁드립니다.</S.Description>
      <S.ContactList aria-label='REVERSE 지원 안내'>
        <S.ContactItem>
          <S.ContactIcon viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M4 5.5H20V18.5H4V5.5Z'
              stroke='currentColor'
              strokeWidth='1.7'
              strokeLinejoin='round'
            />
            <path
              d='M5 6.5L12 12L19 6.5'
              stroke='currentColor'
              strokeWidth='1.7'
              strokeLinejoin='round'
            />
          </S.ContactIcon>
          <span>@nsu_reverse</span>
        </S.ContactItem>

        <S.ContactItem>
          <S.ContactIcon viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M8.1 4.5L10.4 8.9L8.5 10.8C9.7 13.2 11.5 15 13.9 16.2L15.8 14.3L20.2 16.6C19.7 18.4 18.3 19.5 16.6 19.5C10.1 19.4 5.1 14.4 4.9 7.9C4.9 6.2 6.2 4.9 8.1 4.5Z'
              stroke='currentColor'
              strokeWidth='1.7'
              strokeLinejoin='round'
            />
          </S.ContactIcon>
          <span>
            회장 심재헌: 010-2264-3031
            <br />
            부회장 황정민: 010-5428-8562
          </span>
        </S.ContactItem>

        <S.ContactItem>
          <S.ContactIcon viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M12 21C12 21 19 14.5 19 9.4C19 5.8 16 3 12 3C8 3 5 5.8 5 9.4C5 14.5 12 21 12 21Z'
              stroke='currentColor'
              strokeWidth='1.7'
              strokeLinejoin='round'
            />
            <circle
              cx='12'
              cy='9.5'
              r='2.2'
              stroke='currentColor'
              strokeWidth='1.7'
            />
          </S.ContactIcon>
          <span>충남 천안시 서북구 대학로 91 (구)농협건물 2층</span>
        </S.ContactItem>
      </S.ContactList>

      <S.EligibilityNotice>
        재학생 및 휴학생만 지원할 수 있습니다.
        <br />
        졸업생, 교수, 기타 인원은 모집 신청이 불가합니다.
      </S.EligibilityNotice>
    </S.InfoPanel>
  );
}
