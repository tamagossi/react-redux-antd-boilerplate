/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars*/
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import {
	Col,
	Input,
	message,
	Row,
	Skeleton,
	Space,
	Table,
	Typography,
} from 'antd';

import DatatableService from '../../services/datatable';
const datatableService = new DatatableService();

const OrganismDatatable = forwardRef((props, ref) => {
	const [current, setCurrent] = useState(1);
	const [isGettingData, setIsGettingData] = useState(false);
	const [data, setData] = useState(null);
	const [totalData, setTotalData] = useState(0);

	let filterParameter = {
		keyword: '',
		limit: 5,
		page: 0,
	};

	const getData = async () => {
		setIsGettingData(true);

		try {
			// const { data } = await datatableService.getData(
			// 	props.dataSourceURL,
			// 	filterParameter
			// );

			// setData(data.data);
			// setTotalData(data.totalData);
			setData([
				{ id: 1, name: 'John Doe 1', age: 22 },
				{ id: 2, name: 'John Doe 22', age: 24 },
			]);
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsGettingData(false);
		}
	};

	useImperativeHandle(ref, () => ({
		async refetchData() {
			await getData();
		},
	}));

	const setKeyword = (value) => {
		filterParameter = { ...filterParameter, keyword: value };
		getData();
	};

	const setPagination = (page) => {
		filterParameter = { ...filterParameter, page: page - 1 };
		setCurrent(page);
		getData();
	};

	useEffect(() => {
		(async () => {
			await getData();
		})();
	}, []);

	return (
		<Row className="w-100">
			<Col span={24}>
				<Row align="middle" justify="space-between">
					<Space align="middle" size={50}>
						<Typography.Title level={props.titleSize || 4}>
							{props.title || ''}
						</Typography.Title>

						{props.withSearchFilter && (
							<Input.Search
								placeholder={props.inputPlaceHolder || 'Cari'}
								onSearch={(value) => setKeyword(value)}
								style={{ width: 300 }}
							/>
						)}
					</Space>

					{props.additionalAction}
				</Row>
			</Col>

			<Col className="mt4" span={24}>
				{isGettingData ? (
					<Skeleton active />
				) : (
					<Table
						bordered={true}
						columns={props.columns.map((column) => ({
							...column,
							title: column.title,
						}))}
						className={props.className}
						dataSource={data}
						pagination={{
							current,
							pageSize: filterParameter.limit,
							total: totalData,
							onChange: (page) => setPagination(page),
						}}
						rowKey={props.rowKey || 'id'}
						scroll={{ x: props.scroll || 720 }}
						style={{ width: '100%' }}
					/>
				)}
			</Col>
		</Row>
	);
});

export default OrganismDatatable;
