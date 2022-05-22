import client from './client';

export const fetcher = (url, queryParams) =>
  client.get(`${url}${queryParams}`).then((res) => res.data);

/* 
    /api/admin/mentor
    http method: GET
    URL query: none
    expected data:  멘토 전체 리스트 반환
                    mtrId, name, phone
*/
/* 
    /api/admin/mentee
    http method: GET
    URL query: none or mtrId
    expected data:  URL 쿼리가 없는 경우 - 멘토가 없는 멘티 전체 리스트 반환
                    URL 쿼리가 있는 경우 (?mtrId=asd@asd.com) - 해당 멘토의 멘티 리스트 반환
                    mteId, name, school, phone
*/

export const setMentorMentee = (mtrId, mteId) =>
  client.post('/api/admin', { mtrId, mteId }); // 멘토 멘티 설정

export const deleteMentorMentee = (mtrId, mteId) =>
  client.put('/api/admin', { mtrId, mteId }); // 멘토 멘티 해제
