import React, { useEffect, useState, useTransition } from 'react';
import ExampleService from '@service/exampleService';
import { uid } from 'react-uid';
import COLORS from '@constants/colors';
import Modal from '@lib/components/Modal';
import CustomAlert from '@lib/alert';
import { SwitchCase } from '@toss/react';

const ProfileDetail = ({ personId }) => {
	const [isLoading, startTransition] = useTransition();
	const [profile, setProfile] = useState(null);
	const handleDeletePerson = () => {
		CustomAlert.question(`${profile.name}회원을 삭제하시겠습니까?`, () => {
			ExampleService.deletePerson({ personId: profile.id }).then((res) => {
				CustomAlert.success('삭제되었습니다.');
			});
		});
	};

	const handleModifyPerson = () => {};

	useEffect(() => {
		startTransition(async () => {
			const res = await ExampleService.fetchPerson({ personId });
			setProfile(res.data);
		});
	}, []);

	if (!isLoading && profile) {
		return (
			<form onSubmit={handleModifyPerson}>
				<div style={{ width: '400px', backgroundColor: 'white', color: COLORS.BLACK, padding: '10px' }}>
					<div
						className="form-group"
						style={{ marginBottom: '20px' }}
					>
						<div className="form-control">
							<label>
								<span style={{ marginRight: '10px' }}>이름 :</span>
								<input
									type="text"
									name="name"
									defaultValue={profile.name}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span style={{ marginRight: '10px' }}>나이 :</span>
								<input
									type="number"
									name="age"
									defaultValue={profile.age}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span style={{ marginRight: '10px' }}>신장 :</span>
								<input
									type="number"
									name="height"
									defaultValue={profile?.height}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span style={{ marginRight: '10px' }}>무게 :</span>
								<input
									type="number"
									name="weight"
									defaultValue={profile?.weight}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span style={{ marginRight: '10px' }}>직책 :</span>
								<input
									type="text"
									name="job"
									defaultValue={profile?.job}
								/>
							</label>
						</div>
					</div>

					<div>
						<button onClick={handleDeletePerson}>삭제하기</button>
						<button type="submit">수정하기</button>
					</div>
				</div>
			</form>
		);
	}

	if (!isLoading && !profile) {
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
					오류발생
				</h4>
			</div>
		);
	}

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
				로딩중...
			</h4>
		</div>
	);
};
const ProfileCard = ({ profile }) => {
	const [openDetail, setOpenDetail] = useState(false);

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
				{profile.name ?? '리뷰'}
			</h4>
			<div
				style={{
					color: COLORS.SECONDARY_COLOR,
					marginBottom: '10px',
				}}
			>
				<small>나이 : {profile?.age ?? '알 수없음'}</small>
			</div>
			<div>
				<div>
					<p style={{ marginBottom: '10px' }}>
						신장 : <strong>{profile?.height}</strong>
					</p>
					<p style={{ marginBottom: '10px' }}>
						무게 : <strong>{profile?.weight}</strong>
					</p>
				</div>
				<button onClick={() => setOpenDetail(true)}>자세히 보기</button>
			</div>
			<Modal
				isVisible={openDetail}
				setIsVisible={setOpenDetail}
			>
				<ProfileDetail personId={profile.id} />
			</Modal>
		</div>
	);
};
//전통적인 방식에 apiCall
const Case1 = () => {
	const [isLoading, startTransition] = useTransition();
	const [people, setPeople] = useState([]);

	useEffect(() => {
		startTransition(async () => {
			const res = await ExampleService.fetchPeople();
			setPeople(res?.data ?? []);
		});
	}, []);

	return (
		<div>
			<h1>회원목록</h1>
			<div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
				{isLoading && <p>로딩중...</p>}
				{people.map((profile) => (
					<ProfileCard
						key={uid(profile)}
						profile={profile}
					/>
				))}
			</div>
		</div>
	);
};

//zustand state를 활용한 방식
const Case2 = () => {
	return <div>zustand로 구현해보세요.</div>;
};

const Case3 = () => {
	return <div>reactQuery로 구현해보세요.</div>;
};

const RENDER_MODE = {
	useState: 1,
	zustand: 2,
	reactQuery: 3,
};

const ExampleScreen = () => {
	const [mode, setMode] = useState(RENDER_MODE.useState);
	const handleChangeMode = (e) => {
		setMode(e.target.value);
	};
	return (
		<>
			<select onChange={handleChangeMode}>
				{Object.keys(RENDER_MODE).map((key) => (
					<option
						value={RENDER_MODE[key]}
						key={key}
					>
						{key}
					</option>
				))}
			</select>
			<SwitchCase
				caseBy={{
					[RENDER_MODE.useState]: <Case1 />,
					[RENDER_MODE.zustand]: <Case2 />,
					[RENDER_MODE.reactQuery]: <Case3 />,
				}}
				value={mode}
				defaultComponent={<p>오류가 발생하였습니다.</p>}
			/>
		</>
	);
};

export default ExampleScreen;
