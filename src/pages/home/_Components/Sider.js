import { useEffect, useRef, useState } from 'react';
import { Tabs, Radio, Button, Menu } from 'antd';
import Drag from '../../components/drag/FlowDrag';
import Library from '../../components/library/Library';
import Setting from '../../components/setting/Setting';
import styled from 'styled-components';
import { PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';

const SiderDiv = styled.div`
	position: fixed;
	top: 54px;
	left: 0;
	bottom: 0;
	background: #fff;
	width: 300px;
	display: flex;
`;

const Sider = props => {
	const [menuIndex, setMenuIndex] = useState('1');
	const generateDOM = () => {
		console.log(menuIndex);
		if (menuIndex === '1') {
		} else if (menuIndex === '2') {
			return <Library></Library>;
		} else if (menuIndex === '3') {
			return '我的页面';
		}
	};	
	return (
		<SiderDiv>
			<Menu
				defaultSelectedKeys={['1']}
				mode="inline"
				theme="dark"
				onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
					setMenuIndex(key);
					console.log(item, key, keyPath, selectedKeys, domEvent);
				}}
				inlineCollapsed={false}
				style={{
					width: '100px',
					background: '#fff',
					color: '#000',
					borderRight: '1px solid #ccd5db',
					boxShadow: '-1px 0 0 0 #e6ebed',
				}}
			>
				<Menu.Item key="1" icon={<PieChartOutlined />}>
					模板库
				</Menu.Item>
				<Menu.Item key="2" icon={<DesktopOutlined />}>
					组件
				</Menu.Item>
				<Menu.Item key="3" icon={<ContainerOutlined />}>
					我的页面
				</Menu.Item>
			</Menu>
			{generateDOM()}
		</SiderDiv>
	);
};

export default Sider;
