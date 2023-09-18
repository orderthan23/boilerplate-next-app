class UiUtils {
	//클립 보드 복사
	static copyToClipBoard(copyText) {
		const temp = document.createElement('textarea');
		document.body.appendChild(temp);
		temp.value = copyText;
		temp.select();
		temp.setSelectionRange(0, 9999);
		document.execCommand('copy');
		document.body.removeChild(temp);
	}

	//이미지 미리보기
	static previewImage(imageFile, previewElement) {
		const reader = new FileReader();

		reader.onload = (e) => {
			previewElement.setAttribute('src', e.target.result);
		};
		reader.readAsDataURL(imageFile);
	}

	//페이지네이션 정보 가져오기
	static getPageable(
		totalElements, //총 리스트 갯수
		currentPage, //현재 페이지
		pageForSize = 10, //한 페이지당 보여줄 리스트 갯수
		groupSize = 10, //최대 보여질 페이지네이션 버튼 갯수
	) {
		const totalPage = Math.ceil(totalElements / pageForSize); //총 페이지
		const pageGroup = Math.ceil(currentPage / groupSize); //최대 보여질 페이지 버튼 묶음
		const endPage = pageGroup * 10 > totalPage ? totalPage : pageGroup * 10; //한페이지에서 보여질 페이지네이션 버튼 중 마지막 버튼
		const startPage = endPage - (groupSize - 1) <= 0 ? 1 : endPage - (groupSize - 1); //한페이지에서 보여질 페이지네이션 버튼 중 첫번째 버튼
		const hasNext = currentPage < totalPage; //다음 페이지 존재여부
		const hasPrev = currentPage > 1; // 이전 페이지 존재여부
		return [endPage, startPage, hasNext, hasPrev];
	}
}

export default UiUtils;
