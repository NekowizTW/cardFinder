import PropTypes from 'prop-types';

export const SlotDataFormat = PropTypes.shape({
  idx: PropTypes.number,
  id: PropTypes.string,
  exas: PropTypes.bool,
  szSlot: PropTypes.number,
  mana: PropTypes.number,
  exs: PropTypes.arrayOf(PropTypes.string),
});

export const SenzaiSummandFormat = PropTypes.shape({
  hp: PropTypes.number,
  atk: PropTypes.number,
  cost: PropTypes.number,
  cdf: PropTypes.number,
  cds: PropTypes.number,
});

const clamp = (value, { min, max } = {}) => {
  let result = value;
  if (min) result = Math.min(result, min);
  if (max) result = Math.max(result, max);
  return result;
};

/**
 * Decodes a serialized code into a team configuration object.
 *
 * @param {string} code - The serialized code to decode.
 * @returns {{
*   leaderEX: string,
*   teamSlot: Array<{
*     id: string,
*     exas: boolean,
*     szSlot: number,
*     mana: number,
*     exs: string[]
*   }>,
*   helperSlot: {
*     id: string,
*     szSlot: number,
*     mana: number,
*     exs: string[]
*   }
* }} - The decoded team configuration.
* @example
* const code = 'LLeaderEXA1T123M50S8XEAEE';
* const team = decode(code);
* console.log(team);
* // Output:
* // {
* //   leaderEX: 'LeaderEX',
* //   teamSlot: [
* //     { id: 123, exas: true, szSlot: 8, mana: 50, ex: ['A', 'E', 'E'] },
* //     // ... other team members
* //   ],
* //   helperSlot: { id: -1, szSlot: 10, mana: 0, ex: [] }
* // }
*/
export function decode(code) {
  const reLead = /(L([\u4E00-\u9FFF]+)([・‧][\u4E00-\u9FFF]+)?((A\+?)|(S))\d+)/;
  const reTeam = /(T\d+)(M\d+)?(S\d+)?(X)?(E\d+)?(E\d+)?(E\d+)?/gm;
  const reHelp = /(H\d+)(M\d+)?(S\d+)?(E\d+)?(E\d+)?(E\d+)?/;
  const team = {
    leaderEX: '',
    teamSlot: Array.from(
      { length: 5 },
      () => ({
        id: '-1', exas: false, szSlot: 10, mana: 0, exs: [],
      }),
    ),
    helperSlot: {
      id: '-1', szSlot: 10, mana: 0, exs: [],
    },
  };

  // grab leaderEX
  if (reLead.test(code)) {
    const [, , leaderEX] = reLead.exec(code) || [];
    if (leaderEX) team.leaderEX = leaderEX;
  }

  // grab team
  let teamIndex = 0;
  code.replace(reTeam, (match, id, mana, szSlot, exas, ...ex) => {
    if (teamIndex < 5) {
      team.teamSlot[teamIndex].id = id.substring(1);
      team.teamSlot[teamIndex].mana = mana
        ? clamp(Math.parseInt(mana.substring(1), 10), { min: 0, max: 400 })
        : 0;
      team.teamSlot[teamIndex].szSlot = szSlot
        ? clamp(Math.parseInt(szSlot.substring(1), 10), { min: 0, max: 10 })
        : 10;
      team.teamSlot[teamIndex].exas = exas !== undefined;
      team.teamSlot[teamIndex].ex = ex.map((e) => e.substring(1));
      teamIndex += 1;
    }
    return match;
  });

  // grab helper
  code.replace(reHelp, (match, id, mana, szSlot, ...ex) => {
    team.helperSlot.id = id.substring(1);
    team.helperSlot.mana = mana
      ? clamp(Math.parseInt(mana.substring(1), 10), { min: 0, max: 400 })
      : 0;
    team.helperSlot.szSlot = szSlot
      ? clamp(Math.parseInt(szSlot.substring(1), 10), { min: 0, max: 10 })
      : 10;
    team.helperSlot.ex = ex.map((e) => e.substring(1));
    return match;
  });

  // console.log(team);
  return team;
}

/**
 * Encodes a team configuration object into a serialized code.
 *
 * @param {{
*   leaderEX: string,
*   teamSlot: Array<{
*     id: string,
*     exas: boolean,
*     szSlot: number,
*     mana: number,
*     ex: string[]
*   }>,
*   helperSlot: {
*     id: string,
*     szSlot: number,
*     mana: number,
*     ex: string[]
*   }
* }} team - The team configuration object to encode.
* @returns {string} - The serialized code.
* @example
* const team = {
*   leaderEX: 'LeaderEX',
*   teamSlot: [
*     { id: 123, exas: true, szSlot: 8, mana: 50, ex: ['A', 'E', 'E'] },
*     // ... other team members
*   ],
*   helperSlot: { id: -1, szSlot: 10, mana: 0, ex: [] }
* };
* const code = encode(team);
* console.log(code);
* // Output: 'LLeaderEXA1T123M50S8XEAEE'
*/
export function encode(team) {
  const encodeEx = (ex) => (ex !== undefined ? `E${ex}` : '');

  const encodeTeamMember = (teammate) => {
    if (teammate.id === '-1') return '';

    return `T${teammate.id}${
      teammate.mana !== 0 ? `M${teammate.mana}` : ''
    }${teammate.szSlot !== 10 ? `S${teammate.szSlot}` : ''
    }${teammate.exas ? 'X' : ''
    }${teammate.exs.map(encodeEx).join('')}`;
  };

  const encodeHelper = (helper) => {
    if (helper.id === '-1') return '';

    return `H${helper.id}${
      helper.mana !== 0 ? `M${helper.mana}` : ''
    }${helper.szSlot !== 10 ? `S${helper.szSlot}` : ''
    }${helper.exs.map(encodeEx).join('')}`;
  };

  const code = [
    team.leaderEX ? `L${team.leaderEX}` : '',
    ...team.teamSlot.map(encodeTeamMember),
    encodeHelper(team.helperSlot),
  ].join('');

  return code;
}
