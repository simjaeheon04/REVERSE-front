import { useEffect, useMemo, useState } from "react";
import * as S from "./ExecutiveSection.styles";
import { getOfficerList, type OfficerResponse } from "../../../services/officerApi";

type ExecutiveTeam = {
  id: string;
  teamName: string;
  members: OfficerResponse[];
};

export default function ExecutiveSection() {
  const [officers, setOfficers] = useState<OfficerResponse[]>([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const data = await getOfficerList();
        setOfficers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("failed to load officers", error);
        setOfficers([]);
      }
    };

    fetchOfficers();
  }, []);

  const executiveTeams = useMemo<ExecutiveTeam[]>(() => {
    const grouped = officers.reduce<Map<string, OfficerResponse[]>>((acc, officer) => {
      if (!officer.isVisible) {
        return acc;
      }

      const key = officer.department || "기타";
      const current = acc.get(key) ?? [];
      current.push(officer);
      acc.set(key, current);
      return acc;
    }, new Map());

    return Array.from(grouped.entries()).map(([teamName, members]) => ({
      id: teamName,
      teamName,
      members: [...members].sort((a, b) => a.sortOrder - b.sortOrder),
    }));
  }, [officers]);

  return (
    <S.Section id="officer-intro">
      <S.Inner>
        <S.Header>
          <S.Title>임원진</S.Title>
          <S.Subtitle>REVERSE 임원진을 소개합니다!</S.Subtitle>
        </S.Header>

        {executiveTeams.length > 0 ? (
          <S.TeamGrid>
            {executiveTeams.map((team) => (
              <S.TeamColumn key={team.id}>
                <S.TeamTitle>{team.teamName}</S.TeamTitle>

                <S.MemberList>
                  {team.members.map((member) => (
                    <S.MemberCard key={member.officerId ?? member.id ?? member.email}>
                      {member.photoUrl ? (
                        <S.AvatarImage src={member.photoUrl} alt={member.name} />
                      ) : (
                        <S.Avatar />
                      )}
                      <S.MemberInfo>
                        <S.Name>{member.name}</S.Name>
                        <S.Role>{member.role}</S.Role>
                        <S.Email>{member.email}</S.Email>
                      </S.MemberInfo>
                    </S.MemberCard>
                  ))}
                </S.MemberList>
              </S.TeamColumn>
            ))}
          </S.TeamGrid>
        ) : (
          <S.EmptyState>표시할 임원진 정보가 없습니다.</S.EmptyState>
        )}
        <S.DecoBox />
      </S.Inner>
    </S.Section>
  );
}
