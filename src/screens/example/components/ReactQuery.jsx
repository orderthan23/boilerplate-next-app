import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import CustomAlert from '@lib/alert';
import Modal from '@lib/components/Modal';
import { uid } from 'react-uid';
import ExampleQuery from '@queries/exmple';

const assertPerson = (person) => {
	if (isEmpty(person.name.trim())) {
		throw ['이름을 입력하세요.', 'name'];
	}
	if (person.age <= 0) {
		throw ['나이를 확인해주세요.', 'age'];
	}
	if (person.age <= 0) {
		throw ['신장을 확인해주세요.', 'height'];
	}
	if (person.age <= 0) {
		throw ['무게를 확인해주세요.', 'weight'];
	}
	if (isEmpty(person.job.trim())) {
		throw ['직책을 입력하세요.', 'job'];
	}
};

const ProfileDetail = ({ personId }) => {
	const { data: profile, isLoading, isError } = ExampleQuery.usePerson(personId);

	const mutatePostPerson = ExampleQuery.usePost({
		onSuccess: (httpResult) => {
			if (httpResult) {
				CustomAlert.success('등록되었습니다.');
			}
		},
	});
	const mutatePutPerson = ExampleQuery.usePut({
		onSuccess: (httpResult) => {
			if (httpResult) {
				CustomAlert.success('변경되었습니다.');
			}
		},
	});

	const mutateDeletePerson = ExampleQuery.useDelete({
		onSuccess: (httpResult) => {
			if (httpResult) {
				CustomAlert.success('삭제되었습니다.');
			}
		},
	});

	const handleDeletePerson = () => {
		CustomAlert.question(`${profile.name}회원을 삭제하시겠습니까?`, () => {
			mutateDeletePerson(profile.id);
		});
	};

	const handlePostPerson = (request) => {
		CustomAlert.question('등록하시겠습니까?', () => {
			mutatePostPerson(request);
		});
	};

	const handlePutPerson = (request) => {
		CustomAlert.question(`${profile.name}회원을 수정 하시겠습니까?`, () => {
			mutatePutPerson({ personId: profile.id, ...request });
		});
	};

	const handleSubmitPerson = (e) => {
		e.preventDefault();
		const request = {
			name: e.target.name.value,
			age: Number(e.target.age.value),
			weight: Number(e.target.weight.value),
			height: Number(e.target.height.value),
			job: e.target.job.value,
		};

		try {
			assertPerson(request);
			if (!personId) {
				handlePostPerson(request);
			} else {
				handlePutPerson(request);
			}
		} catch ([message, reason]) {
			CustomAlert.error(message, () => void e.target?.[reason]?.focus());
		}
	};

	if (isError) {
		return (
			<div className={'card'}>
				<h4>오류발생</h4>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className={'card'}>
				<h4>로딩중...</h4>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmitPerson}>
			<div className={'card'}>
				<div
					className="form-group"
					style={{ marginBottom: '20px' }}
				>
					<div className="form-control">
						<label>
							<span className="mr-10">이름 :</span>
							<input
								type="text"
								name="name"
								defaultValue={profile.name}
							/>
						</label>
					</div>
					<div className="form-control">
						<label>
							<span className="mr-10">나이 :</span>
							<input
								type="number"
								name="age"
								defaultValue={profile.age}
							/>
						</label>
					</div>
					<div className="form-control">
						<label>
							<span className="mr-10">신장 :</span>
							<input
								type="number"
								name="height"
								defaultValue={profile?.height}
							/>
						</label>
					</div>
					<div className="form-control">
						<label>
							<span className="mr-10">무게 :</span>
							<input
								type="number"
								name="weight"
								defaultValue={profile?.weight}
							/>
						</label>
					</div>
					<div className="form-control">
						<label>
							<span className="mr-10">직책 :</span>
							<input
								type="text"
								name="job"
								defaultValue={profile?.job}
							/>
						</label>
					</div>
				</div>

				<div>
					<button
						className="mr-10"
						type={'button'}
						onClick={handleDeletePerson}
					>
						삭제하기
					</button>
					<button type="submit">{personId ? '수정하기' : '등록하기'}</button>
				</div>
			</div>
		</form>
	);
};
const ProfileCard = ({ profile }) => {
	const [openDetail, setOpenDetail] = useState(false);

	return (
		<div className="card">
			<h4>{profile.name ?? '리뷰'}</h4>
			<div className={'age_box'}>
				<small>나이 : {profile?.age ?? '알 수없음'}</small>
			</div>
			<div>
				<div>
					<p className="mb-10">
						신장 : <strong>{profile?.height}</strong>
					</p>
					<p className="mb-10">
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
const ReactQuery = () => {
	const { data: people, isLoading, isError } = ExampleQuery.usePeople();
	const [isOpenRegister, setIsOpenRegister] = useState(false);

	return (
		<>
			<div className="container">
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h1>회원목록</h1>
					<div>
						<button
							type="button"
							onClick={() => setIsOpenRegister(true)}
						>
							등록하기
						</button>
					</div>
				</div>
				<div className={'people_wrap'}>
					{isLoading && <p>로딩중...</p>}
					{isError && <p>오류가 발생하였습니다.</p>}
					{!isLoading &&
						!isError &&
						people.map((profile) => (
							<ProfileCard
								key={uid(profile)}
								profile={profile}
							/>
						))}
				</div>
				<Modal
					isVisible={isOpenRegister}
					setIsVisible={setIsOpenRegister}
				>
					<ProfileDetail personId={null} />
				</Modal>
			</div>
		</>
	);
};
export default ReactQuery;
