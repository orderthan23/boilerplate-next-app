import React, { useEffect, useState } from 'react';
import ExampleService from '@service/exampleService';
import { uid } from 'react-uid';
import COLORS from '@constants/colors';
import { commaizeNumber } from '@toss/utils';
import { isEmpty } from 'lodash';

const PRODUCT_CODES = 9833;

const ReviewCard = ({ review }) => {
	return (
		<div style={{ width: '400px', backgroundColor: 'white', color: COLORS.BLACK, padding: '10px' }}>
			<h4
				style={{
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					marginBottom: '20px',
					color: COLORS.PRIMARY,
				}}
			>
				{review.summary_review ?? '리뷰'}
			</h4>
			<div
				style={{
					color: COLORS.SECONDARY_COLOR,
					marginBottom: '10px',
				}}
			>
				<small>{isEmpty(review?.nickname) ? '익명' : review.nickname}</small>
			</div>

			<p style={{ fontSize: '12px', height: '200px', overflow: 'scroll' }}>{review.total_review}</p>
			<div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center' }}>
				<div style={{ width: '100px', height: '100px' }}>
					<img
						style={{ objectFit: 'fill', width: '100%', maxHeight: '100%' }}
						alt={''}
						src={review?.product_img}
					/>
				</div>
				<div>
					<p style={{ marginBottom: '10px' }}>
						<strong>{review?.brand_name}</strong>
					</p>
					<p>{review?.product_name}</p>
					<small>{commaizeNumber(review?.price ?? 0)}원</small>
				</div>
			</div>

			<div>
				{(review?.hashtag_list ?? []).map((hashTag, idx) => (
					<small
						key={idx}
						style={{ color: COLORS.PRIMARY, marginRight: '5px' }}
					>
						#{hashTag}
					</small>
				))}
			</div>
		</div>
	);
};

const ReviewCard2 = ({ review }) => {
	return <></>;
};

//전통적인 방식에 apiCall
const Case1 = () => {
	const [reviewList, setReviewList] = useState([]);
	useEffect(() => {
		ExampleService.fetchReviewList({ productCodes: PRODUCT_CODES }).then((res) => {
			console.log(res?.data?.result?.review_detail_list ?? []);
			setReviewList(res?.data?.result?.review_detail_list ?? []);
		});
	}, []);

	return (
		<div>
			<h1>리뷰리스트 1</h1>
			<div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
				{reviewList.map((review) => (
					<ReviewCard
						key={uid(review)}
						review={review}
					/>
				))}
			</div>
		</div>
	);
};

const ExampleScreen = () => {
	return <Case1 />;
};

export default ExampleScreen;
