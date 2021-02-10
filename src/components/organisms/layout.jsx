import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import {
	DesktopOutlined,
	PieChartOutlined,
	TeamOutlined,
} from '@ant-design/icons';

const menus = [
	{
		key: '1',
		name: 'Option 1',
		icon: <PieChartOutlined />,
		link: '/to-some-link-1',
	},
	{
		key: '2',
		name: 'Option 2',
		icon: <DesktopOutlined />,
		link: '/to-some-link-2',
	},
	{
		subMenuKey: 'Sub 1',
		name: 'Sub 1',
		icon: <TeamOutlined />,
		subMenus: [
			{
				key: '3',
				name: 'Sub Option 1',
				link: '/to-some-link-3',
			},
			{
				key: '4',
				name: 'Sub Option 2',
				link: '/to-some-link-4',
			},
		],
	},
];

const OrganismLayout = (props) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const history = useHistory();
	const location = useLocation();

	return (
		<>
			<Helmet>
				<title>Fresh Freeze Admin | {props.title || ''}</title>
			</Helmet>

			<Layout style={{ minHeight: '100vh' }}>
				<Layout.Sider
					collapsible
					collapsed={isSidebarCollapsed}
					onCollapse={() =>
						setIsSidebarCollapsed((collapsed) => !collapsed)
					}
					width={250}
				>
					<div className="pa2 mv3 mh4">
						<img src={FFLogo} alt="Logo" />
					</div>

					<Menu
						defaultOpenKeys={[location.pathname.split('/')[1]]}
						defaultSelectedKeys={[location.pathname]}
						mode="inline"
						theme="dark"
					>
						{menus.map((menu) => {
							return !menu.subMenus ? (
								<Menu.Item
									key={menu.link}
									icon={menu.icon}
									onClick={() => history.push(menu.link)}
								>
									{menu.name}
								</Menu.Item>
							) : (
								<Menu.SubMenu
									className={
										location.pathname.includes(
											menu.subMenyKey
										)
											? 'ant-menu-submenu-open'
											: ''
									}
									key={menu.subMenuKey}
									icon={menu.icon}
									title={menu.name}
								>
									{menu.subMenus.map((sub) => (
										<Menu.Item
											key={sub.link}
											onClick={() =>
												history.push(sub.link)
											}
										>
											{sub.name}
										</Menu.Item>
									))}
								</Menu.SubMenu>
							);
						})}
					</Menu>
				</Layout.Sider>

				<Layout className="site-layout">
					<div className="ph5 pv4">
						<Divider />
						<Layout.Content style={{ minHeight: '80vh' }}>
							{props.children}
						</Layout.Content>
						<Layout.Footer style={{ textAlign: 'center' }}>
							Copyright © 2021 Freezy Fresh. All rights reserved
						</Layout.Footer>
					</div>
				</Layout>
			</Layout>
		</>
	);
};

export default OrganismLayout;
