import React from 'react';
import { Col, Row } from 'antd';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import OrganismSideNavigation from './side-navigation';

const OrganismLayout = (props) => {
	const { isSiderVisible } = useSelector((state) => state.base);

	return (
		<>
			<Helmet>
				<title>Fresh Freeze Admin | {props.title || ''}</title>
			</Helmet>

			<Row>
				{!props.withoutSideNavigation && (
					<Col className="vh-100 " span={isSiderVisible ? 5 : 2}>
						<OrganismSideNavigation />
					</Col>
				)}

				<Col
					className="bg-blue pv4 ph5"
					span={
						props.withoutSideNavigation
							? 24
							: isSiderVisible
							? 19
							: 22
					}
				>
					{props.children}
				</Col>
			</Row>
		</>
	);
};

export default OrganismLayout;
