import { React } from 'react';

export const List = ({ list, users }) => {
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