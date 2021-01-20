import React from 'react';
import { Col, Divider, Row } from 'antd';

import { AppleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const OrganismSideNavigation = () => {
	const { isSiderVisible } = useSelector((state) => state.base);

	const menus = [
		{ icon: <AppleFilled className="f3" />, name: 'Menu 1' },
		{ icon: <AppleFilled className="f3" />, name: 'Menu 2' },
	];

	return (
		<div className="bg-mineshaft moon-gray pa4 h-100 w-100 shadow-3">
			<Row justify="center">
				<img
					src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.jpg"
					alt="Product Name"
				/>
			</Row>

			<Divider />

			{menus.map((menu, index) => (
				<Row
					align="middle pointer"
					className="pointer"
					gutter={[32, 20]}
					key={`menu-${index}`}
				>
					<Col>{menu.icon}</Col>
					{isSiderVisible && (
						<Col>
							<span className="f4">{menu.name}</span>
						</Col>
					)}
				</Row>
			))}
		</div>
	);
};

export default OrganismSideNavigation;
