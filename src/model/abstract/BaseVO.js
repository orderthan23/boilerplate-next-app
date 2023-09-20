class BaseVO {
	constructor(props) {
		this.custNo = props?.custNo ? props.custNo : null;
		this.regDt = props?.regDt ? props?.regDt : null;
		this.regTm = props?.regTm ? props?.regTm : null;
	}

	get realCustNo() {
		return this.custNo.substring(1);
	}

	static arrayToVOList(array = []) {
		return array.map((value) => new this(value));
	}
}

export default BaseVO;
