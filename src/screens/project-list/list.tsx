import React from 'react';
import { User } from './search-panel';

interface Project {
  id: string,
  name: string,
  personId: string;
  pin: boolean;
  organization: string
}

interface ListProps {
  list: Project[],
  users: User[]
}

export const List = ({ list, users }: ListProps) => {
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map((project, index) => <tr key={project.id}>
          <td>{project.name}</td>
          {/* undefined.name 警惕undf
            ?.的意思就是 这个符号组之前的值为undefined时，
            则users.find(user => user.id === project.personId)?.name 整个为Undefined而不会报错
          */}
          <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
        </tr>)
      }
    </tbody>
  </table>
}