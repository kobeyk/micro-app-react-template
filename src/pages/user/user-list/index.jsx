import React from 'react'
import { data,columns } from '@datas/userData';
import { Table } from 'antd';
const UserList = () => <Table columns={columns} dataSource={data} />;
export default UserList;